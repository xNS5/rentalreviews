import { Inter as FontSans } from "next/font/google";
import { Suspense } from "react";
import { getDocument } from "../db/db";
import { Config } from "../lib/config-provider";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo/logo";
import Navbar from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import "./globals.css";
import Loading from "./loading";
import type { Metadata } from "next";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export let metadata: Metadata;

async function setMetadata() {
  const config: Config | undefined = await getDocument("config", "metadata");
  metadata = {
    title: config?.metadata.title,
    description: config?.metadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await setMetadata();
  const { title, description } = metadata;
  const navbarConfig = await getDocument<Config>("config", "navigation");
  const footerData = await getDocument<Config>("config", "footer");
  return (
    <html lang="en">
      <head>
        <title>{title as string}</title>
      </head>
      <body className={cn("bg-white h-screen")}>
        <header>
          <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 shadow-sm bg-white">
            <Logo>
              <a href="/" className="rounded px-2 grid grid-rows-2" role="link">
                <span className="text-lg md:text-2xl">{title as string}</span>
                <span className="text-sm md:text-lg">{description as string}</span>
              </a>
            </Logo>
            <Navbar nav={navbarConfig?.nav} />
          </nav>
        </header>
        <Suspense fallback={<Loading />}>
          <main role="main" className={`${inter.variable}`}>
            {children}
          </main>
        </Suspense>
        <Footer footer={footerData?.footer} />
      </body>
    </html>
  );
}
