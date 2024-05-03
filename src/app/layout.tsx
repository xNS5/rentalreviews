import type { Metadata } from "next";
import { use } from "react";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar";
import "./globals.css";
import { getMetadata } from "./utilities/config-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getMetadata()

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
