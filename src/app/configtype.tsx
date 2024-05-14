export type Config = {
  [key: string]: {
    name: string;
    title?: string;
    description?: string;
    text?: [] | Text[];
  } | any
};

export type TextList = {
  title: string;
  format: string;
  content: Text[]
};

export type Text = {
  title: string,
  type: string,
  text: string
}
