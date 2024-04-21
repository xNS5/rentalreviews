import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "./components/navigation/navbar/navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bellingham Rental Reviews",
  description: "Bellingham Rental Reviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div role="navigation">
          <Nav />
        </div>
        {children}
      </body>
    </html>
  );
}
