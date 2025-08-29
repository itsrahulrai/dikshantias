"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/component/admin/AdminLayout";
import ImageUpload from "@/component/admin/ImageUpload";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function AddTestimonialPage() {
    const router = useRouter();

    // Basic Info
    const [name, setName] = useState("");
    const [rank, setRank] = useState("");
    const [year, setYear] = useState("");
    const [attempts, setAttempts] = useState("");
    const [background, setBackground] = useState("");
    const [optional, setOptional] = useState("");
    const [quote, setQuote] = useState("");

    // Media
    const [imageFile, setImageFile] = useState<File | null>(null);
   

    // Active Toggle
    const [active, setActive] = useState(true);

    // Loading / Submitting
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("rank", rank);
            formData.append("year", year);
            formData.append("attempts", attempts);
            formData.append("background", background);
            formData.append("optional", optional);
            formData.append("quote", quote);
            formData.append("active", JSON.stringify(active));

            if (imageFile) formData.append("image", imageFile);

            const res = await fetch("/api/admin/testimonials", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Failed to create testimonial");

            toast.success("Testimonial added successfully");
            router.push("/admin/testimonials");
        } catch (err) {
            console.error(err);
            toast.error("Failed to add testimonial");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || submitting) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="flex flex-col items-center">
                    <div className="relative flex space-x-3 mb-4">
                        <div className="w-5 h-5 bg-[#e94e4e] rounded-full animate-bounce"></div>
                        <div className="w-5 h-5 bg-[#f97316] rounded-full animate-bounce delay-150"></div>
                        <div className="w-5 h-5 bg-[#facc15] rounded-full animate-bounce delay-300"></div>
                    </div>
                    <p className="text-gray-700 font-semibold text-lg">
                        {submitting ? "Saving testimonial..." : "Loading..."}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">New Testimonial</h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto space-y-8"
            >
                {/* Basic Info */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                        Testimonial Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Rank</label>
                            <input
                                type="text"
                                value={rank}
                                onChange={(e) => setRank(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Year</label>
                            <input
                                type="text"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Attempts</label>
                            <input
                                type="text"
                                value={attempts}
                                onChange={(e) => setAttempts(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                required
                            />
                        </div>

                        {/* ✅ New Background Input */}
                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Background</label>
                            <input
                                type="text"
                                value={background}
                                onChange={(e) => setBackground(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1">Optional Subject</label>
                            <input
                                type="text"
                                value={optional}
                                onChange={(e) => setOptional(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                            />
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-gray-700 mb-1">Quote</label>
                        <textarea
                            value={quote}
                            onChange={(e) => setQuote(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                            rows={5}
                            placeholder="Write testimonial quote..."
                            required
                        />
                    </div>

                </div>

                {/* Image Upload */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                        Testimonial Image
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <ImageUpload
                                onImageSelect={(file) => setImageFile(file)}
                                isLoading={false}
                            />
                            <span className="text-gray-400 text-xs mt-1 block">
                                Recommended size: <strong>150px × 150px</strong>
                            </span>
                        </div>
                        
                    </div>
                </div>

                {/* Visibility */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                        Status
                    </h2>
                    <div className="flex items-center gap-10">
                        <span className="text-gray-700 font-medium">Active</span>
                        <button
                            type="button"
                            onClick={() => setActive(!active)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                ${active ? "bg-green-500" : "bg-gray-300"}`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition
                  ${active ? "translate-x-6" : "translate-x-1"}`}
                            />
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 mt-6">
                    <button
                        type="button"
                        className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                        onClick={() => router.push("/admin/testimonials")}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 bg-[#e94e4e] text-white rounded-lg shadow-md hover:bg-red-600 transition"
                    >
                        <CheckCircle size={18} className="text-white" />
                        Save
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
