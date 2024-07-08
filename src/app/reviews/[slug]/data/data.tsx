"use client"

import type { Company } from "../../columns";
import { JSONTree } from 'react-json-tree';
import React from "react";

const theme = {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#FFFFFF',
    base09: '#000000',
    base0B: '#000000',
    base0D: '#000000',
    base01: '#000000',
    base02: '#000000',
    base03: '#000000',
    base04: '#000000',
    base05: '#000000',
    base06: '#000000',
    base07: '#000000',
    base08: '#000000',
    base0A: '#000000',
    base0C: '#000000',
    base0E: '#000000',
    base0F: '#000000',  
  };
  


export function Data(data: Company) {
    return <><JSONTree 
    data={data ?? {}} 
    hideRoot={true}
    theme={{
        extend: theme,
        // switch key for objects to uppercase when object is expanded.
        // `nestedNodeLabel` receives additional argument `expandable`
        arrow: ({ style }, nodeType, expanded) => ({
          style: {
            ...style,
            marginLeft: "1.5em"
          },
        }),
        value: ({ style }, nodeType, keyPath) => ({
            style: {
                ...style,
                marginLeft: "2em"
            }
        }),
        nestedNode: ({ style }, keyPath, nodeType, expanded, expandable) => ({
            style: {
              ...style,
              marginBottom: expanded ? "1em" : 0,
              borderLeft: expanded ? "2px solid black" : "none"
            },
          }),
      }}
    /></>
}