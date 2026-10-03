import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel | Vivek Singh",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#060913] text-gray-100 selection:bg-orange-500 selection:text-white">
      {children}
    </div>
  );
}
