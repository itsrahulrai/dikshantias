"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/component/admin/AdminLayout";
import ImageUpload from "@/component/admin/ImageUpload";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AddResultPage() {
  const router = useRouter();

  // 📌 Basic Info
  const [name, setName] = useState("");
  const [rank, setRank] = useState<number | "">("");
  const [service, setService] = useState("");
  const [year, setYear] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Loading
  const [submitting, setSubmitting] = useState(false);

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("rank", rank.toString());
      formData.append("service", service);
      formData.append("year", year);

      if (imageFile) {
        formData.append("image", imageFile);
      }
      const res = await fetch("/api/admin/results", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create Result");

      toast.success("Result added successfully");
      router.push("/admin/results");
    } catch (err) {
      console.error("Error submitting Result:", err);
      toast.error("Failed to add Result");
    } finally {
      setSubmitting(false);
    }
  };



  if (submitting) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="relative flex space-x-3 mb-4">
            <div className="w-5 h-5 bg-[#e94e4e] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 bg-[#f97316] rounded-full animate-bounce delay-150"></div>
            <div className="w-5 h-5 bg-[#facc15] rounded-full animate-bounce delay-300"></div>
          </div>
          <p className="text-gray-700 font-semibold text-lg">
           Result is being created...
          </p>
        </div>
      </div>
    );
  }


  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">New Result</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto space-y-8"
      >
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
            Result Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Rank</label>
              <input
                type="number"
                value={rank}
                onChange={(e) => setRank(Number(e.target.value))}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] outline-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Service</label>
              <input
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] outline-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
            Profile Image
          </h2>
          <ImageUpload onImageSelect={(file) => setImageFile(file)} isLoading={false} />
          <span className="text-gray-400 text-xs mt-1 block">
            Recommended size: <strong>300px × 300px</strong>
          </span>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
            onClick={() => router.push("/admin/results")}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 px-5 py-2 bg-[#e94e4e] text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            <CheckCircle size={18} />
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
