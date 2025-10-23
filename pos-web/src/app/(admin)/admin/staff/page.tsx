"use client";
import AdminActionBar from "@/components/admin/AdminActionBar";

export default function StaffPage() {
  const staffList = [
    { code: "ST01", username: "tutrinh", name: "Nguyen Thi Tu Trinh", birth: "1998-10-23", gender: "Female", shift: "Morning - Night" },
    { code: "ST02", username: "nhutruc", name: "Nguyen Thi Nhu Truc", birth: "1997-08-05", gender: "Female", shift: "Afternoon - Night" },
    { code: "ST03", username: "quangminh", name: "Tran Quang Minh", birth: "2001-06-19", gender: "Male", shift: "Morning - Afternoon" },
  ];

  return (
    <div>
      <AdminActionBar type="staff" />

      <div className="px-6 py-4">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-[#CFA987] text-[#3A1F0B] font-semibold">
            <tr>
              <th className="border border-[#B7855E] px-2 py-1">Staff Code</th>
              <th className="border border-[#B7855E] px-2 py-1">Username</th>
              <th className="border border-[#B7855E] px-2 py-1">Full Name</th>
              <th className="border border-[#B7855E] px-2 py-1">Date of Birth</th>
              <th className="border border-[#B7855E] px-2 py-1">Gender</th>
              <th className="border border-[#B7855E] px-2 py-1">Shift</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((s, i) => (
              <tr key={s.code} className={i % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"}>
                <td className="border border-[#D1A988] px-2 py-1 text-center">{s.code}</td>
                <td className="border border-[#D1A988] px-2 py-1 text-center">{s.username}</td>
                <td className="border border-[#D1A988] px-2 py-1">{s.name}</td>
                <td className="border border-[#D1A988] px-2 py-1 text-center">{s.birth}</td>
                <td className="border border-[#D1A988] px-2 py-1 text-center">{s.gender}</td>
                <td className="border border-[#D1A988] px-2 py-1 text-center">{s.shift}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
