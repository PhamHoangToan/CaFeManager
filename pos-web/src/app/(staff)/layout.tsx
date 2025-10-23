import React from "react";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#F9F3EE] text-[#3A1F0B]">
        {children}
      </body>
    </html>
  );
}
