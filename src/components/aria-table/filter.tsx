import React from "react";
import Popover from "@/components/popover/popover";
import Icon from "@/components/icon/icon";
import Select from "@/components/select/select";

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
  value: any;
}

export type FilterProps = {
  name: string;
} & {
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
    return null;
  }
}


export function processFilters(filterRules: FilterProps, params:  {[key: string]: string}): FilterProps{
  return Object.keys(params).reduce((acc, curr) => ({
    ...acc,
    ...(filterRules[curr] && {
      [curr]: {
        ...filterRules[curr],
        value: assertType(params[curr], filterRules[curr].data_type)
      }
    })
  }), {}) as FilterProps;
}

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
  const { heading, filter, onSelectCallbackFn, filterProps } = props;

  return (
      <></>
    // <Popover
    //   className={{
    //     popover:
    //       "transform -translate-x-[85%] sm:-translate-x-full m-4 border border-slate-400 rounded shadow-lg z-10",
    //   }}
    //   toggle={<Icon className={"h-5 w-5"} type={"fas-filter"} />}
    // >
    //   {heading && (
    //     <h2>
    //       <b>{heading}</b>
    //     </h2>
    //   )}
    //   {Object.values(filterProps).filter((prop: FilterProps) => )
    //     .map((prop: FilterProps, i: number) =>
    //       getFilterComp(prop.component_type, i + 1, {
    //         label: prop.title,
    //         value: prop.key ? filter[prop.key] : undefined,
    //         data: prop.value,
    //         selectedKey: prop.key ? filter[prop.key] : undefined,
    //         onSelectCallbackFn: onSelectCallbackFn,
    //         selectedKeyStyle: prop.style ?? undefined,
    //         callbackKey: prop.key,
    //       }),
    //     )}
    // </Popover>
  );
}
