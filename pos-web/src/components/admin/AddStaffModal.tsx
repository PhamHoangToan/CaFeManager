"use client";
import React, { useState } from "react";
import { FaTimes, FaUserCircle } from "react-icons/fa";

export default function AddStaffModal({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#F4E1D2] w-[80%] rounded-md shadow-lg border border-[#B7855E] relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#5C2C1C] text-white px-4 py-2 rounded-t-md">
          <h2 className="font-semibold text-lg">Add New Staff</h2>
          <button onClick={onClose} className="hover:text-gray-300">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 grid grid-cols-3 gap-6 text-sm">
          {/* LEFT: Staff information */}
          <div className="col-span-2 space-y-3">
            <div>
              <label>
                Staff ID <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-[#B7855E] rounded px-2 py-1"
                defaultValue="PC03"
              />
            </div>

            <div>
              <label>
                Staff Name <span className="text-red-600">*</span>
              </label>
              <input
                className="w-full border border-[#B7855E] rounded px-2 py-1"
                defaultValue="Hoang Anh Hao"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>Gender</label>
                <select className="w-full border border-[#B7855E] rounded px-2 py-1">
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>
              <div>
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="w-full border border-[#B7855E] rounded px-2 py-1"
                  defaultValue="1999-11-20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label>ID Card Number</label>
                <input
                  className="w-full border border-[#B7855E] rounded px-2 py-1"
                  defaultValue="023456789"
                />
              </div>
              <div>
                <label>Date of Issue</label>
                <input
                  type="date"
                  className="w-full border border-[#B7855E] rounded px-2 py-1"
                  defaultValue="2019-08-11"
                />
              </div>
            </div>

            <div>
              <label>Role</label>
              <input
                className="w-full border border-[#B7855E] rounded px-2 py-1"
                defaultValue="Barista"
              />
            </div>

            <div>
              <label>Working Shift</label>
              <input
                className="w-full border border-[#B7855E] rounded px-2 py-1"
                defaultValue="Afternoon, Evening"
              />
            </div>
          </div>

          {/* RIGHT: Avatar */}
          <div>
            <p className="font-semibold">Profile Picture</p>
            <div className="border border-[#B7855E] rounded-md p-3 text-center bg-white">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-48 object-cover rounded-md"
                />
              ) : (
                <FaUserCircle className="text-gray-400 text-8xl mx-auto my-3" />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-2"
              />
              {preview && (
                <button
                  onClick={() => setPreview(null)}
                  className="text-red-600 text-sm underline mt-1"
                >
                  Remove Image
                </button>
              )}
              <p className="text-xs text-gray-600 mt-2">
                Supported formats: (.jpg, .jpeg, .png, .gif)
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-4 pb-3">
          <button className="bg-[#4B8F4B] text-white px-5 py-1 rounded hover:bg-[#3a7f3a]">
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-[#B7855E] text-white px-5 py-1 rounded hover:bg-[#9c6b46]"
          >
            Cancel
          </button>
          <button className="bg-[#5C2C1C] text-white px-5 py-1 rounded hover:bg-[#7B3F26]">
            Help
          </button>
        </div>
      </div>
    </div>
  );
}
