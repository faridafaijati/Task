import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Providers } from "@/components/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'TaskVibe | Premium Productivity & Task Management',
  description: 'Elevate your productivity with TaskVibe. A premium task management app with sunrise energy aesthetics, focus timers, and deep activity insights.',
  keywords: ['task management', 'productivity app', 'focus timer', 'task analytics', 'organized life'],
  authors: [{ name: 'TaskVibe Team' }],
  creator: 'TaskVibe',
  metadataBase: new URL('https://task-sigma-beryl.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://task-sigma-beryl.vercel.app',
    title: 'TaskVibe | Premium Productivity',
    description: 'Master your day with sunrise energy aesthetics and powerful productivity tools.',
    siteName: 'TaskVibe',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TaskVibe Dashboard Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskVibe | Premium Productivity',
    description: 'Elevate your daily routine with sunrise energy aesthetics.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Providers>
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
        </Providers>
      </body>
    </html>
  );
}
