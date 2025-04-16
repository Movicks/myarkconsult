import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyArk Consult",
  description: "Expert consulting services tailored to help your business overcome challenges and achieve sustainable growth.",
};

// ✅ Create an instance of QueryClient
// const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
    
            <Toaster />
            <main className="max-w-screen overflow-x-hidden">
              <Navbar />
              <div>{children}</div>
              <Footer />
            </main>
      </body>
    </html>
  );
}
