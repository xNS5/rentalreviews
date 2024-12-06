"use client";

import React, { useContext } from "react";
import Popover from "@/components/popover/popover";
import { Icon } from "@/components/icon/icon";
import { Config, ConfigContext } from "@/lib/configProvider";
import { Select } from "@/components/select/select";

export type FilterProps = {
  title: string;
  key: string;
  compare: string;
  type: string;
  value: any;
};

function getFilterComp(type: string, key: any, props: any) {
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
}

export function Filter(props: any) {
  const { reviews }: Config = useContext(ConfigContext);
  const { filter_props } = reviews;
  const { filter, onSelectCallbackFn, callbackFn } = props;

  return (
    <Popover
      className={{
        popover:
          "transform -translate-x-[89%] sm:-translate-x-full mt-7 !z-[100000]",
      }}
      toggle={<Icon className={"h-5 w-5"} type={"fas-filter"} />}
    >
      {filter_props.map((prop: FilterProps) =>
        getFilterComp(prop.type, Math.random(), {
          label: prop.title,
          data: prop.value,
          selectedKey: filter[prop.key],
          onSelectCallbackFn: onSelectCallbackFn,
          callbackFn: callbackFn,
          callbackKey: prop.key,
        }),
      )}
    </Popover>
  );
}
