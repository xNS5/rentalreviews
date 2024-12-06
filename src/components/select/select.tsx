"use client";

import { useState } from "react";
import {Icon} from "@/components/icon/icon";
import {
  Button,
  Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as SelectComp,
  SelectValue,
} from "react-aria-components";

export const Select = ({
  label,
  labelProps = {},
  data,
  selectedKey,
  ...rest
}: Readonly<{
  labelProps?: { [key: string]: any },
  label?: string,
  data: any,
  selectedKey: number | string | undefined,
  [key: string]: any
}>) => {
  const [isSelectExpanded, setIsSelectExpanded] = useState(false);

  return (
    <SelectComp
      className={`flex flex-row m-2 justify-center items-center `}
      isOpen={isSelectExpanded}
      onOpenChange={setIsSelectExpanded}
      selectedKey={selectedKey}
      {...rest}
    >
      {label && <Label {...labelProps}>{label}</Label>}
      <Button className={"flex flex-row justify-center border border-black rounded p-1 m-1 shadow"}>
        <SelectValue className={`px-1`} />
        <Icon
          type={"fas-caret-down"}
          className={`h-3 w-3 transition-transform ${isSelectExpanded ? "rotate-180 transform" : ""}`}
        />
      </Button>
      <Popover
        className={`bg-white border border-solid border-slate-500 shadow rounded`}
        aria-labelledby={rest.id}
      >
        <ListBox items={data} selectionMode="single" className={`p-2`}>
          {data.map((elem: any, i: number) => (
            <ListBoxItem
              id={elem.key}
              key={i}
              className={({ isSelected }) => `text-black text-center my-1 p-2 ${isSelected ? 'bg-blue-500 text-white border border-black' : 'hover:!bg-blue-500 hover:text-white'} rounded`}
              textValue={elem.title}
            >
              {({isSelected}) => (
                  <>
                    {isSelected && <Icon type={"fas-check"} className={`h-4 w-4 pr-1`}/>}
                    {elem.title}
                  </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </SelectComp>
  );
};
