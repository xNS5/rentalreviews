import { Inter as FontSans } from "next/font/google";
import { Navbar } from "./navbar";
import { getDocument } from "./db/db";
import { Footer } from "./footer";
import { Config } from "../lib/configtype";
import type { Metadata } from "next";
import { cn } from "@/lib/utils"
import "./globals.css";

const inter = FontSans({ 
  subsets: ["latin"], variable: "--font-sans" 
});

export const metadata: Metadata | Promise<Metadata> = new Promise(
  async (resolve, reject) => {
    const config: Metadata | undefined = await getDocument("config", "metadata");
    resolve(config ?? {} as Metadata);
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("bg-white h-screen")}>
        <header>
          <Navbar/>
        </header>
        <main role="main" className={`${inter.variable}`}>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
