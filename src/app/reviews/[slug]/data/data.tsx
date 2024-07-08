"use client"

import type { Company } from "../../columns";
import Editor from "@monaco-editor/react";
import React from "react";
  


export function Data(data: Company) {
    return <Editor height="90vh"  defaultLanguage="json" />
}