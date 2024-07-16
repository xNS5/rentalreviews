import { Inter as FontSans } from "next/font/google";
import { NavbarWrapper } from "./navbar-wrapper";
import { getDocument } from "./db/db";
import { FooterWrapper } from "./footer-wrapper";
import { Config } from "../lib/configtype";
import { cn } from "@/lib/utils"
import "./globals.css";
import Logo from "@/components/navbar/nav-logo";
import type { Metadata } from "next";

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
  const {title, description} = metadata;
  return (
    <html lang="en">
      <body className={cn("bg-white h-screen")}>
        <header>
          <nav className="flex justify-between items-center w-full px-4 py-4 border-b-2 shadow-sm bg-white focusable">
            <Logo>
              <a href="/" className="focusable rounded" role="link">
                <div className="px-2">
                  <h1 className="sm:text-lg">{title as string}</h1>
                  <h2 className="lg:text-md sm:text-sm">{description as string}</h2>
                </div>
              </a>
            </Logo>
            <NavbarWrapper />
          </nav>
        </header>
        <main role="main" className={`${inter.variable}`}>{children}</main>
        <FooterWrapper />
      </body>
    </html>
  );
}

