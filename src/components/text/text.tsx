import React from "react";
import parse from "html-react-parser/lib/index";
import type { Text as TextType } from "@/lib/config-provider";

export default function Text({
  text,
  className
}: Readonly<{
  text: string;
  className?: string;
}>) {
  if(className !== undefined){
    return <div className={className}>
      {parse(text)}
    </div>
  }

  return <>{parse(text)}</>;
}
