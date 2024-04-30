import type { Metadata } from "next";
import { use } from "react";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import { getConfig } from "./db/firebase";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <header>
          <Navbar />
        </header>
        <main role="main">{children}</main>
      </body>
    </html>
  );
}
