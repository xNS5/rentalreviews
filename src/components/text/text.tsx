import React from "react";
import parse from "html-react-parser/lib/index";
import type { Text } from "@/lib/config-provider";

export default function Text({
  text,
}: Readonly<{
  text: string;
}>) {
  return <>{parse(text)}</>;
}
