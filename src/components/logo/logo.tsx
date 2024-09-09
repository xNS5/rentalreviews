import React from "react";
import Image from "next/image";

export default function Logo({ children, className }: Readonly<{
  children: React.ReactNode;
  className?: string;
}>){
  return( <div className="inline-flex">
    <Image
      src={"/images/apartment.png"}
      alt="Apartment logo"
      width={60}
      height={60}
      className={`${className} object-contain`}
      unoptimized={true}
    />
    {children}
  </div>
);
}
