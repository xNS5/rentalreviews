import type { Link } from "@/lib/link"

export type FaqType = {
    _id: string,
    name: string,
    description: string,
    questions: FaqQuestion[]
}

type FaqQuestion = {
    question: string,
    answer: string,
    expanded?: boolean,
    links?: Link[]
}
 