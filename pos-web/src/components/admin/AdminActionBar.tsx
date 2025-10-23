"use client";
import React, { useState } from "react";
import AddDishModal from "./AddDishModal";
import AddStaffModal from "./AddStaffModal";
import PermissionModal from "./PermissionModal";

export default function AdminActionBar({ type }: { type: "menu" | "staff" }) {
  const [modal, setModal] = useState<"add" | "permission" | null>(null);

  const closeModal = () => setModal(null);

  return (
    <>
      <div className="flex gap-3 px-6 py-2 bg-[#D7B79E] border-b border-[#A27856]">
        {/* Add */}
        <button
          onClick={() => setModal("add")}
          className="bg-white text-[#4B2E12] border border-[#4B2E12] min-w-[80px] py-1 rounded font-medium hover:bg-[#EAD4BF]"
        >
          Add
        </button>

        {/* Edit */}
        <button className="bg-white text-[#4B2E12] border border-[#4B2E12] min-w-[80px] py-1 rounded font-medium hover:bg-[#EAD4BF]">
          Edit
        </button>

        {/* Delete */}
        <button className="bg-white text-[#4B2E12] border border-[#4B2E12] min-w-[80px] py-1 rounded font-medium hover:bg-[#EAD4BF]">
          Delete
        </button>

        {/* ✅ Only visible in the Staff tab */}
        {type === "staff" && (
          <button
            onClick={() => setModal("permission")}
            className="bg-white text-[#4B2E12] border border-[#4B2E12] min-w-[100px] py-1 rounded font-medium hover:bg-[#EAD4BF]"
          >
            Permissions
          </button>
        )}
      </div>

      {/* Display corresponding modal */}
      {modal === "add" &&
        (type === "menu" ? (
          <AddDishModal onClose={closeModal} />
        ) : (
          <AddStaffModal onClose={closeModal} />
        ))}

      {modal === "permission" && <PermissionModal onClose={closeModal} />}
    </>
  );
}
