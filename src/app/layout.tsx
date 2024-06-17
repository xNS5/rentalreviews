import { Inter as FontSans } from "next/font/google";
import Navbar from "@/components/navbar/navbar";
import { getRemoteConfig } from "./utilities/config-provider";
import { Footer } from "@/components/footer/footer";
import { Config } from "./utilities/configtype";
import type { Metadata } from "next";
import { cn } from "@/lib/utils"
import "./globals.css";

const inter = FontSans({ 
  subsets: ["latin"], variable: "--font-sans" 
});

export const metadata: Metadata | Promise<Metadata> = new Promise(
  async (resolve, reject) => {
    const config = await getRemoteConfig("config");
    resolve(config.metadata);
  }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config: Config = await getRemoteConfig("config");
  return (
    <html lang="en">
      <body className={cn("bg-white h-screen")}>
        <header>
          <Navbar {...config} />
        </header>
        <main role="main" className={`${inter.variable}`}>{children}</main>
        <Footer {...config} />
      </body>
    </html>
  );
}
