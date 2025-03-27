import React from "react";
import Popover from "@/components/popover/popover";
import Icon from "@/components/icon/icon";
import Select from "@/components/select/select";
import {Key} from 'react-aria';
import {FilterProps, FilterItem, SelectOption, SelectOptionStyle} from "@/lib/types";


function assertType(val: string, type: string) {
  try{
    if(val === undefined){
        return undefined;
    }
    switch(type){
      case "int":
        case "float":
          const parsed = parseFloat(val);
          // Ensures that `val` is a number AND is a finite value, otherwise returns undefined
          if(Number.isNaN(parsed) || !isFinite(parsed)){
              return undefined;
          }
        return parsed;
      case "string":
          const cleaned_string = val.trim().replaceAll(/[^\w0-9\-]/g, '')
          if(cleaned_string.length == 0){
              return undefined;
          }
        return cleaned_string;
    }
  } catch (e){
      console.error(e, val);
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

const getFilterComp = (component_type: string, key: number,
{
    label,
    value,
    data,
    selectedKey,
    onSelectCallbackFn,
    selectedKeyStyle,
    callbackKey
}: Readonly<{
  label: string,
  value: string | number | undefined,
  data: SelectOption[],
  selectedKey: string | number | undefined,
  onSelectCallbackFn: (key: string | number, value: Key) => void,
  selectedKeyStyle: SelectOptionStyle,
  callbackKey: string | number
}>) => {
  if (component_type?.toLowerCase() === "select") {
    return (
      <Select
        label={label}
        key={key}
        data={data}
        selectedKey={selectedKey}
        labelProps={{
          className: "mx-2"
        }}
        onSelectionChange={(value) => {
          onSelectCallbackFn(callbackKey, value);
        }}
        selectedKeyStyle={selectedKeyStyle}/>
    );
  }
};

export function Filter({
    heading,
    filterState,
    onSelectCallbackFn
}: Readonly<{
  heading: string,
  filterState: {[key: string]: FilterItem},
  onSelectCallbackFn: (newFilterObj: FilterProps) => void
}>) {

    const handleFilterChange = (key: string | number, value: Key) => {
        const newFilterObj: FilterProps = {
            ...filterState,
            [key]: {
                ...filterState[key],
                value: filterState[key]?.value === value ? undefined : value
            }
        }
        onSelectCallbackFn(newFilterObj)
    };

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
      {
        Object.values<FilterItem>(filterState).map(({ title, value, options, key, style, component_type}, i: number) =>
        getFilterComp(component_type, i + 1, {
          label: title,
          value: value ?? undefined,
          data: options,
          selectedKey: value ?? undefined,
          onSelectCallbackFn: handleFilterChange,
          selectedKeyStyle: style ?? undefined,
          callbackKey: key,
        }),
      )}
    </Popover>
  );
}
