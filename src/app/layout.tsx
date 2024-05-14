import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/navbar/navbar";
import { getRemoteConfig } from "./utilities/config-provider";
import { Footer } from "./components/footer/footer";
import "./globals.css";
import { Config } from "./configtype";

const inter = Inter({ subsets: ["latin"] });

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
      <body className="bg-white h-screen">
        <header>
          <Navbar {...config}/>
        </header>
        <main role="main">{children}</main>
        <Footer {...config}/>
      </body>
    </html>
  );
}
