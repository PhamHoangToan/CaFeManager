"use client";

interface CartNoteProps {
  note: string;
  setNote: (value: string) => void;
}

export default function CartNote({ note, setNote }: CartNoteProps) {
  return (
    <div className="mt-6">
      <label className="block font-semibold mb-2 text-[#5C2C1C]">
        Ghi chú đơn hàng
      </label>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ví dụ: Giao hàng không đá, thêm đường..."
        className="w-full border rounded-md p-3 resize-none focus:ring focus:ring-[#a52828]/30"
        rows={3}
      />
    </div>
  );
}
