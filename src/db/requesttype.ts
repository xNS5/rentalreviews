
export type RequestType = {
    collection_name: string,
    document_id?: string,
    query_props: {
        startAt?: number,
        endAt?: number,
        id?: string
    }
}

export type ResponseType = {
    collection?: [],
    document?: {}
} 