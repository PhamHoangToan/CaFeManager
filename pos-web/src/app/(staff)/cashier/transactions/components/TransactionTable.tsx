"use client";

type Transaction = {
  date: string;
  code: string;
  type: string;
  amount: number;
  creator: string;
};

export default function TransactionTable({ data }: { data: Transaction[] }) {
  return (
    <div className="px-6 py-4">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm shadow-sm">
          <thead>
            <tr className="bg-[#5C2C1C] text-white">
              <th className="py-2 px-3 border border-[#8B5B40]">Date</th>
              <th className="py-2 px-3 border border-[#8B5B40]">Code</th>
              <th className="py-2 px-3 border border-[#8B5B40]">Type</th>
              <th className="py-2 px-3 border border-[#8B5B40] text-right">
                Amount (VND)
              </th>
              <th className="py-2 px-3 border border-[#8B5B40]">Creator</th>
            </tr>
          </thead>
          <tbody>
            {data.map((t, idx) => (
              <tr
                key={idx}
                className={`${
                  idx % 2 === 0 ? "bg-[#F4E1D2]" : "bg-[#E9CBB2]"
                } hover:bg-[#EAD4BF] transition`}
              >
                <td className="py-2 px-3 border border-[#D1A988]">{t.date}</td>
                <td className="py-2 px-3 border border-[#D1A988]">{t.code}</td>
                <td className="py-2 px-3 border border-[#D1A988]">{t.type}</td>
                <td className="py-2 px-3 border border-[#D1A988] text-right">
                  {t.amount.toLocaleString()} VND
                </td>
                <td className="py-2 px-3 border border-[#D1A988]">
                  {t.creator}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
