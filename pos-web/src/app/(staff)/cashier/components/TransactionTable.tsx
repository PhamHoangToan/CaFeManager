"use client";
type Transaction = {
  date: string;
  code: string;
  type: "Income" | "Expense";
  amount: number;
  creator: string;
};

export default function TransactionTable({ data }: { data: Transaction[] }) {
  return (
    <table className="w-full bg-white rounded-lg overflow-hidden shadow">
      <thead className="bg-[#5C2C1C] text-white">
        <tr>
          <th className="p-2">Date</th>
          <th className="p-2">Code</th>
          <th className="p-2">Type</th>
          <th className="p-2">Amount (VND)</th>
          <th className="p-2">Creator</th>
        </tr>
      </thead>
      <tbody>
        {data.map((t, i) => (
          <tr
            key={i}
            className={`text-center border-b border-gray-200 ${
              t.type === "Income" ? "bg-[#FFF8E7]" : "bg-[#FCEFEF]"
            }`}
          >
            <td className="p-2">{t.date}</td>
            <td className="p-2">{t.code}</td>
            <td className="p-2 font-semibold">{t.type}</td>
            <td className="p-2">{t.amount.toLocaleString()}</td>
            <td className="p-2">{t.creator}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
