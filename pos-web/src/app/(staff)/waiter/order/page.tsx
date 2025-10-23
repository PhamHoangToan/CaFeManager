"use client";
import { useState } from "react";
import {
  FaBars,
  FaWifi,
  FaQuestionCircle,
  FaPowerOff,
  FaUser,
  FaUsers,
  FaSearch,
  FaCheck,
  FaTimes,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import MenuItemCard from "./components/MenuItemCard";
import OrderList from "./components/OrderList";

// ✅ Sample data (demo menu)
const coffeeMenu = [
  { name: "Cappuccino", price: 65000, image: "/menu/cappuccino.jpg" },
  { name: "Espresso", price: 39000, image: "/menu/espresso.jpg" },
  { name: "Black Coffee", price: 25000, image: "/menu/blackcoffee.jpg" },
  { name: "Cafe Latte", price: 65000, image: "/menu/latte.jpg" },
  { name: "Flat White", price: 45000, image: "/menu/flatwhite.jpg" },
  { name: "Irish Coffee", price: 50000, image: "/menu/irish.jpg" },
  { name: "Mousse Cacao", price: 50000, image: "/menu/cacao.jpg" },
  { name: "Phô mai Caramel", price: 29000, image: "/menu/caramel.jpg" },
];

const teaMenu = [
  { name: "Trà Đào Cam Sả", price: 49000, image: "/menu/tra-dao.jpg" },
  { name: "Trà Vải Hoa Hồng", price: 52000, image: "/menu/tra-vai.jpg" },
  { name: "Trà Dâu Tây", price: 45000, image: "/menu/tra-dau.jpg" },
  { name: "Trà Nhãn Sen", price: 50000, image: "/menu/tra-nhan.jpg" },
  { name: "Trà Chanh Sả", price: 39000, image: "/menu/tra-chanh.jpg" },
  { name: "Trà Tắc Mật Ong", price: 42000, image: "/menu/tra-tac.jpg" },
  { name: "Trà Hoa Cúc Mật Ong", price: 47000, image: "/menu/tra-cuc.jpg" },
  { name: "Trà Matcha Sữa", price: 55000, image: "/menu/tra-matcha.jpg" },
];

export default function OrderPage() {
  const [category, setCategory] = useState<"coffee" | "tea">("coffee");
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const router = useRouter();

  // 🧭 Navigation
  const goToReturnPage = () => router.push("/waiter/return-items");
  const goToMain = () => router.push("/waiter");

  // 🧾 Add new item
  const addToOrder = (item: any) => {
    setOrderItems((prev) => {
      const existing = prev.find((x) => x.name === item.name);
      if (existing) {
        return prev.map((x) =>
          x.name === item.name ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // 🧮 Calculate total
  const total = orderItems.reduce((sum, item) => sum + item.qty * item.price, 0);
  const currentMenu = category === "coffee" ? coffeeMenu : teaMenu;

  // 🧠 Actions
  const handleSubmit = () => {
    alert("✅ Order sent successfully!");
    goToMain();
  };

  const handlePayment = () => {
    if (orderItems.length === 0) {
      alert("⚠️ No items to pay!");
      return;
    }
    alert("💰 Payment successful!");
    goToMain();
  };

  return (
    <div className="min-h-screen bg-[#D7B79E] text-[#3A1F0B] flex flex-col">

      {/* Category tabs */}
      <div className="bg-[#7B3F26] text-white flex gap-6 px-6 py-2 text-sm font-medium">
        <button
          onClick={() => setCategory("coffee")}
          className={`pb-1 ${
            category === "coffee"
              ? "border-b-2 border-white"
              : "hover:text-[#FFD7B5]"
          }`}
        >
          Coffee
        </button>
        <button
          onClick={() => setCategory("tea")}
          className={`pb-1 ${
            category === "tea"
              ? "border-b-2 border-white"
              : "hover:text-[#FFD7B5]"
          }`}
        >
          Tea
        </button>
        <button className="hover:text-[#FFD7B5]">Cake</button>
        <button className="hover:text-[#FFD7B5]">Others</button>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left side: menu */}
        <div className="flex-1 p-4 grid grid-cols-3 gap-4">
          {currentMenu.map((item, index) => (
            <MenuItemCard key={index} item={item} onAdd={() => addToOrder(item)} />
          ))}
        </div>

        {/* Right side: order summary */}
        <OrderList
          orderItems={orderItems}
          setOrderItems={setOrderItems}
          total={total}
          onSubmit={handleSubmit}
          onPayment={handlePayment}
        />
      </div>
    </div>
  );
}
