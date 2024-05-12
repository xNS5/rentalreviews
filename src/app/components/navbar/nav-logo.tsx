"use client";
import React from "react";
import Image from "next/image";

export const Logo = ({ title }: any) => (
  <div className="inline-flex">
    <Image
      src={"/images/building-icon.svg"}
      alt="Apartment logo"
      width={30}
      height={30}
      className="object-contain filter brightness-0"
    />
    <h1 className="font-bold text-lg px-2">{title}</h1>
  </div>
);
