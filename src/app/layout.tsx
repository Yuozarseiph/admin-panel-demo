// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "پنل مدیریت فارسی",
  description: "داشبورد فروش و بازاریابی با RTL و تم تاریک/روشن",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-100">
        <Providers>
          {children}              {/* فقط children */}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
