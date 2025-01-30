export type Config = {
    home: Page,
    privacy_policy: Page,
    metadata: MetadataInterface & Page,
    footer: FooterItem[],
    disclaimer: Disclaimer,
    faq: Faq & Page,
    [key: string]: any
}

export type Page = {
    name: string,
    title: string,
    type: string,
    description: string,
    content?: Text[]
    text?: string
}

// Disclaimer
export type Disclaimer = {
    [key: string]: string
}

// Alt
export type AltRecord = {
    [key: string]: {
        [key: string]: PrefixPostfix
    };
};

type PrefixPostfix = {
    prefix: string;
    postfix: string;
};

// FAQ
export type Faq = {
    questions: Question[]
}

type Question = {
    id: string,
    question: string,
    answer: string,
    links?: Link[]
}

// Footer
export type FooterItem = {
    text?: string
    type: string,
    row: number
    title?: string,
    icon?: string,
    alt?: string,
    url?: string,
    target?: string
}

// Metadata
export interface MetadataInterface extends Page {
    robots: {
        rules: RobotsRule[]
    }
    "aria_announcement": {
        [key: string]: string
    }
}

export type RobotsRule = {
    userAgent: string[],
    allow?: string,
    disallow?: string
}

// Text
export type Text = {
    title: string,
    text: string
}

// Link
export type Link = {
    name: string,
    url: string,
    type?: string,
    target?: string,
    children?: Link[],
    className?: string
}

