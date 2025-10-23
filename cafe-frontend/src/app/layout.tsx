import "./globals.css";
import MainLayout from "@/components/MainLayout/MainLayout";
import { CartProvider } from "@/context/cart/CartContext";
import { AuthProvider } from "@/context/Auth/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
export const metadata = {
  title: "Coffee Loyalty & Ordering",
  description: "Ứng dụng đặt cà phê và tích điểm thưởng.",
  themeColor: "#5C2C1C",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="theme-color" content={metadata.themeColor} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/icon-512.png" />
        <title>{metadata.title}</title>
      </head>

      <body>
        {/* 🧩 Toàn bộ app được bọc trong AuthProvider và CartProvider */}
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
        >
          <CartProvider>
            <AuthProvider>
              <MainLayout>{children}</MainLayout>
            </AuthProvider>
          </CartProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
