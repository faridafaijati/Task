import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaskVibe | Daily Task Management",
  description: "A premium task management app with analytics and focus tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ 
            flex: 1, 
            marginLeft: '300px', 
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
