import React from "react";
import Image from "next/image";

export default function Logo({ children, className, ...rest}: Readonly<{
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}>){
  return( <div className="inline-flex">
    <Image
    src={"/images/apartment.png"}
      alt="Apartment logo"
      width={60}
      height={60}
      className={`${className} object-contain`}
      unoptimized={true}
      {...rest}
    />
    {children}
  </div>
);
}
