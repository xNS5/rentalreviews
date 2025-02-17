import React from "react";
import Image, {ImageProps} from "next/image";

export default function Logo({ id, children, className, ...rest}: Readonly<{
  id: string;
  children: React.ReactNode;
  className?: string;
}> & React.HTMLAttributes<HTMLImageElement>){
  return( <div className="inline-flex">
    <Image
      {...rest}
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
