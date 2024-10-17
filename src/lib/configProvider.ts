export type Config = {
    [key: string]: {
      name: string;
      title?: string;
      description?: string;
      text?: Text[];
    } | any
  };
  
  export type Text = {
    title: string,
    text: string
  }
  
export const development: boolean =  !process.env.NODE_ENV || process.env.NODE_ENV === 'development';