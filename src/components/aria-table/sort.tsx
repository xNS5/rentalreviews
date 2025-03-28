
import React from "react";
import {SortDescriptor} from "react-stately";
import { SelectOption, SortProps, SortLabel } from "@/lib/types";
import Select from "@/components/select/select";
import {Key} from "react-aria";


const defaultSort: SortDescriptor = {
    column: "name",
    direction: "ascending",
}

function validateSortParam(sortProp: SelectOption[], key: string){
    return sortProp.find(x => x.key === key);
}

export function processSort(sortRules: SortProps, params: {[key: string]: string}): SortDescriptor {
    let ret = {};
    for(const key of sortRules.valid_keys){
        const isValidKey = key in params && validateSortParam(sortRules[key], params[key]);
        ret = {
            ...ret,
            [key]: isValidKey ? params[key] : defaultSort[key as keyof SortDescriptor]
        }
    }
    return ret as SortDescriptor;
}

const getSortSelectComp = (
  key: number,
  {
    sortKey,
    sortData,
    sortLabel,
    sortDescriptor,
    className,
    onSortChangeFn,
  }: Readonly<{
    sortKey: string;
    sortData: SelectOption[];
    sortLabel: SortLabel;
    sortDescriptor: SortDescriptor;
    className: string;
    onSortChangeFn: (key: string | number, value: Key) => void;
  }>,
): React.JSX.Element => {
  const { label, aria_label } = sortLabel;
  const selectedKey = sortKey as keyof SortDescriptor;
  return (
    <Select
      key={key}
      label={label}
      data={sortData}
      className={`text-base md:text-xl ${className}`}
      onSelectionChange={(val: Key) => onSortChangeFn(sortKey, val )}
      selectedKey={sortDescriptor[selectedKey]}
      defaultSelectedKey={defaultSort[selectedKey]}
      aria-label={aria_label}
    />
  );
};


export function SortGroup({
    sortProps,
    sortDescriptor,
    onSortChangeFn,
    className
}: Readonly<{
    sortProps: SortProps,
    sortDescriptor: SortDescriptor,
    onSortChangeFn: (params: SortDescriptor) => void;
    className?: string
}>){
    const { valid_keys } = sortProps;

    function sortChangeHandler(key: string | number, value: Key){
       const newSortDescriptor: SortDescriptor = {
           ...sortDescriptor,
           [key]: value
       }
       onSortChangeFn(newSortDescriptor);
    }

    return valid_keys.map((key: string, i: number) => getSortSelectComp(i+1,
        {
            sortKey: key,
            sortData: sortProps[key],
            sortLabel: sortProps.sort_labels[key],
            sortDescriptor: sortDescriptor,
            className: className ?? "",
            onSortChangeFn: sortChangeHandler
        }
    ))
}