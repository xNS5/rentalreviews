import React, {useMemo} from "react";
import Popover from "@/components/popover/popover";
import Icon from "@/components/icon/icon";
import Select from "@/components/select/select";
import {Key} from 'react-aria';
import {FilterProps, FilterItem, SelectOption, SelectOptionStyle} from "@/lib/types";


function assertType(val: string, filterRule: FilterItem) {

    if(val === undefined){
        return undefined;
    }

    const {data_type} = filterRule;

  try{
    switch(data_type){
      case "int":
      case "float": {
          const parsed = parseFloat(val);
          // Ensures that `val` is a number AND is a finite value, otherwise returns undefined
          if (Number.isNaN(parsed) || !isFinite(parsed)) {
              return undefined;
          }
          return parsed;
      }
      case "string": {
          const cleaned_string = val.trim().replaceAll(/[^\w0-9\-]/g, '')
          if (cleaned_string.length == 0) {
              return undefined;
          }
          return cleaned_string;
      }
    }
  } catch (e){
      console.error(e, val);
    return undefined;
  }
}


export function processFilters(filterRules: FilterProps, params:  {[key: string]: string}): FilterProps {
  return Object.keys(filterRules).reduce((acc, curr) => {
      const optionValue = assertType(params[curr], filterRules[curr]);

      if(optionValue === undefined) return acc;


      let newValue: string | number | undefined = optionValue;

     // If the filter should be rendered, check that the value is a valid option. Otherwise, mark as undefined
      if(filterRules[curr].shouldRender){
         newValue = filterRules[curr].options?.some(option => option.title == optionValue) ? optionValue : undefined;
      }

      return {
          ...acc,
          [curr]: {
              ...filterRules[curr],
              value: newValue
          }
      }

  }, {}) as FilterProps;
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
          className: "mx-2 flex flex-col md:flex-row m-2 justify-between items-center"
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
  filterState: FilterProps,
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

    const filterCount = Object.values(filterState).filter(val => val.value !== undefined && val.shouldRender).length;

  return (
    <Popover
      className={{
        popover:
          "transform -translate-x-[85%] sm:-translate-x-full m-4 border border-slate-400 rounded shadow-lg z-10",
      }}
      ariaLabel={"data table filter menu"}
      label={heading}
      toggle={
        <>
            <Icon className={"h-5 w-5"} type={"fas-filter"} />
            {
                <span aria-hidden={"true"} className={`${filterCount > 0 ? "" : "in"}visible relative right-0.5 grid min-h-[12px] min-w-[12px] translate-x-0.5 -translate-y-4 place-items-center rounded-full bg-red-600 py-0.5 px-2 text-xs text-white`}>
                {
                    filterCount
                }
            </span>
            }
        </>

    }
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
