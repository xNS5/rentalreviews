
import React from 'react';
import parse from 'html-react-parser/lib/index';
import { Text as TextType } from '@/app/configtype';

const Text = ( textObj: TextType) => {
    return (
        <p className={`${textObj.className}`}>{
            parse(textObj.text)}
        </p>
    )
}

export default Text;