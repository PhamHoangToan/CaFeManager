"use client";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaBars,
  FaWifi,
  FaQuestionCircle,
  FaPowerOff,
  FaUser,
  FaCheckCircle,
} from "react-icons/fa";

function TraMonPage() {
    const router = useRouter();

  const [tables, setTables] = useState([
    { id: "1.1", name: "Tầng 1 - 012", total: 9 },
    { id: "1.2", name: "Tầng 1 - 004", total: 8 },
    { id: "2.1", name: "Tầng 2 - 008", total: 3 },
  ]);

  const [orders, setOrders] = useState({
    "1.1": [
      { name: "Black Coffee", qty: 3, remaining: 3 },
      { name: "Trà Xanh Đậu Đỏ", qty: 1, remaining: 1 },
      { name: "Flat White", qty: 1, remaining: 1 },
      { name: "Trà Thạch Đào", qty: 1, remaining: 1 },
      { name: "Phô mai Trà Xanh", qty: 2, remaining: 2 },
      { name: "Tiramisu", qty: 1, remaining: 1 },
    ],
    "1.2": [
      { name: "Cappuccino", qty: 2, remaining: 2 },
      { name: "Trà Dâu Tây", qty: 1, remaining: 1 },
      { name: "Irish Coffee", qty: 1, remaining: 1 },
    ],
    "2.1": [
      { name: "Cafe Latte", qty: 2, remaining: 2 },
      { name: "Trà Vải Hoa Hồng", qty: 1, remaining: 1 },
    ],
  });

  const [selectedTable, setSelectedTable] = useState("1.1");
  const currentOrder = orders[selectedTable] || [];
  const goToOrderPage = () => {
    router.push("/phucvu/order"); 
  };
  // ✅ Giảm số lượng 1 món
  const handleDecrease = (tableId, index) => {
    setOrders((prev) => {
      const updated = { ...prev };
      const tableOrders = [...updated[tableId]];
      const item = { ...tableOrders[index] };
      if (item.remaining > 0) item.remaining -= 1;
      tableOrders[index] = item;
      updated[tableId] = tableOrders;
      return updated;
    });
  };

  // ✅ Tăng lại (hoàn tác)
  const handleIncrease = (tableId, index) => {
    setOrders((prev) => {
      const updated = { ...prev };
      const tableOrders = [...updated[tableId]];
      const item = { ...tableOrders[index] };
      if (item.remaining < item.qty) item.remaining += 1;
      tableOrders[index] = item;
      updated[tableId] = tableOrders;
      return updated;
    });
  };

  // ✅ Trả các món đã chọn (remaining < qty)
  const handleReturnSelected = () => {
    const selectedItems = currentOrder.filter((i) => i.remaining < i.qty);
    if (selectedItems.length === 0) {
      alert("⚠️ Bạn chưa trả món nào!");
      return;
    }

    const confirm = window.confirm(
      `Xác nhận trả ${selectedItems.length} món (tổng ${
        selectedItems.reduce((sum, i) => sum + (i.qty - i.remaining), 0)
      } phần) của ${tables.find((t) => t.id === selectedTable)?.name}?`
    );
    if (!confirm) return;

    setOrders((prev) => {
      const updated = { ...prev };
      updated[selectedTable] = updated[selectedTable].filter(
        (i) => i.remaining > 0
      );
      return updated;
    });

    setTimeout(() => {
      setOrders((prev) => {
        const updated = { ...prev };
        if (updated[selectedTable]?.length === 0) {
          delete updated[selectedTable];
          setTables((prevTables) =>
            prevTables.filter((t) => t.id !== selectedTable)
          );
          const nextTable = tables.find((t) => t.id !== selectedTable)?.id;
          setSelectedTable(nextTable || "");
        }
        return updated;
      });
    }, 0);
  };

  // ✅ Trả hết
  const handleReturnAll = () => {
    const confirm = window.confirm(
      `Trả hết tất cả món của ${
        tables.find((t) => t.id === selectedTable)?.name
      }?`
    );
    if (!confirm) return;

    setOrders((prev) => {
      const updated = { ...prev };
      delete updated[selectedTable];
      return updated;
    });

    setTables((prev) => prev.filter((t) => t.id !== selectedTable));

    const nextTable = tables.find((t) => t.id !== selectedTable)?.id;
    setSelectedTable(nextTable || "");
  };

  return (
    <div className="min-h-screen bg-[#EAD4BF] text-[#3A1F0B] flex flex-col">

      {/* Nội dung */}
      <div className="flex flex-1 p-4 gap-4">
        {/* Bên trái: danh sách bàn */}
        <div className="flex-[0.5] bg-[#F9EDE2] border border-[#B7855E] rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 bg-[#CFA987] text-white font-semibold px-4 py-2">
            <span>Bàn order</span>
            <span className="text-right">Số lượng</span>
          </div>
          <div>
            {tables.length === 0 ? (
              <p className="text-center py-4 text-[#6B4B2B] italic">
                🎉 Tất cả bàn đã trả xong
              </p>
            ) : (
              tables.map((t) => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTable(t.id)}
                  className={`grid grid-cols-2 items-center px-4 py-3 border-b border-[#E0C4A4] cursor-pointer ${
                    selectedTable === t.id
                      ? "bg-[#B7855E] text-white font-semibold"
                      : "hover:bg-[#ECD2B8]"
                  }`}
                >
                  <span>{t.name}</span>
                  <div className="flex items-center justify-end gap-2">
                    <span>{t.total}</span>
                    {selectedTable === t.id && (
                      <FaCheckCircle className="text-white" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bên phải: chi tiết order */}
        <div className="flex-[1] bg-[#F9EDE2] border border-[#B7855E] rounded-lg flex flex-col">
          {selectedTable && currentOrder ? (
            <>
              <div className="bg-[#CFA987] px-4 py-2 font-semibold text-[#3A1F0B] flex justify-between items-center">
                <span>
                  {selectedTable} -{" "}
                  {tables.find((t) => t.id === selectedTable)?.name || ""}
                </span>
              </div>

              {/* Danh sách món */}
              <div className="flex-1 overflow-y-auto">
                {currentOrder.map((item, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-4 items-center px-4 py-3 border-b border-[#E0C4A4]`}
                  >
                    <span className="col-span-2">{item.name}</span>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleDecrease(selectedTable, i)}
                        className="px-2 py-1 bg-[#B7855E] text-white rounded hover:bg-[#9f6c48]"
                      >
                        -
                      </button>
                      <span>
                        {item.remaining}/{item.qty}
                      </span>
                      <button
                        onClick={() => handleIncrease(selectedTable, i)}
                        className="px-2 py-1 bg-[#B7855E] text-white rounded hover:bg-[#9f6c48]"
                      >
                        +
                      </button>
                    </div>
                    <div className="flex justify-end">
                      {item.remaining < item.qty && (
                        <FaCheckCircle className="text-green-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Nút hành động */}
              <div className="p-4 flex justify-end gap-3">
                <button
                  onClick={handleReturnSelected}
                  className="flex items-center gap-2 bg-[#D79A3E] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#c5892c]"
                >
                  <FaCheckCircle /> Trả đã chọn
                </button>
                <button
                  onClick={handleReturnAll}
                  className="flex items-center gap-2 bg-[#4B8F4B] text-white px-5 py-2 rounded-md font-semibold hover:bg-[#3b7f3b]"
                >
                  <FaCheckCircle /> Trả hết
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-[#6B4B2B] italic">
              👉 Chọn bàn để xem chi tiết order
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(TraMonPage), { ssr: false });
    