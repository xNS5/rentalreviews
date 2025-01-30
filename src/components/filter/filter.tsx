import React from "react";
import Popover from "@/components/popover/popover";
import Icon from "@/components/icon/icon";
import Select from "@/components/select/select";

type FilterProps = {
  title: string;
  key: string | number | null;
  shouldRender: boolean;
  compare: string;
  type: string;
  style: {
    prefix: string;
    postfix: string;
  };
  value: any;
};

const getFilterComp = (type: string, key: any, props: any) => {
  if (type.toLowerCase() === "select") {
    const {
      data,
      selectedKey,
      onSelectCallbackFn,
      callbackKey,
      selectedKeyStyle,
    } = props;
    return (
      <Select
        key={key}
        data={data}
        selectedKey={selectedKey}
        onSelectionChange={(value: string) => {
          onSelectCallbackFn(callbackKey, value);
        }}
        selectedKeyStyle={selectedKeyStyle}
        {...props}
      />
    );
  }
};

export function Filter(props: any) {
  const { heading, filter, onSelectCallbackFn, filterProps } =
    props;

  return (
    <Popover
      className={{
        popover:
          "transform -translate-x-[85%] sm:-translate-x-full m-4 border border-slate-400 rounded shadow-lg z-10",
      }}
      toggle={<Icon className={"h-5 w-5"} type={"fas-filter"} />}
    >
      {heading && (
        <h2>
          <b>{heading}</b>
        </h2>
      )}
      {filterProps?.filter((prop: FilterProps) => prop.shouldRender)
        .map((prop: FilterProps, i: number) =>
          getFilterComp(prop.type, i + 1, {
            label: prop.title,
            value: prop.key ? filter[prop.key] : undefined,
            data: prop.value,
            selectedKey: prop.key ? filter[prop.key] : undefined,
            onSelectCallbackFn: onSelectCallbackFn,
            selectedKeyStyle: prop.style ?? undefined,
            callbackKey: prop.key,
          }),
        )}
    </Popover>
  );
}
