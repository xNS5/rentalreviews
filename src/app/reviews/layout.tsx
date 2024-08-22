import { Suspense } from "react";
import { Spinner } from "@/components/spinner/spinner";


export const dynamic = "force-dynamic";

export default function ReviewGridLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Spinner />}>
      <>{children}</>
    </Suspense>
  );
}