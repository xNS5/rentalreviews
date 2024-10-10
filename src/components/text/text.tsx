import React from "react";
import parse from "html-react-parser/lib/index";

export default function Text({
  text,
  className = "",
}: Readonly<{
  text: string;
  className?: string;
}>) {
  return <div className={`${className} focus:ring`}>{parse(text ?? "undefined")}</div>;
}

