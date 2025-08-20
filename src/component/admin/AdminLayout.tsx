"use client";

import Header from "@/component/admin/Header";
import Sidebar from "@/component/admin/Sidebar";
import Footer from "@/component/admin/Footer";
import { usePathname } from "next/navigation";

import { Poppins } from "next/font/google";

// Use Poppins only for admin dashboard
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hide admin chrome on login page
  if (pathname === "/admin/login") {
    return <div className="min-h-screen flex items-center justify-center">{children}</div>;
  }

  return (
    <div className={`flex flex-col min-h-screen bg-gray-100 ${poppins.variable} font-sans`}>
      {/* Header stays fixed */}
      <Header />

      {/* Content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar scrollable independently */}
        <div className="w-64 flex-shrink-0 overflow-y-auto border-r border-gray-200">
          <Sidebar />
        </div>

        {/* Main content scrollable independently */}
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {children}
        </main>
      </div>

      {/* Footer stays fixed */}
      <Footer />
    </div>
  );
}
