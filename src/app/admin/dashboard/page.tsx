"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/component/admin/AdminLayout";
import { Users, BookOpen, MessageSquare, FileText, Trash2 } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [authorized, setAuthorized] = useState(false);

  const chartData = [
    { month: "Jan", enquiries: 30, students: 20, courses: 10 },
    { month: "Feb", enquiries: 45, students: 35, courses: 15 },
    { month: "Mar", enquiries: 60, students: 40, courses: 20 },
    { month: "Apr", enquiries: 80, students: 55, courses: 25 },
    { month: "May", enquiries: 70, students: 50, courses: 30 },
    { month: "Jun", enquiries: 90, students: 70, courses: 40 },
  ];

  const initialEnquiriesData = [
    { name: "Rahul Sharma", email: "rahul@gmail.com", phone: "+91 9999999999", course: "IAS Foundation", date: "2025-08-19" },
    { name: "Priya Singh", email: "priya@gmail.com", phone: "+91 8888888888", course: "UPSC CSE", date: "2025-08-18" },
    { name: "Amit Kumar", email: "amit@gmail.com", phone: "+91 7777777777", course: "GS Prelims", date: "2025-08-17" },
    { name: "Neha Gupta", email: "neha@gmail.com", phone: "+91 6666666666", course: "Mains Coaching", date: "2025-08-16" },
    { name: "Rohan Verma", email: "rohan@gmail.com", phone: "+91 5555555555", course: "Optional Subject", date: "2025-08-15" },
    { name: "Anita Joshi", email: "anita@gmail.com", phone: "+91 4444444444", course: "IAS Foundation", date: "2025-08-14" },
  ];

  const [enquiriesData, setEnquiriesData] = useState(initialEnquiriesData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const totalPages = Math.ceil(enquiriesData.length / itemsPerPage);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      window.location.href = "/admin/login";
    } else {
      setAuthorized(true);
    }
  }, []);

  const handleDelete = (index: number) => {
    if (confirm("Are you sure you want to delete this enquiry?")) {
      const updated = enquiriesData.filter((_, i) => i !== index);
      setEnquiriesData(updated);

      if ((currentPage - 1) * itemsPerPage >= updated.length && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
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

  const paginatedData = enquiriesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <AdminLayout>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Students Card */}
        <div className="w-70 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 shadow-md rounded-xl p-4 flex items-center gap-3 hover:shadow-lg hover:scale-105 transition-transform duration-200">
          <div className="bg-white/70 p-2 rounded-lg shadow-sm">
            <Users size={28} className="text-blue-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Students</h2>
            <p className="text-2xl font-medium">1200+</p>
          </div>
        </div>

        {/* Courses Card */}
        <div className="w-70 bg-gradient-to-r from-green-100 to-green-200 text-green-800 shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl hover:scale-105 transition-transform duration-200">
          <div className="bg-white/70 p-3 rounded-xl shadow-sm">
            <BookOpen size={32} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Courses</h2>
            <p className="text-2xl font-medium">35</p>
          </div>
        </div>

        {/* Enquiries Card */}
        <div className="w-70 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl hover:scale-105 transition-transform duration-200">
          <div className="bg-white/70 p-3 rounded-xl shadow-sm">
            <MessageSquare size={32} className="text-purple-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Enquiries</h2>
            <p className="text-2xl font-medium">{enquiriesData.length}</p>
          </div>
        </div>

        {/* Blogs Card */}
        <div className="w-70 bg-gradient-to-r from-orange-100 to-red-200 text-red-800 shadow-md rounded-2xl p-6 flex items-center gap-4 hover:shadow-xl hover:scale-105 transition-transform duration-200">
          <div className="bg-white/70 p-3 rounded-xl shadow-sm">
            <FileText size={32} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Blogs</h2>
            <p className="text-2xl font-medium">50</p>
          </div>
        </div>
      </div>

      {/* Enhanced Graph */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
        <h2 className="text-lg font-semibold mb-4">Enquiries Overview</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorEnquiries" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#e94e4e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#e94e4e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorCourses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#facc15" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#facc15" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="4 4" stroke="#f0f0f0" />
            <XAxis dataKey="month" stroke="#555" />
            <YAxis stroke="#555" />
            <Tooltip
              contentStyle={{ backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
            />
            <Legend />
            <Line type="monotone" dataKey="enquiries" stroke="#e94e4e" strokeWidth={3} dot={{ r: 5, fill: "#e94e4e" }} activeDot={{ r: 8 }} fill="url(#colorEnquiries)" />
            <Line type="monotone" dataKey="students" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5, fill: "#3b82f6" }} activeDot={{ r: 8 }} fill="url(#colorStudents)" />
            <Line type="monotone" dataKey="courses" stroke="#facc15" strokeWidth={3} dot={{ r: 5, fill: "#facc15" }} activeDot={{ r: 8 }} fill="url(#colorCourses)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Enquiries Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Latest Enquiries</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 font-medium text-gray-700">Name</th>
                <th className="py-2 px-4 font-medium text-gray-700">Email</th>
                <th className="py-2 px-4 font-medium text-gray-700">Phone</th>
                <th className="py-2 px-4 font-medium text-gray-700">Course</th>
                <th className="py-2 px-4 font-medium text-gray-700">Date</th>
                <th className="py-2 px-4 font-medium text-gray-700 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((enquiry, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                  <td className="py-2 px-4">{enquiry.name}</td>
                  <td className="py-2 px-4">{enquiry.email}</td>
                  <td className="py-2 px-4">{enquiry.phone}</td>
                  <td className="py-2 px-4">{enquiry.course}</td>
                  <td className="py-2 px-4">{enquiry.date}</td>
                  <td className="py-2 px-4 flex justify-center">
                    <button
                      onClick={() => handleDelete((currentPage - 1) * itemsPerPage + idx)}
                      className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-full transition-all"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md font-medium ${
              currentPage === 1
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-md font-medium ${
                currentPage === i + 1
                  ? "bg-[#e94e4e] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md font-medium ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
