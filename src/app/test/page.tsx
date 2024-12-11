"use client";

import React, { useContext, useState } from "react";
import { Config, ConfigContext } from "@/lib/configProvider";
import Popover from "@/components/popover/popover";
import Icon from "@/components/icon/icon";
import Select from "@/components/select/select";


type FilterProps = {
  title: string;
  key: string;
  type: string;
  value: any;
};

function getComp(type: string, key: any, props: any) {
  if (type.toLowerCase() === "select") {
    const { data, selectedKey, callbackFn, callbackKey } = props;
    return (
      <Select
        key={key}
        data={data}
        selectedKey={selectedKey}
        onSelectionChange={(value: string) => callbackFn(callbackKey, value)}
        {...props}
      />
    );
  }
}

export default function TestPage() {
  const [filter, setFilter] = useState<{
    [key: string]: string | number | null;
  }>({});
  const { reviews }: Config = useContext(ConfigContext);
  const { filter_props } = reviews;

  const onSelectHandler = (key: string, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: filter[key] === value ? null : value,
    }));
  };

  return (
    <Popover
      toggle={
        <>
          Filter <Icon className={"h-4 w-4 px-1"} type={"fas-filter"} />
        </>
      }
    >
      {filter_props.map((prop: FilterProps) => (
        <>
          {getComp(prop.type, Math.random(), {
            label: prop.title,
            data: prop.value,
            selectedKey: filter[prop.key],
            callbackFn: onSelectHandler,
            callbackKey: prop.key
          })}
        </>
      ))}
    </Popover>
  );
}
