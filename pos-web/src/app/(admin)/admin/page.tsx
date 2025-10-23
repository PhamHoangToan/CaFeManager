"use client";
import AdminActionBar from "@/components/admin/AdminActionBar";
import MenuTable from "@/components/admin/MenuTable";

export default function AdminMenuPage() {
  return (
    <div>
      <AdminActionBar type="menu" />
      <MenuTable />
    </div>
  );
}
