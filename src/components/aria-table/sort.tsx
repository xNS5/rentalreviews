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

function getSortSelectComp({
    label,
    data,
    dataKey,
    className,
    onSelectionChangeFn,
    selectedKey,
    ariaLabel,
  }: {
    label: string;
    data: SortProps;
    dataKey: string;
    className: string;
    onSelectionChangeFn: (p: (prev: any) => SortDescriptor) => void;
    selectedKey: string | number;
    ariaLabel: string;
  },
): React.JSX.Element {
  return (
    <Select
      label={label}
      data={data}
      className={`text-base md:text-xl ${className}`}
      onSelectionChange={(val: string) =>
        onSelectionChangeFn(
          (prev: any) => ({ ...prev, [dataKey]: val }) as SortDescriptor,
        )
      }
      selectedKey={selectedKey}
      defaultSelectedKey={defaultSort[dataKey as keyof SortDescriptor]}
      arialabel={ariaLabel}
    />
  );
}


export function SortGroup({
    labelArr,
    dataArr,
    dataKeys,
    className,
    onSelectionChange,
    currSortDescriptor,
    ariaLabel,
}: Readonly<{
    labelArr: string[],
    dataArr: SortProps[],
    dataKeys: string[],
    className: string,
    onSelectionChange: () => void,
    currSortDescriptor: SortDescriptor,
    ariaLabel: string
}>){
    return (
        <>
            {
                dataArr.map((prop, i: number) =>
                    getSortSelectComp({
                        label: labelArr[i],
                        data: prop,
                        className: className,
                        onSelectionChangeFn: onSelectionChange,
                        dataKey: dataKeys[i],
                        selectedKey: currSortDescriptor[dataKeys[i] as keyof SortDescriptor],
                        ariaLabel:
                        }
                    )
                )
            }
        </>
    )
}