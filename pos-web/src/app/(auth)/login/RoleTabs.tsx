"use client";

interface RoleTabsProps {
  role: string;
  setRole: (role: string) => void;
}

export default function RoleTabs({ role, setRole }: RoleTabsProps) {
  const roles = [
    { id: "phucvu", label: "Phục vụ" },
    { id: "thungan", label: "Thu ngân" },
    { id: "admin", label: "Admin" },
    { id: "phache", label: "Pha chế" },
  ];

  return (
    <div className="flex justify-center gap-4 mt-4">
      {roles.map((r) => (
        <label key={r.id} className="flex items-center gap-1 text-sm cursor-pointer">
          <input
            type="radio"
            name="role"
            value={r.id}
            checked={role === r.id}
            onChange={() => setRole(r.id)}
            className="accent-[#603813]"
          />
          {r.label}
        </label>
      ))}
    </div>
  );
}
