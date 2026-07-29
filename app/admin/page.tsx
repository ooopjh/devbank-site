import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Starter admin dashboard for secure review of creator report submissions.",
  alternates: { canonical: "/admin" },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
