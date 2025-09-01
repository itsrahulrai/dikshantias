"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminLayout from "@/component/admin/AdminLayout";
import ImageUpload from "@/component/admin/ImageUpload";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import RichTextEditor from "@/component/admin/RichTextEditor";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: Category;
}

export default function AddCurrentAffairsPage() {
  const router = useRouter();
  const pathname = usePathname();

  // Extract ID from URL if editing
  // const editId = pathname.split("/").pop();
  const editId = pathname ? pathname.split("/").pop() : null;
  const [currentAffairId, setCurrentAffairId] = useState<string | null>(null);

  // 📌 Basic Info
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortContent, setShortContent] = useState("");
  const [content, setContent] = useState("");
  const [active, setActive] = useState(true);

  // 📌 Category & Sub Category
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");



  // 📌 Media
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [imageAlt, setImageAlt] = useState("");

  // Loading / Submitting
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Auto-generate slug
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
    } else {
      setSlug("");
    }
  }, [title]);

  // Fetch categories, subcategories and existing data (if editing)
  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch categories
        const catRes = await fetch("/api/admin/blog-categories");
        const cats = await catRes.json();
        setCategories(cats);

        // Fetch subcategories
        const subRes = await fetch("/api/admin/sub-categories");
        const subs = await subRes.json();
        setSubCategories(subs);

        // Fetch existing current affair if edit
        if (editId) {
          const res = await fetch(`/api/admin/current-affairs/${editId}`);
          const data = await res.json();
          setCurrentAffairId(data._id);
          setTitle(data.title);
          setSlug(data.slug);
          setShortContent(data.shortContent);
          setContent(data.content);
          setCategory(data.category.$oid ? data.category.$oid : data.category._id?.toString());
          setSubCategory(data.subCategory?.$oid ? data.subCategory.$oid : data.subCategory?._id?.toString() || "");
          setActive(data.active);
          setImageAlt(data.imageAlt || "");
          setImageFile(null); // no new file yet
          setExistingImage(data.image?.url || null);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [editId]);

     // Filter subcategories based on selected category
    const filteredSubCategories = subCategories.filter(
      (sub) => sub.category?._id?.toString() === category
          || sub.category?._id === category
    );

  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();

      if (currentAffairId) formData.append("_id", currentAffairId);

      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("shortContent", shortContent);
      formData.append("content", content);
      formData.append("active", JSON.stringify(active));
      formData.append("category", category);
      formData.append("subCategory", subCategory);

      if (imageFile) formData.append("image", imageFile);
      if (imageAlt) formData.append("imageAlt", imageAlt);

    const res = await fetch(
        currentAffairId
          ? `/api/admin/current-affairs/${currentAffairId}`
          : "/api/admin/current-affairs",                   
        {
          method: currentAffairId ? "PUT" : "POST",
          body: formData,
        }
      );


      if (!res.ok) throw new Error("Failed to save current affair");

      toast.success(`Current Affair ${editId ? "updated" : "added"} successfully`);
      router.push("/admin/current-affairs");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save current affair");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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
  }

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
            Current Affair is being {editId ? "updated" : "created"}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {editId ? "Edit Current Affair" : "Add Current Affair"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-6xl mx-auto space-y-8"
      >
        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
                required
              />
            </div>
          </div>

          {/* Category & Sub Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-3">
            <div>
              <label className="block font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setSubCategory("");
                }}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg appearance-none focus:ring-2 focus:ring-[#e94e4e]/40 focus:border-[#e94e4e] transition outline-none"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg appearance-none focus:ring-2 focus:ring-[#e94e4e]/40 focus:border-[#e94e4e] transition outline-none"
                required
                disabled={!category}
              >
                <option value="">Select Sub Category</option>
                {filteredSubCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Short Content */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 mt-4">
              Short Content
            </label>
            <textarea
              value={shortContent}
              onChange={(e) => setShortContent(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
              rows={3}
            />
          </div>

          {/* Full Content */}
          <div>
            <label className="block font-medium text-gray-700 mb-1 mt-4">
              Full Content
            </label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
            Image
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <ImageUpload
                onImageSelect={(file) => setImageFile(file)}
                isLoading={false}
                initialImage={existingImage}
              />
              <span className="text-gray-400 text-xs mt-1 block">
                Recommended size: <strong>500px × 300px</strong>
              </span>
            </div>

            <div>
              <label className="block font-medium text-gray-700 mb-1">Image Alt Text</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg focus:ring-1 focus:ring-[#e94e4e] transition outline-none"
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-300 pb-2">
            Status
          </h2>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <span className="text-gray-700 font-medium">Active</span>
              <button
                type="button"
                onClick={() => setActive(!active)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                  active ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition ${
                    active ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition"
            onClick={() => router.push("/admin/current-affairs")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2 bg-[#e94e4e] text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            <CheckCircle size={18} className="text-white" />
            {editId ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
