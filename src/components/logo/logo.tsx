import React from "react";
import Image from "next/image";

export default function Logo({ children, className }: Readonly<{
  children: React.ReactNode;
  className?: string;
}>){
  return( <div className="inline-flex">
    <Image
      src={"/images/building-icon.svg"}
      alt="Apartment logo"
      width={30}
      height={30}
      className={`${className} object-contain filter brightness-0 w-10 h-auto`}
    />
    {children}
  </div>
);
}
