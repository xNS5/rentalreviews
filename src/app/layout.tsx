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
import Head from "next/head";
import type { Metadata } from "next";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export let metadata: Metadata;

export async function getMetadata() {
  const config: Config | undefined = await getDocument<Config>("config", "metadata", 2592000);
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
  const navbarConfig = await getDocument<Config>("config", "navigation", 2592000);
  const footerData = await getDocument<Config>("config", "footer", 2592000);
  return (
    <html lang="en">
      <Head>
        <title>{title as string}</title>
      </Head>
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

