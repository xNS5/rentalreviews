export type About = {
    description: string,
    name: string,
    content: AboutContent[]
    [key: string]: string | any,
}


export type AboutContent = {
    avatar: {
        type: string,
        url: string
    },
    links: {
        heading: string,
        children: Link[]
    },
    text: string
}

export type Link = {
    name: string,
    url: string,
    type: string,
    icon: string,
    alt?: string,
}