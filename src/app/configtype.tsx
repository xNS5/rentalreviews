export type Config = {
  [key: string]: {
    name: string;
    title?: string;
    description?: string;
    text?: [] | Text[];
  } | any
};

export type Text = {
  title: string;
  format: string;
  text: string;
};
