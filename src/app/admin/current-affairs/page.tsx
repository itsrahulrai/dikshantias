"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "@/component/admin/AdminLayout";
import { Trash2, Edit2, Plus, Search, List, Activity } from "lucide-react";
import toast from "react-hot-toast";
import ConfirmDialog from "@/component/admin/ConfirmDialog";

interface Course {
    _id: string;
    title: string;
    active: boolean;
    lectures: number;
    duration: string;
    price?: number;
    image?: { url: string; alt?: string };
    createdAt?: string;
}

export default function CoursePage() {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmAction, setConfirmAction] = useState<() => void>(() => { });
    const [confirmTitle, setConfirmTitle] = useState("");
    const [confirmMessage, setConfirmMessage] = useState("");
    const [confirmBtnText, setConfirmBtnText] = useState("Confirm");
    const itemsPerPage = 5;

    const [filterMode, setFilterMode] = useState<string>("");
    const [filterLanguage, setFilterLanguage] = useState<string>("");
    const [filterMinPrice, setFilterMinPrice] = useState<string>("");
    const [filterMaxPrice, setFilterMaxPrice] = useState<string>("");

    const [filterStatus, setFilterStatus] = useState<string>("");
    const [searchTitle, setSearchTitle] = useState<string>("");

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) window.location.href = "/admin/login";
        else {
            setAuthorized(true);
            fetchCourses();
        }
    }, []);

    const fetchCourses = async () => {
        try {
            const res = await fetch("/api/admin/courses");
            if (!res.ok) throw new Error("Failed to fetch courses");
            const data = await res.json();
            setCourses(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch courses");
        }
    };


    const handleDelete = (id: string) => {
        setConfirmTitle("Are you sure you want to delete this course?");
        setConfirmMessage("You won't be able to revert this!");
        setConfirmBtnText("Delete");

        setConfirmAction(() => async () => {
            try {
                const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
                const data = await res.json();

                if (!res.ok) {
                    toast.error(data.error || "Failed to delete course");
                    return;
                }

                fetchCourses(); // 🔄 Refresh list after delete
                toast.success("Course deleted successfully!");
            } catch (err) {
                console.error(err);
                toast.error("Failed to delete course");
            } finally {
                setConfirmOpen(false);
            }
        });

        setConfirmOpen(true);
    };


    const handleToggleActive = (id: string, currentStatus: boolean) => {
        setConfirmTitle(currentStatus ? "Deactivate this course?" : "Activate this course?");
        setConfirmMessage(
            `Are you sure you want to ${currentStatus ? "deactivate" : "activate"} this course?`
        );
        setConfirmBtnText(currentStatus ? "Yes, Deactivate" : "Yes, Activate");

        setConfirmAction(() => async () => {
            try {
                const res = await fetch(`/api/admin/courses/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify({ active: !currentStatus }),
                    headers: { "Content-Type": "application/json" },
                });

                if (res.ok) {
                    const data = await res.json();

                    // ✅ Use returned course object
                    setCourses((prev) =>
                        prev.map((course) =>
                            course._id === id ? { ...course, active: data.course.active } : course
                        )
                    );

                    toast.success(`Course has been ${!currentStatus ? "activated" : "deactivated"}`);
                } else {
                    toast.error("Something went wrong.");
                }
            } catch (err) {
                toast.error("Failed to update course.");
            } finally {
                setConfirmOpen(false);
            }
        });

        setConfirmOpen(true);
    };


    const filteredCourses = courses.filter((course) => {
        const matchesStatus =
            filterStatus === "true" ? course.active :
                filterStatus === "false" ? !course.active : true;

        const matchesMode = filterMode ? course.courseMode === filterMode : true;
        const matchesLanguage = filterLanguage ? course.languages === filterLanguage : true;
        const matchesPrice =
            (!filterMinPrice || course.price! >= parseFloat(filterMinPrice)) &&
            (!filterMaxPrice || course.price! <= parseFloat(filterMaxPrice));

        const matchesTitle = course.title.toLowerCase().includes(searchTitle.toLowerCase());

        return matchesStatus && matchesMode && matchesLanguage && matchesPrice && matchesTitle;
    });


    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const paginatedData = filteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

    return (
        <AdminLayout>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Current Affairs</h1>

            <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
                {/* Filters and Add Button */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                    <h2 className="text-xl font-semibold text-gray-700">All Current Affairs</h2>



                    <button
                        onClick={() => router.push("/admin/current-affairs/add")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#e94e4e] text-white text-sm rounded-md hover:bg-red-600 shadow transition"
                    >
                        <Plus size={14} /> New Current Affair
                    </button>
                </div>
                <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-xl shadow-sm mb-3">

                    {/* Language Filter */}
                    <div className="relative">
                        <List className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <select
                            value={filterLanguage}
                            onChange={(e) => setFilterLanguage(e.target.value)}
                            className="pl-7 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#e94e4e] focus:outline-none shadow-sm transition"
                        >
                            <option value="">All Languages</option>
                            {Array.from(new Set(courses.map((c) => c.languages))).map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    {/* Course Mode Filter */}
                    <div className="relative">
                        <List className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <select
                            value={filterMode}
                            onChange={(e) => setFilterMode(e.target.value)}
                            className="pl-7 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#e94e4e] focus:outline-none shadow-sm transition"
                        >
                            <option value="">All Modes</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                        </select>
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Activity className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="pl-7 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#e94e4e] focus:outline-none shadow-sm transition"
                        >
                            <option value="">All Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="flex items-center gap-2">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filterMinPrice}
                            onChange={(e) => setFilterMinPrice(e.target.value)}
                            className="w-36 pl-2 pr-1 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#e94e4e] focus:outline-none shadow-sm transition"
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filterMaxPrice}
                            onChange={(e) => setFilterMaxPrice(e.target.value)}
                            className="w-36 pl-2 pr-1 py-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#e94e4e] focus:outline-none shadow-sm transition"
                        />
                    </div>

                    {/* Title Search */}
                    <div className="relative flex-1 min-w-[130px]">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                        <input
                            type="text"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            placeholder="Search..."
                            className="pl-7 pr-3 py-2 w-full rounded-lg border border-gray-300 focus:ring-1 focus:ring-[#e94e4e] focus:outline-none shadow-sm transition"
                        />
                    </div>


                </div>


                <div className="overflow-x-auto">
                    <table className="w-full border-collapse bg-white rounded-2xl shadow-lg overflow-hidden">
                        <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide font-semibold">
                            <tr>
                                <th className="py-4 px-5 text-left border-b border-gray-200 rounded-tl-2xl">Image</th>
                                <th className="py-4 px-5 text-left border-b border-gray-200">Title</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200">Lectures</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200">Duration</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200">Price</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200">Status</th>
                                <th className="py-4 px-5 text-center border-b border-gray-200 rounded-tr-2xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-800 text-sm">
                            {paginatedData.length > 0 ? (
                                paginatedData.map((course) => (
                                    <tr key={course._id} className="hover:bg-gray-50 transition-colors border-b border-gray-200">
                                        <td className="py-3 px-5">
                                            {course.image?.url ? (
                                                <img
                                                    src={course.image.url}
                                                    alt={course.image.alt || course.title}
                                                    className="h-16 w-32 object-cover rounded"
                                                />
                                            ) : (
                                                <div className="h-16 w-32 bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                                                    No Image
                                                </div>
                                            )}
                                        </td>
                                        <td className="py-3 px-5 font-medium">{course.title}</td>
                                        <td className="py-3 px-5 text-center">{course.lectures}</td>
                                        <td className="py-3 px-5 text-center">{course.duration}</td>
                                        <td className="py-3 px-5 text-center">{course.price || "-"}</td>
                                        <td className="py-3 px-5 text-center">
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" checked={course.active} readOnly className="sr-only" />
                                                <div
                                                    onClick={() => handleToggleActive(course._id, course.active)}
                                                    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${course.active ? "bg-green-500" : "bg-gray-300"
                                                        }`}
                                                >
                                                    <span
                                                        className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${course.active ? "translate-x-6" : "translate-x-0"
                                                            }`}
                                                    ></span>
                                                </div>
                                            </label>
                                        </td>
                                        <td className="py-3 px-5 text-center">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => router.push(`/admin/courses/${course._id}`)}
                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transition transform hover:scale-110"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(course._id)}
                                                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg transition transform hover:scale-110"
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
                                    <td colSpan={7} className="text-center py-8 text-gray-500 italic border-b border-gray-200">
                                        No courses found
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
                        className={`px-3 py-1 rounded-md font-medium ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Prev
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-md font-medium ${currentPage === i + 1 ? "bg-[#e94e4e] text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md font-medium ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <ConfirmDialog
                isOpen={confirmOpen}
                title={confirmTitle}
                message={confirmMessage}
                confirmText={confirmBtnText}
                cancelText="Cancel"
                onConfirm={confirmAction}
                onCancel={() => setConfirmOpen(false)}
            />
        </AdminLayout>
    );
}
