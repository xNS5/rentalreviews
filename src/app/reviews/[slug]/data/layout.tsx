import { Suspense } from "react";
import { Spinner } from "@/components/spinner/spinner";

export default function ReviewDataLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <Suspense fallback={<Spinner/>}>
            <>{children}</>
        </Suspense>
    );
  }