import React from "react";
import Article from "../article/article";
import parse from "html-react-parser/lib/index";
import type { Text } from "@/lib/configtype";

export default function Text({
  text,
  className = "",
}: Readonly<{
  text: string;
  className?: string;
}>) {
  return <>{parse(text)}</>;
}
