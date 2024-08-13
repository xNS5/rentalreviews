import { Inter as FontSans } from "next/font/google";
import { Suspense } from "react";
import { Spinner } from "@/components/spinner/spinner";
import { getDocument } from "./db/db";
import { Config } from "../lib/configtype";
import { cn } from "@/lib/utils"
import Logo from "@/components/logo/logo";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import type { Metadata } from "next";
import "./globals.css";

const inter = FontSans({
  subsets: ["latin"], variable: "--font-sans"
});

export let metadata: Metadata;

async function setMetadata() {
  const config: Config | undefined = await getDocument("config", "metadata");
  metadata = {
    title: config?.metadata.title,
    description: config?.metadata.description
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await setMetadata();
  const { title, description } = metadata;
  const navbarConfig = await getDocument("config", "navigation");
  const footerData = await getDocument<Config>("config", "footer");
  return (
    <html lang="en">
      <body className={cn("bg-white h-screen")}>
        <header>
          <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 shadow-sm bg-white">
            <Logo>
              <a href="/" className="rounded" role="link">
                <div className="px-2">
                  <h1 className="sm:text-lg">{title as string}</h1>
                  <h2 className="lg:text-md sm:text-sm">{description as string}</h2>
                </div>
              </a>
            </Logo>
            <Navbar nav={navbarConfig?.nav} />
          </nav>
        </header>
        <Suspense fallback={<Spinner />}>
          <main role="main" className={`${inter.variable}`}>
            {children}
          </main>
        </Suspense>
        <Footer footer={footerData?.footer} />
      </body>
    </html>
  );
}

