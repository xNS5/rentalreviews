import React from "react";
import Image from "next/image";

export default function Logo({ children }: Readonly<{
  children: React.ReactNode;
}>){
  return( <div className="inline-flex">
    <Image
      src={"/images/building-icon.svg"}
      alt="Apartment logo"
      width={30}
      height={30}
      className="object-contain filter brightness-0"
    />
    {children}
  </div>
);
}
