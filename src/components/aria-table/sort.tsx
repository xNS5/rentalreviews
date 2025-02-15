import {SortDescriptor} from "react-stately";
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

function getSortSelectComp( sortData: SortProp[], sortLabel: SortLabel, sortDescriptor: SortDescriptor, className: string, onSelectionChangeFn:): React.JSX.Element {
    const { label, aria_label } = sortLabel;
  return (
    <Select
      label={label}
      data={sortData}
      className={`text-base md:text-xl ${className}`}
      onSelectionChange={(val: string) =>
        onSelectionChangeFn(
          (prev: any) => ({ ...prev, [dataKey]: val }) as SortDescriptor,
        )
      }
      selectedKey={selectedKey}
      defaultSelectedKey={defaultSort[dataKey as keyof SortDescriptor]}
      arialabel={aria_label}
    />
  );
}


export function SortGroup({
    sortProps,
    sortDescriptor,
    onSelectionChangeFn
}: Readonly<{
    sortProps: SortProps,
    sortDescriptor: SortDescriptor,
    onSelectionChangeFn: (prev: SortDescriptor) => void
}>){
    const { valid_keys } = sortProps;
    return (
        <>
            {
                valid_keys.map((key: string) => getSortSelectComp({

                }))
            }
        </>
    )
}