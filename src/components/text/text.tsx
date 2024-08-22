
import React from 'react';
import parse from 'html-react-parser/lib/index';
import type { Text } from '@/lib/configtype';

export default function Text({text, className = ''}: Readonly<{
    text: string;
    className?: string,
}>){
    return (
        <p className={`${className}`}>{
            parse(text)}
        </p>
    )
}