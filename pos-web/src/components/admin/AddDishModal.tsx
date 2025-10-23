"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

type IngredientRow = {
  id: number;
  code: string;
  name: string;
  quantity: string;
  unit: string;
};

export default function AddDishModal({ onClose }: { onClose: () => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [rows, setRows] = useState<IngredientRow[]>([
    { id: 1, code: "BUTTERFLYPEA", name: "Butterfly Pea Flower", quantity: "10", unit: "gram" },
    { id: 2, code: "WHIP", name: "Whipping Cream", quantity: "20", unit: "ml" },
  ]);

  // Add new row
  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), code: "", name: "", quantity: "", unit: "" }]);
  };

  // Remove last row
  const handleRemoveRow = () => {
    if (rows.length > 0) setRows(rows.slice(0, -1));
  };

  // Handle input changes
  const handleChange = (id: number, field: keyof IngredientRow, value: string) => {
    setRows(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  // Handle image upload
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
      <div className="bg-[#F4E1D2] w-[85%] rounded-md shadow-lg border border-[#B7855E] relative">
        {/* Header */}
        <div className="flex justify-between items-center bg-[#5C2C1C] text-white px-4 py-2 rounded-t-md">
          <h2 className="font-semibold text-lg">Add New Dish</h2>
          <button onClick={onClose} className="hover:text-gray-300">
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 text-sm">
          <div className="grid grid-cols-3 gap-6">
            {/* Left side */}
            <div className="col-span-2 space-y-2">
              {/* Type */}
              <div className="flex items-center gap-4">
                <label className="font-semibold">Type:</label>
                <div className="flex gap-3">
                  <label>
                    <input type="radio" name="type" defaultChecked /> Beverage
                  </label>
                  <label>
                    <input type="radio" name="type" /> Food
                  </label>
                </div>
              </div>

              {/* Dish info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>
                    Dish Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#B7855E] rounded px-2 py-1"
                    placeholder="Enter dish name..."
                  />
                </div>
                <div>
                  <label>
                    Dish Code <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#B7855E] rounded px-2 py-1"
                    placeholder="e.g., U06"
                  />
                </div>
                <div>
                  <label>Menu Group</label>
                  <select className="w-full border border-[#B7855E] rounded px-2 py-1">
                    <option>Tea</option>
                    <option>Coffee</option>
                    <option>Cake</option>
                  </select>
                </div>
                <div>
                  <label>
                    Price <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-[#B7855E] rounded px-2 py-1"
                    placeholder="e.g., 35,000 VND"
                  />
                </div>
                <div>
                  <label>
                    Unit <span className="text-red-600">*</span>
                  </label>
                  <select className="w-full border border-[#B7855E] rounded px-2 py-1">
                    <option>Cup</option>
                    <option>Portion</option>
                  </select>
                </div>
                <div>
                  <label>Prepared At</label>
                  <select className="w-full border border-[#B7855E] rounded px-2 py-1">
                    <option>Bar</option>
                    <option>Kitchen</option>
                  </select>
                </div>
              </div>

              {/* Ingredient Table */}
              <div className="mt-4">
                <p className="font-semibold mb-2">
                  Ingredient Details <span className="text-red-600">*</span>
                </p>

                <table className="w-full border-collapse text-sm">
                  <thead className="bg-[#CFA987]">
                    <tr>
                      <th className="border border-[#B7855E] px-2 py-1">Ingredient Code</th>
                      <th className="border border-[#B7855E] px-2 py-1 text-left">Ingredient Name</th>
                      <th className="border border-[#B7855E] px-2 py-1">Quantity</th>
                      <th className="border border-[#B7855E] px-2 py-1">Unit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr
                        key={r.id}
                        className={i % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"}
                      >
                        <td className="border border-[#D1A988] px-2 py-1">
                          <input
                            type="text"
                            value={r.code}
                            onChange={(e) => handleChange(r.id, "code", e.target.value)}
                            className="w-full bg-transparent outline-none"
                          />
                        </td>
                        <td className="border border-[#D1A988] px-2 py-1">
                          <input
                            type="text"
                            value={r.name}
                            onChange={(e) => handleChange(r.id, "name", e.target.value)}
                            className="w-full bg-transparent outline-none"
                          />
                        </td>
                        <td className="border border-[#D1A988] px-2 py-1 text-center">
                          <input
                            type="number"
                            value={r.quantity}
                            onChange={(e) => handleChange(r.id, "quantity", e.target.value)}
                            className="w-full bg-transparent outline-none text-center"
                          />
                        </td>
                        <td className="border border-[#D1A988] px-2 py-1 text-center">
                          <input
                            type="text"
                            value={r.unit}
                            onChange={(e) => handleChange(r.id, "unit", e.target.value)}
                            className="w-full bg-transparent outline-none text-center"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Add / Remove row buttons */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddRow}
                      className="bg-[#B7855E] text-white px-3 py-1 rounded hover:bg-[#9c6b46]"
                    >
                      + Add Row
                    </button>
                    <button
                      onClick={handleRemoveRow}
                      className="bg-[#B7855E] text-white px-3 py-1 rounded hover:bg-[#9c6b46]"
                    >
                      − Remove Row
                    </button>
                  </div>
                  <p className="font-semibold text-[#4B2E12]">
                    Total Rows: {rows.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Image preview */}
            <div className="space-y-2">
              <p className="font-semibold">Dish Image</p>
              <div className="border border-[#B7855E] rounded-md overflow-hidden bg-white p-2 text-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-48 object-cover rounded"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center text-gray-500">
                    No image selected
                  </div>
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
                    className="text-red-600 text-sm mt-1 underline"
                  >
                    Remove image
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-700">
                Supported formats: (.jpg, .jpeg, .png, .gif)
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-4">
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
    </div>
  );
}
