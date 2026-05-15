import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskVibe | Premium Productivity",
  description: "A premium, modern task management app for high-achievers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ 
            flex: 1, 
            marginLeft: '320px', 
            padding: '40px',
            minHeight: '100vh'
          }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
