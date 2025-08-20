"use client";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  MessageSquare,
  Settings,
  LogOut, // Import LogOut icon
} from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <aside className="bg-white h-full">
      <div className="p-6 flex flex-col justify-between h-full">
        <nav className="space-y-2">
          {/* Dashboard */}
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2 px-3 py-2 rounded-lg font-bold text-white bg-[#e94e4e] shadow-md"
          >
            <LayoutDashboard size={22} />
            <span>Dashboard</span>
          </Link>

          {/* Main Menus */}
          {[
            { href: "/admin/courses", label: "Courses", icon: BookOpen },
            { href: "/admin/students", label: "Students", icon: Users },
            { href: "/admin/messages", label: "Messages", icon: MessageSquare },
            { href: "/admin/blogs", label: "Blogs", icon: FileText },
            { href: "/admin/slider", label: "Slider", icon: BookOpen },
            { href: "/admin/testimonial", label: "Testimonial", icon: Users },
            { href: "/admin/result", label: "Result", icon: FileText },
            { href: "/admin/gallery", label: "Gallery", icon: MessageSquare },
            { href: "/admin/settings", label: "Settings", icon: Settings },
          ].map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-gray-800 hover:bg-red-100 hover:text-[#e94e4e] transition-all duration-200"
            >
              <item.icon size={22} className="text-[#e94e4e]" />
              <span>{item.label}</span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 rounded-lg font-medium text-gray-800 hover:bg-red-100 hover:text-[#e94e4e] transition-all duration-200"
          >
            <LogOut size={22} className="text-[#e94e4e]" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
