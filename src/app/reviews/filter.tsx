"use client";

import React, { useContext, useState } from "react";
import Popover from "@/components/popover/popover";
import { Icon } from "@/components/icon/icon";
import { Config, ConfigContext } from "@/lib/configProvider";
import { Select } from "@/components/select/select";

type FilterProps = {
  title: string;
  key: string;
  type: string;
  value: any;
};

function getFilterComp(type: string, key: any, props: any) {
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

export function Filter(props: any) {
  const { reviews }: Config = useContext(ConfigContext);
  const { filter_props } = reviews;

  const onFilterSelectHandler = (key: string, value: string) => {
    props.setFilter((prev: Object) => ({
      ...prev,
      [key]: props.filter[key] === value ? null : value,
    }));
  };

  return (
    <Popover
      className={{ popover: "transform -translate-x-1/3 mt-6" }}
      toggle={<Icon className={"h-4 w-4 px-1"} type={"fas-filter"} />}
    >
      {filter_props.map((prop: FilterProps) =>
        getFilterComp(prop.type, Math.random(), {
          label: prop.title,
          data: prop.value,
          selectedKey: props.filter[prop.key],
          callbackFn: onFilterSelectHandler,
          callbackKey: prop.key,
        }),
      )}
    </Popover>
  );
}
