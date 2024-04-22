import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "./components/navigation/navbar/navbar";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const getDoc = async (path: string) => {

  const collectionRef = collection(db, path)
  const querySnapshot = await getDocs(collectionRef)
  const data = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return data;
}

export const metadata: Metadata = {...(async () => await getDoc("metadata"))};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div role="navigation">
          <Nav />
        </div>
        {children}
      </body>
    </html>
  );
}
