import React from "react";
import Image from "next/image";
import svg from "../../../../static/building-icon.svg";

export const Logo = () => (
  <Image
    src={svg}
    alt="Apartment logo"
    width={30}
    className='object-contain filter brightness-0'
  />
);
