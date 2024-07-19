

export type NavbarObject = {
    name: string;
    className?: string,
    nav_list?: NavbarItem[];
  };

export type NavbarItem = {
    name: string,
    url: string,
    type?: string,
    target?: string,
    children?: NavbarChildren[],
    className?: string
  }

type NavbarChildren = {
  name: string,
  target: string,
  type: string,
  url: string
}