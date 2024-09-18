import { Inter as FontSans } from "next/font/google";
import { Suspense } from "react";
import { getDocument } from "../db/db";
import { Config } from "../lib/config-provider";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import "./globals.css";
import Loading from "./loading";
import type { Metadata } from "next";
import Logo from "@/components/logo/logo";
import Link from "next/link";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export let metadata: Metadata;

export async function getMetadata() {
  const config: Config | undefined = await getDocument("config", "metadata", 604800);
  metadata = {
    title: config?.metadata.title,
    description: config?.metadata.description,
    icons: [
      {
        rel: "icon",
        type: "image/png",
        url: "/images/building-icon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        rel: "icon",
        type: "image/png",
        url: "/images/building-icon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await getMetadata();
  const { title, description } = metadata;
  const navbarConfig = await getDocument<Config>("config", "navigation", 604800);
  const footerData = await getDocument<Config>("config", "footer", 604800);
  return (
    <html lang="en">
      <head>
        <title>{title as string}</title>
      </head>
      <body className={cn("bg-white h-screen")}>
        <header>
          <Navbar data={navbarConfig?.nav} title={title as string} description={description as string} />
        </header>
        <Suspense key={Math.random()} fallback={<Loading />}>
          <main role="main" className={`${inter.variable}`}>
            <Providers>{children}</Providers>
          </main>
        </Suspense>
        <Footer footer={footerData?.footer} />
      </body>
    </html>
  );
}

