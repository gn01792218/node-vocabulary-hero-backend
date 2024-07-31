//請求與回應
export interface TestPaperCreateRequest{
    title:string,
    description:string,
    share:boolean
}
export interface TestPaperUpdateRequest{
    title:string,
    description:string,
    share:boolean
}
export interface UpdateTestPaperMCQsRequest{
    ids:number[]
}