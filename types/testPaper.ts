//請求與回應
export interface TestPaperCreateRequest{
    title:string,
    description:string,
    user_id:number
}
export interface TestPaperUpdateRequest{
    title:string,
    description:string
}