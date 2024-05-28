export interface VocabularyCreateRequest{
    spelling:string,
    pronunciation:string,
}
export interface VocabularyCreateRespon{
    id:number
    spelling:string,
    pronunciation:string,
}
export interface VocabularyUpdateRequest{
    spelling:string,
    pronunciation:string,
}
export interface VocabularyUpdateRespon{
    id:number
    spelling:string,
    pronunciation:string,
}
export interface VocabularyDeleteRequest{
    vocabularyId:number
}
export interface VocabularyDeleteRespon{
    id:number
    spelling:string,
    pronunciation:string,
}