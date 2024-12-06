import React from "react";
import Popover from "@/components/popover/popover";
import { Icon } from "@/components/icon/icon";
import { Select } from "@/components/select/select";

export type FilterProps = {
  title: string;
  key: string | number | null;
  compare: string;
  type: string;
  value: any;
};

const getFilterComp = (type: string, key: any, props: any) => {
  if (type.toLowerCase() === "select") {
    const { data, selectedKey, onSelectCallbackFn, callbackFn, callbackKey } =
      props;
    return (
      <Select
        key={key}
        data={data}
        selectedKey={selectedKey}
        onSelectionChange={(value: string) => {
          onSelectCallbackFn(callbackKey, value);
          if (callbackFn !== undefined) {
            callbackFn(callbackKey, value);
          }
        }}
        {...props}
      />
    );
  }
};

export function Filter(props: any) {
  const { filter, onSelectCallbackFn, filterProps, callbackFn } = props;

  return (
    <Popover
      className={{
        popover:
          "transform -translate-x-[89%] sm:-translate-x-full mt-7 !z-[100000]",
      }}
      toggle={<Icon className={"h-5 w-5"} type={"fas-filter"} />}
    >
      {filterProps?.map((prop: FilterProps, i: number) =>
        getFilterComp(prop.type, i + 1, {
          label: prop.title,
          value: filter[prop.key ?? ""],
          data: prop.value,
          selectedKey: filter[prop.key ?? ""],
          onSelectCallbackFn: onSelectCallbackFn,
          callbackFn: callbackFn,
          callbackKey: prop.key,
        })
      )}
    </Popover>
  );
}
