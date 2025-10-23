"use client";
import React from "react";

const data = [
  { type: "Drink", code: "U01", name: "Cappuccino", group: "Coffee", unit: "Cup", price: 65000 },
  { type: "Drink", code: "U02", name: "Cafe Latte", group: "Coffee", unit: "Cup", price: 65000 },
  { type: "Drink", code: "U03", name: "Espresso", group: "Coffee", unit: "Cup", price: 39000 },
  { type: "Drink", code: "U04", name: "Peach Jelly Tea", group: "Tea", unit: "Cup", price: 39000 },
  { type: "Drink", code: "U05", name: "Lychee Jelly Tea", group: "Tea", unit: "Cup", price: 39000 },
  { type: "Food", code: "A01", name: "Tiramisu", group: "Cake", unit: "Portion", price: 30000 },
  { type: "Food", code: "A02", name: "Coffee Cheesecake", group: "Cake", unit: "Portion", price: 29000 },
  { type: "Food", code: "A03", name: "Matcha Cheesecake", group: "Cake", unit: "Portion", price: 29000 },
  { type: "Food", code: "A04", name: "Caramel Cheesecake", group: "Cake", unit: "Portion", price: 29000 },
];

export default function MenuTable() {
  return (
    <div className="px-6 py-3">
      <table className="w-full border-collapse text-sm text-[#3A1F0B] shadow-sm">
        <thead>
          <tr className="bg-[#5C2C1C] text-white">
            <th className="py-2 px-3 border border-[#8B5B40] text-left">Type</th>
            <th className="py-2 px-3 border border-[#8B5B40] text-left">Code</th>
            <th className="py-2 px-3 border border-[#8B5B40] text-left">Name</th>
            <th className="py-2 px-3 border border-[#8B5B40] text-left">Menu Group</th>
            <th className="py-2 px-3 border border-[#8B5B40] text-left">Unit</th>
            <th className="py-2 px-3 border border-[#8B5B40] text-right">Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"
              } hover:bg-[#EAD4BF] transition`}
            >
              <td className="py-2 px-3 border border-[#D1A988]">{item.type}</td>
              <td className="py-2 px-3 border border-[#D1A988]">{item.code}</td>
              <td className="py-2 px-3 border border-[#D1A988]">{item.name}</td>
              <td className="py-2 px-3 border border-[#D1A988]">{item.group}</td>
              <td className="py-2 px-3 border border-[#D1A988]">{item.unit}</td>
              <td className="py-2 px-3 border border-[#D1A988] text-right">
                {item.price.toLocaleString()} VND
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-end mt-3 text-sm">
        <span>Page 1 of 7</span>
      </div>
    </div>
  );
}
