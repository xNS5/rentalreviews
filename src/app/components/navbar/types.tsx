

export type navbarObject = {
    name: string;
    className: string | undefined,
    nav_list: [];
  };

export type navbarItem = {
    name: string,
    url: string,
    type: string,
    target: string,
    children: [],
    className: string | undefined,
    onClick: () => void | undefined
  }