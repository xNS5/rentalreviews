import {SortDescriptor, SortDirection} from "react-stately";
import Select from "@/components/select/select";
import React from "react";

const defaultSort: SortDescriptor = {
    column: "name",
    direction: "ascending",
}

type SortProp = {
    key: string,
    title: string
}

type SortLabel = {
    label: string,
    aria_label: string
}

type SortProps = {
    valid_keys: string[],
    sort_labels: {
        [key: string]: SortLabel
    }
} & {
    [key: string]: SortProp[]
}

function validateSortParam(sortProp: SortProp[], key: string){
    return sortProp.find(x => x.key === key);
}

export function processSort(sortRules: SortProps, params: {[key: string]: string}): SortDescriptor {
    let ret = {};
    for(let key of sortRules.valid_keys){
        let isValidKey = params.hasOwnProperty(key) && validateSortParam(sortRules[key], params[key]);
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
    sortData: SortProp[];
    sortLabel: SortLabel;
    sortDescriptor: SortDescriptor;
    className: string;
    onSortChangeFn: (key: string, value: string) => void;
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
      onSelectionChange={(val: string) => onSortChangeFn(sortKey, val )}
      selectedKey={sortDescriptor[selectedKey]}
      defaultSelectedKey={defaultSort[selectedKey]}
      arialabel={aria_label}
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
    onSortChangeFn:(key: string, value: string) => void,
    className?: string
}>){
    const { valid_keys } = sortProps;
    return valid_keys.map((key: string, i: number) => getSortSelectComp(i+1,
        {
            sortKey: key,
            sortData: sortProps[key],
            sortLabel: sortProps.sort_labels[key],
            sortDescriptor: sortDescriptor,
            className: className ?? "",
            onSortChangeFn
        }
    ))
}