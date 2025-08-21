"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/component/admin/AdminLayout";
import { Trash2, Edit2, Plus } from "lucide-react";
import SliderModal from "@/component/admin/SliderModal";

export default function SliderPage() {
    const [authorized, setAuthorized] = useState(false);
    const [sliders, setSliders] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showInsertSlider, setShowInsertSlider] = useState(false);
    const itemsPerPage = 5;

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) window.location.href = "/admin/login";
        else {
            setAuthorized(true);
            fetchSliders();
        }
    }, []);

    const fetchSliders = async () => {
        try {
            const res = await fetch("/api/admin/sliders");
            const data = await res.json();
            setSliders(data);
        } catch (err) {
            console.error("Failed to fetch sliders:", err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this slider?")) {
            try {
                await fetch(`/api/admin/sliders/${id}`, { method: "DELETE" });
                fetchSliders();
            } catch (err) {
                console.error("Failed to delete slider:", err);
            }
        }
    };

    const handleToggleActive = async (id: string) => {
        try {
            await fetch(`/api/sliders/${id}/toggle`, { method: "PATCH" });
            fetchSliders();
        } catch (err) {
            console.error("Failed to toggle active status:", err);
        }
    };

    const handleInsertSlider = async (formData: FormData) => {
        try {
            const res = await fetch("/api/admin/sliders", {
                method: "POST",
                body: formData,
            });
            if (res.ok) fetchSliders();
            setShowInsertSlider(false);
        } catch (err) {
            console.error(err);
        }
    };


    if (!authorized)
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="relative flex space-x-3 mb-4">
                        <div className="w-5 h-5 bg-[#e94e4e] rounded-full animate-bounce"></div>
                        <div className="w-5 h-5 bg-[#f97316] rounded-full animate-bounce delay-150"></div>
                        <div className="w-5 h-5 bg-[#facc15] rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="text-gray-700 font-semibold text-lg">Loading...</p>
                </div>
            </div>
        );

    const totalPages = Math.ceil(sliders.length / itemsPerPage);
    const paginatedData = sliders.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Sliders</h1>

            {/* Slider Table */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">All Sliders</h2>
                    <button
                        onClick={() => setShowInsertSlider(true)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#e94e4e] text-white text-sm rounded-md hover:bg-red-600 shadow transition"
                    >
                        <Plus size={14} /> New Slider
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide font-semibold">
                            <tr>
                                <th className="py-4 px-5 text-left border-b border-gray-200 rounded-tl-2xl">Image</th>
                                <th className="py-4 px-5 text-left border-b border-gray-200">Title</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200">Order</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200">Status</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200 rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((slider, idx) => (
                                    <tr
                                        key={idx}
                                        className="hover:bg-gray-50 transition-colors border-b border-gray-200"
                                    >
                                        <td className="py-3 px-5">
                                            {slider.image?.url ? (
                                                <img
                                                    src={slider.image.url}
                                                    alt={slider.title}
                                                    className="h-16 w-28 object-cover rounded-lg border border-gray-200 shadow-sm"
                                                />
                                            ) : (
                                                <div className="h-16 w-28 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 text-xs text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-5 font-medium">{slider.title}</td>
                                      <td className="py-3 px-5 text-center">
  <span className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded-full">
    #{slider.displayOrder}
  </span>
</td>


                                        <td className="py-3 px-5 text-center">
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={slider.active}
      onChange={() => handleToggleActive(slider._id)}
      className="sr-only"
    />
    {/* Track */}
    <div
      className="w-10 h-5 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-500 
                 peer-checked:bg-blue-500 transition-all"
    ></div>
    {/* Thumb */}
    <span
      className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-md 
                 transform transition-transform peer-checked:translate-x-5"
    ></span>
  </label>
</td>

<td className="py-3 px-5 text-center">
  <div className="flex justify-center gap-2">
    {/* Edit Button */}
    <button
      className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white 
                 hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition transform hover:scale-110"
      title="Edit"
    >
      <Edit2 size={16} />
    </button>

    {/* Delete Button */}
    <button
      onClick={() => handleDelete(slider._id)}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white 
                 hover:from-red-600 hover:to-red-700 shadow-md hover:shadow-lg transition transform hover:scale-110"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  </div>
</td>


                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center py-8 text-gray-500 italic border-b border-gray-200">
                                        No sliders found
                                    </td>
                                </tr>
                            )}
                        </tbody>

                    </table>

                </div>

                {/* Pagination */}
                <div className="flex justify-end items-center mt-4 space-x-2">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md font-medium ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-md font-medium ${currentPage === i + 1 ? "bg-[#e94e4e] text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md font-medium ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Insert Slider Modal */}
            {showInsertSlider && (
                <SliderModal onClose={() => setShowInsertSlider(false)} onSubmit={handleInsertSlider} />
            )}
        </AdminLayout>
    );
}
