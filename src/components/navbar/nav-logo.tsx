import React from "react";
import Image from "next/image";

const Logo = ({ children }: Readonly<{
  children: React.ReactNode;
}> ) => (
  <div className="inline-flex">
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

export default Logo;
