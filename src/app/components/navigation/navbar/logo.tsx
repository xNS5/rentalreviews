"use client";
import React from "react";
import Image from "next/image";
import svg from "../../../static/building-icon.svg";

interface logo{
  title: string
}

export const Logo: React.FC<logo> = ({ title }) => (
  <div className="inline-flex">
    <Image
      src={svg}
      alt="Apartment logo"
      width={30}
      className="object-contain filter brightness-0"
    />
    <h1 className="font-bold text-lg px-2">
    {title}
    </h1>
  </div>
);
