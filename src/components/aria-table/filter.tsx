import React from "react";
import Popover from "@/components/popover/popover";
import Icon from "@/components/icon/icon";
import Select from "@/components/select/select";

export type FilterOption = {
  key: string | number,
  value: string | number,
  title: string | number
}

export type FilterItem = {
  title: string;
  key: string | number | null;
  shouldRender: boolean;
  comparison: string;
  component_type: string;
  data_type: string;
  style: {
    prefix: string;
    postfix: string;
  };
  options: FilterOption[];
  value: string | number;
}

export type FilterProps = {
  [key: string]: FilterItem;
};


function assertType(val: string, type: string) {
  try{
    switch(type){
      case "number":
      case "float":
        return parseFloat(val);
      case "string":
        return val.replaceAll('[^\w0-9\-]', '');
    }
  } catch (e){
    return undefined;
  }
}


export function processFilters(filterRules: FilterProps, params:  {[key: string]: string}): FilterProps {
  return Object.keys(filterRules).reduce((acc, curr) => ({
    ...acc,
    [curr]: {
      ...filterRules[curr],
      value: assertType(params[curr], filterRules[curr].data_type)
    }
  }), {}) as FilterProps;
}

const getFilterComp = (component_type: string, key: any, props: any) => {

  if (component_type?.toLowerCase() === "select") {
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
        labelProps={{
          className: "mx-2"
        }}
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
  const { heading, filterState, onSelectCallbackFn } = props;
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
      {Object.values<FilterItem>(filterState).map(({ title, value, options, key, style, component_type}, i: number) =>
        getFilterComp(component_type, i + 1, {
          label: title,
          value: value ?? undefined,
          data: options,
          selectedKey: value ?? undefined,
          onSelectCallbackFn: onSelectCallbackFn,
          selectedKeyStyle: style ?? undefined,
          callbackKey: key,
        }),
      )}
    </Popover>
  );
}
