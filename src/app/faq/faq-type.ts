type FaqQuestion = {
    question: string,
    answer: string
}


export type FaqType = {
    _id: string,
    name: string,
    description: string,
    questions: FaqQuestion[]
}