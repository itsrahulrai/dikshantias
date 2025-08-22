"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X, CheckCircle, Image as ImageIcon } from "lucide-react";
import toast from "react-hot-toast";

interface Slider {
  _id?: string;
  title: string;
  displayOrder: number;
  image?: { url: string };
}

interface SliderModalProps {
  onClose: () => void;
  onSubmit: () => void;
  slider?: Slider;
}

export default function SliderModal({
  onClose,
  onSubmit,
  slider,
}: SliderModalProps) {
  const [title, setTitle] = useState("");
  const [displayOrder, setDisplayOrder] = useState<number>(1);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Prefill form for editing
  useEffect(() => {
    if (slider) {
      setTitle(slider.title);
      setDisplayOrder(slider.displayOrder);
      setPreviewImage(slider.image?.url || null);
    } else {
      setTitle("");
      setDisplayOrder(1);
      setPreviewImage(null);
    }
  }, [slider]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("displayOrder", displayOrder.toString());
    if (file) formData.append("image", file);

    try {
      const url = slider
        ? `/api/admin/sliders/${slider._id}`
        : "/api/admin/sliders";
      const method = slider ? "PUT" : "POST";

      const res = await fetch(url, { method, body: formData });

      if (res.ok) {
        toast.success(`Slider ${slider ? "updated" : "added"} successfully!`);
        onSubmit();
        onClose();
      } else {
        toast.error(`Failed to ${slider ? "update" : "add"} slider`);
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
          <h2 className="text-xl font-semibold text-white">
            {slider ? "Edit Slider" : "New Slider"}
          </h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition"
          >
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
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
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-32 w-full object-contain mb-2 rounded"
                />
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm">
                    Drag & drop or click to upload
                  </span>
                </>
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                disabled={isLoading}
              />
            </div>
            {/* Note about image size */}
            <span className="text-gray-400 text-xs mt-1">
              Recommended size: 1920px width × 600px height
            </span>
          </label>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-4">
            {/* Cancel Button */}
            <button
              type="button"
              onClick={handleClose}
              className={`flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              Cancel
            </button>

            {/* Save/Update Button */}
            <button
              type="submit"
              className={`flex items-center gap-2 px-5 py-2 bg-[#e94e4e] text-white rounded-lg shadow-md hover:bg-red-600 transition ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              <CheckCircle size={18} className="text-white" />
              {slider ? "Update" : "Save"}
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
            <p className="text-gray-700 font-semibold text-lg">
              {slider ? "Updating slider..." : "Creating slider..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
