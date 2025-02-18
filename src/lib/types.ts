
export type RequestType = {
    collection_name: string,
    document_id?: string,
    query_props: {
        startAt?: number,
        endAt?: number,
        id?: string
    }
}


export type Config = {
    home: Page,
    privacy_policy: Page,
    metadata: MetadataInterface & Page,
    footer: FooterItem[],
    disclaimer: Disclaimer,
    faq: Faq & Page,
    navbar: NavbarItem[]
    accessibility: Page,
    review: ReviewPage,
    reviews: ReviewsPage,
    alt: AltRecord
}

export type NavbarItem = {
    name: string,
    type: "link" | "dropdown",
    url: string,
    target: string
    children?: NavbarItem[]
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

export type PrefixPostfix = {
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

export type SelectOption = {
    key: string | number,
    value: string | number,
    title: string | number
}

export type SelectOptionStyle = {
    alt: {
        prefix: string;
        postfix: string;
    }
    prefix: string;
    postfix: string;
}

export type FilterItem = {
    title: string;
    key: string | number;
    shouldRender: boolean;
    comparison: string;
    component_type: string;
    data_type: string;
    style: SelectOptionStyle;
    options: SelectOption[];
    value: string | number | undefined;
}

export type FilterProps = {
    [key: string]: FilterItem;
};

export type SortLabel = {
    label: string,
    aria_label: string
}

export type SortProps = {
    valid_keys: string[],
    sort_labels: {
        [key: string]: SortLabel
    }
} & {
    [key: string]: SelectOption[]
}


export type ReviewsPage = {
    filter_props: FilterProps,
    sort_props: SortProps
} & Page


export type ReviewPage = {
    displayed_column_ratings: string[]
} & Page


export type MetadataProps = {
    params: Promise<{ slug: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}