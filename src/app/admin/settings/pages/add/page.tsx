    "use client";

    import { useState, useEffect } from "react";
    import { useRouter } from "next/navigation";
    import AdminLayout from "@/component/admin/AdminLayout";
    import ImageUpload from "@/component/admin/ImageUpload";
    import { CheckCircle } from "lucide-react";
    import toast from "react-hot-toast";
    import RichTextEditor from "@/component/admin/RichTextEditor";

    export default function AddPage() {
    const router = useRouter();

    // Page fields
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [active, setActive] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageAlt, setImageAlt] = useState("");

    // SEO / Meta
    const [metaTitle, setMetaTitle] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [metaKeywords, setMetaKeywords] = useState<string[]>([]);
    const [metaKeywordInput, setMetaKeywordInput] = useState("");
    const [canonicalUrl, setCanonicalUrl] = useState("");
    const [ogTitle, setOgTitle] = useState("");
    const [ogDescription, setOgDescription] = useState("");
    const [index, setIndex] = useState(true);
    const [follow, setFollow] = useState(true);

    const [loading, setLoading] = useState(true); // for categories
    const [submitting, setSubmitting] = useState(false);

    // Auto-generate slug from title
    useEffect(() => {
        if (title) {
        setSlug(
            title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
        );
        }
    }, [title]);

    
        // Add meta keyword
        const addMetaKeyword = () => {
            if (metaKeywordInput.trim() && !metaKeywords.includes(metaKeywordInput.trim())) {
                setMetaKeywords([...metaKeywords, metaKeywordInput.trim()]);
                setMetaKeywordInput("");
            }
        };

        const removeMetaKeyword = (keyword: string) => {
            setMetaKeywords(metaKeywords.filter((k) => k !== keyword));
        };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);
        formData.append("active", JSON.stringify(active));

        if (imageFile) {
            formData.append("image", imageFile);
            formData.append("imageAlt", imageAlt);
        }

        // SEO
        formData.append("metaTitle", metaTitle);
        formData.append("metaDescription", metaDescription);
        formData.append("metaKeywords", JSON.stringify(metaKeywords));
        formData.append("canonicalUrl", canonicalUrl);
        formData.append("ogTitle", ogTitle);
        formData.append("ogDescription", ogDescription);
        formData.append("index", JSON.stringify(index));
        formData.append("follow", JSON.stringify(follow));

        const res = await fetch("/api/admin/pages", {
            method: "POST",
            body: formData,
        });

        if (!res.ok) throw new Error("Failed to add page");

        toast.success("Page added successfully");
        router.push("/admin/settings/pages");
        } catch (err) {
        console.error(err);
        toast.error("Failed to add page");
        } finally {
        setSubmitting(false);
        }
    };

    

            // Show submitting overlay when blog is being created
        if (submitting) {
            return (
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="flex flex-col items-center">
                        <div className="relative flex space-x-3 mb-4">
                            <div className="w-5 h-5 bg-[#e94e4e] rounded-full animate-bounce"></div>
                            <div className="w-5 h-5 bg-[#f97316] rounded-full animate-bounce delay-150"></div>
                            <div className="w-5 h-5 bg-[#facc15] rounded-full animate-bounce delay-300"></div>
                        </div>
                        <p className="text-gray-700 font-semibold text-lg">Page is being created...</p>
                    </div>
                </div>
            );
        }


        return (
            <AdminLayout>
                <h1 className="text-3xl font-bold mb-6 text-gray-800">New Pages</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-2xl shadow-xl max-w-6xl mx-auto space-y-8"
                >
                    {/* Basic Info */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300-b pb-2">
                            Page Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full border border-gray-300  px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block  font-medium text-gray-700 mb-1">
                                    Slug
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                    required
                                />
                            </div>
                        
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300-b pb-2">
                            Content
                        </h2>
                        <div className="space-y-4">
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">
                                        Full Content
                                    </label>
                                <RichTextEditor value={content} onChange={setContent} />
                                </div>
                        </div>
                    </div>

                    
                    {/* Image Upload */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300-b pb-2">
                            Image
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <ImageUpload
                                    onImageSelect={(file) => setImageFile(file)}
                                    isLoading={false}
                                />
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Image Alt Text
                                </label>
                                <input
                                    type="text"
                                    value={imageAlt}
                                    onChange={(e) => setImageAlt(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                />
                            </div>
                        </div>
                    </div>


                    {/* SEO / Meta Fields */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300-b pb-2">
                            SEO / Meta Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block font-medium text-gray-700 mb-2">
                                    Meta Title
                                </label>
                                <input
                                    type="text"
                                    value={metaTitle}
                                    onChange={(e) => setMetaTitle(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    Canonical URL
                                </label>
                                <input
                                    type="text"
                                    value={canonicalUrl}
                                    onChange={(e) => setCanonicalUrl(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium text-gray-700 mb-1 mt-2">
                                Meta Description
                            </label>
                            <textarea
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none "
                                rows={2}
                            />
                        </div>

                        {/* Meta Keywords */}
                        <div className="mt-2">
                            <label className="block font-medium text-gray-700 mb-1">
                                Meta Keywords
                            </label>
                            <div className="flex gap-3 mb-3">
                                <input
                                    type="text"
                                    value={metaKeywordInput}
                                    onChange={(e) => setMetaKeywordInput(e.target.value)}
                                    className="border border-gray-300 px-4 py-2.5 rounded-lg flex-1 focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                    placeholder="Add keyword"
                                />


                                <button
                                    type="button"
                                    onClick={addMetaKeyword}
                                    className="flex items-center gap-2 px-5 py-2 bg-[#e94e4e] text-white rounded-lg shadow-md hover:bg-red-600 transition"
                                >
                                    <CheckCircle size={18} className="text-white" />
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {metaKeywords.map((k) => (
                                    <span
                                        key={k}
                                        className="bg-lime-100 px-3 py-1.5 rounded flex items-center gap-2 text-smborder border-gray-300"
                                    >
                                        {k}
                                        <button
                                            type="button"
                                            onClick={() => removeMetaKeyword(k)}
                                            className="text-red-500 font-bold hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* OG Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mt-2">
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    OG Title
                                </label>
                                <input
                                    type="text"
                                    value={ogTitle}
                                    onChange={(e) => setOgTitle(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-medium text-gray-700 mb-1">
                                    OG Description
                                </label>
                                <textarea
                                    value={ogDescription}
                                    onChange={(e) => setOgDescription(e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                                    rows={2}
                                />
                            </div>
                        </div>



                    </div>


                    {/* SEO / Meta Fields */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
                            Visibility & Status
                        </h2>

                        <div className="flex items-center gap-10">
                            {/* Index Toggle */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-700 font-medium">Index</span>
                                <button
                                    type="button"
                                    onClick={() => setIndex(!index)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                                            ${index ? "bg-[#00C950]" : "bg-gray-300"}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition
                                            ${index ? "translate-x-6" : "translate-x-1"}`}
                                    />
                                </button>
                            </div>

                            {/* Follow Toggle */}
                            <div className="flex items-center gap-3">
                                <span className="text-gray-700 font-medium">Follow</span>
                                <button
                                    type="button"
                                    onClick={() => setFollow(!follow)}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition
                ${follow ? "bg-[#00C950]" : "bg-gray-300"}`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition
                    ${follow ? "translate-x-6" : "translate-x-1"}`}
                                    />
                                </button>
                            </div>

                            {/* Active Toggle */}
                            <div className="flex items-center gap-3">
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
                    </div>




                    {/* Submit */}
                    <div className="flex justify-end gap-3 mt-6">
                        {/* Cancel Button */}
                        <button
                            type="button"
                            className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>

                        {/* Save Button */}
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
