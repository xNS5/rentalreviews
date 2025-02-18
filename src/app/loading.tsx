import React, {HTMLAttributes} from "react";
import Spinner from "@/components/spinner/spinner";

export default function Loading(props: HTMLAttributes<HTMLDivElement>){
    return <Spinner {...props}/>;
}