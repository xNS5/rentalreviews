import { Inter as FontSans } from "next/font/google";
import React, { Suspense } from "react";
import { getDocument } from "@/db/db";
import { Config } from "@/lib/types";
import { cn } from "@/lib/serverUtils";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import "./globals.css";
import Loading from "./loading";

import SkipToContent from "@/components/skip-to-content/skip";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export async function generateMetadata() {
  const { metadata } = await getDocument<Config>("config", "config", 604800000);
  return {
    title: metadata.title,
    description: metadata.description

  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  metadata: any;
}>) {
  const config = await getDocument<Config>("config", "config", 604800000);
  const { navbar, footer, metadata } = config;

  return (
    <html lang="en">
      <body className={cn("bg-white h-screen")}>
        <SkipToContent className="bg-white" url="#main-content" />
        <header>
          <Navbar data={navbar} title={metadata.title as string} description={metadata.description as string} />
        </header>
          <Suspense key={Math.random()} fallback={<Loading />}>
            <main id="main-content" role="main" className={`${inter.variable}`} tabIndex={-1}>
              {children}
            </main>
          </Suspense>
          <Footer data={footer} />
      </body>
    </html>
  );
}

