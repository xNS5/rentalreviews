import React from "react";
import Image from "next/image";
import { ReactNode } from "react";

const Logo = ({ children }: { children: ReactNode }) => (
  <div className="inline-flex" tabIndex={0}>
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
