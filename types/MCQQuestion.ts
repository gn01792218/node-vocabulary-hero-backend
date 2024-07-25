//請求與回應
export interface MCQQuestionCreateRequest{
    question:string,
    solutions:string[],
    tags:string[],
    share:boolean,
    options:MCQQuestionOption[],
    test_paper_id:number
}
export interface MCQQuestionUpdateRequest{
    question:string,
    solutions:string[],
    tags:string[],
    share:boolean,
}
export interface MCQQuestionOption{
    content:string,
    is_answer:boolean
}
export interface MCQQuestionOptionUpdateRequest{
    id:number,
    content:string,
    is_answer:boolean
}