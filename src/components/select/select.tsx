"use client";

import { useState } from "react";
import Icon from "@/components/icon/icon";
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
import {getIsMobileWidth} from "@/lib/clientUtils";

export default function Select({
  label,
  labelProps = {},
  data,
  selectedKey,
  ...props
}: Readonly<{
  labelProps?: { [key: string]: any };
  label?: string;
  data: any;
  selectedKey: number | string | undefined;
  [key: string]: any;
}>) {
  const [isSelectExpanded, setIsSelectExpanded] = useState(false);
  const {selectedKeyStyle} = props;

  return (
    <SelectComp
      isOpen={isSelectExpanded}
      onOpenChange={setIsSelectExpanded}
      selectedKey={selectedKey || -1}
      {...props}
      className={`flex flex-col md:flex-row m-2 justify-between items-center ${props.className ?? ""}`}
    >
      {label && <Label id={"label"}{...labelProps}>{label}</Label>}
      <Button
        className={
          "flex flex-row justify-center border border-black rounded p-1 m-1 shadow"
        }
      >
        <SelectValue className={`p-2`} aria-labelledby={"label"}>
          {({ defaultChildren, isPlaceholder }) => {
            return isPlaceholder ? (
                <>
                  <label className={'sr-only'}>no value selected</label>
                  <span aria-hidden={true}>Filter by</span>
                </>
            ) : (
              <div>
                <p>
                  {selectedKeyStyle?.prefix}{" "}
                  {defaultChildren}
                  {selectedKeyStyle?.postfix}
                </p>
              </div>
            );
          }}
        </SelectValue>
        <Icon
          type={"fas-caret-down"}
          className={`h-3 w-3 transition-transform ${isSelectExpanded ? "rotate-180 transform" : ""}`}
        />
      </Button>
      <Popover
        className={`bg-white border border-solid border-slate-500 shadow rounded`}
        aria-labelledby={props.id}
      >
        <ListBox items={data} selectionMode="single" className={`p-2`}>
          {data.map((elem: any, i: number) => (
            <ListBoxItem
              id={elem.key}
              key={i}
              className={({ isSelected }) =>
                `text-black text-center my-1 p-4 ${isSelected ? "bg-blue-500 text-white border border-black" : "hover:!bg-blue-500 hover:text-white"} rounded`
              }
              textValue={elem.title}
              value={elem.value}
            >
              {({ isSelected }) => (
                <>
                  {isSelected && (
                    <Icon type={"fas-check"} className={`h-4 w-4 pr-1`} aria-hidden={true}/>
                  )}
                  {elem.title}
                </>
              )}
            </ListBoxItem>
          ))}
        </ListBox>
      </Popover>
    </SelectComp>
  );
}
