import type { Link } from "@/lib/linktype"

export type FaqType = {
    _id: string,
    name: string,
    title: string,
    description: string,
    questions: FaqQuestion[]
}

export type FaqQuestion = {
    question: string,
    answer: string,
    expanded?: boolean,
    links?: Link[]
}
 