import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/navbar/navbar";
import { getMetadata } from "./utilities/config-provider";
import { Footer } from "./components/footer/footer";
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getMetadata();

library.add(fas, fab);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white">
        <header>
          <Navbar />
        </header>
        <main role="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
