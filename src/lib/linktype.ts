
export type Link = {
    name: string,
    url: string,
    type?: string,
    target?: string,
    children?: Link[],
    className?: string
  }