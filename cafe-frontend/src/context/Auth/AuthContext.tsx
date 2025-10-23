"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useCart } from "@/context/cart/CartContext";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
type User = {
  id: number;
  name: string;
  email: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const { clearCart, setCartFromServer } = useCart();
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);
  useEffect(() => {
  if (user?.id) {
    clearCart(); // clear giỏ cũ
    fetch(`${API_URL}/cart?customerId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setCartFromServer(data.items || []));
  }
}, [user]);
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
