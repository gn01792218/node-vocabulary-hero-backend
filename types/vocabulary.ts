export interface VocabularyCreateRequest{
    spelling:string,
    zh:string,
    prounciation:string,
    userId:number
}
export interface VocabularyCreateRespon{
    id:number
    spelling:string,
    zh:string,
    prounciation:string,
    userId:number
}
export interface VocabularyUpdateRequest{
    spelling:string,
    zh:string,
    prounciation:string,
    userId:number
}
export interface VocabularyUpdateRespon{
    id:number
    spelling:string,
    zh:string,
    prounciation:string,
    userId:number
}
export interface VocabularyDeleteRequest{
    vocabularyId:number
}
export interface VocabularyDeleteRespon{
    id:number
    spelling:string,
    zh:string,
    prounciation:string,
    userId:number
}