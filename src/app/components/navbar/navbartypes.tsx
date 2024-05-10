

export type NavbarObject = {
    name: string;
    className?: string,
    nav_list?: [];
  };

export type NavbarItem = {
    name: string,
    url: string,
    type?: string,
    target?: string,
    children?: [],
    className?: string
    onClick?: () => void
  }