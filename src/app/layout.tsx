import { Inter as FontSans } from "next/font/google";
import { Suspense } from "react";
import { getCollection, getDocument } from "../db/db";
import { Config } from "../lib/configProvider";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import "./globals.css";
import Loading from "./loading";

export const dynamic = "force-dynamic";

import SkipToContent from "@/components/skip-to-content/skip";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});


export async function generateMetadata(){
  const config: Config | undefined = await getDocument<Config>("config", "config", 2592000);
  return {
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
  metadata: any;
}>) {
  const config = await getDocument<Config>("config", "config", 2592000);
  const {navbar, footer, metadata} = config;

  return (
    <html lang="en">
      <body className={cn("bg-white h-screen")}>
        <SkipToContent className="bg-white" url="#main-content"/>
        <header>
          <Navbar data={navbar} title={metadata.title as string} description={metadata.description as string} />
        </header>
        <Suspense key={Math.random()} fallback={<Loading />}>
          <main id="main-content" role="main" className={`${inter.variable}`}>
            <Providers>{children}</Providers>
          </main>
        </Suspense>
        <Footer data={footer} />
      </body>
    </html>
  );
}

