"use client"

import { Company } from "../../columns"

export function RawData(data: Company) {
    const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const jsonUrl = URL.createObjectURL(jsonBlob);
    return (
        <div className="container mx-auto py-10">
            <iframe src={jsonUrl} />
        </div>
    )
}