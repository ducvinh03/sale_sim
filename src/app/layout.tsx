import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MobiFone Sơn La — Ưu đãi SIM, Data thả ga, Chọn số đẹp",
  description:
    "MobiFone Sơn La: gói cước trả trước/trả sau data khủng, eSIM tiện lợi, ưu đãi vùng Zone CT4 và kho số đẹp chọn theo sở thích. Liên hệ Zalo/Email đặt SIM ngay.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-night text-mist font-body">
        {children}
      </body>
    </html>
  );
}
