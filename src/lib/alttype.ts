export type Alt = {
    [key: string]: {
        [key: string]: {
            prefix: string,
            postfix: string
        }
    } | string,
}