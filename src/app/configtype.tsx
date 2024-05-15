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

export interface Text extends React.HTMLProps<HTMLDivElement> {
  title: string,
  type: string,
  text: string
}
