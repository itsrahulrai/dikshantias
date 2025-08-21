"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface SliderModalProps {
  onClose: () => void;
  onSubmit: () => void; // callback to refresh slider list
}

export default function SliderModal({ onClose, onSubmit }: SliderModalProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/sliders", { method: "POST", body: formData });
      if (res.ok) {
        toast.success("Slider added successfully!");
        onSubmit(); // refresh slider list
        setPreviewImage(null);
        onClose();
      } else {
        toast.error("Failed to add slider");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setPreviewImage(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl shadow-2xl overflow-hidden relative">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-[#e94e4e]">
          <h2 className="text-xl font-semibold text-white">New Slider</h2>
          <button onClick={handleClose} className="text-white hover:text-gray-200 transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-6 py-6">
          <label className="flex flex-col text-gray-700 text-medium">
            Title
            <input
              type="text"
              name="title"
              placeholder="Enter slider title"
              className="mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#e94e4e] transition"
              required
              disabled={isLoading}
            />
          </label>

          <label className="flex flex-col text-gray-700 text-medium">
            Display Order
            <input
              type="number"
              name="displayOrder"
              placeholder="1"
              className="mt-2 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#e94e4e] transition"
              required
              disabled={isLoading}
            />
          </label>

          <label className="flex flex-col text-gray-700 text-medium">
            Upload Image
            <div className="mt-2 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-purple-400 transition relative">
              {previewImage ? (
                <img src={previewImage} alt="Preview" className="h-32 w-full object-contain mb-2 rounded" />
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm">Drag & drop or click to upload</span>
                </>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                required
                disabled={isLoading}
              />
            </div>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-5 py-2 bg-[#e94e4e] text-white rounded-lg shadow-md transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              Save
            </button>
          </div>
        </form>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/70 flex flex-col items-center justify-center z-50">
            <div className="relative flex space-x-3 mb-4">
              <div className="w-5 h-5 bg-[#e94e4e] rounded-full animate-bounce"></div>
              <div className="w-5 h-5 bg-[#f97316] rounded-full animate-bounce delay-150"></div>
              <div className="w-5 h-5 bg-[#facc15] rounded-full animate-bounce delay-300"></div>
            </div>
            <p className="text-gray-700 font-semibold text-lg">Your slider is being created...</p>
          </div>
        )}
      </div>
    </div>
  );
}
