export interface VocabularyCreateRequest{
    spelling:string,
    pronunciation:string,
}
export interface VocabularyCreateFromNoteRequest{
    spelling:string,
    pronunciation:string,
    noteId:number
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
export interface VocabularyUpdateNotesRequest{
    notesId:number[]
}
export interface VocabularyDeleteRequest{
    vocabularyId:number
}
export interface VocabularyDeleteRespon{
    id:number
    spelling:string,
    pronunciation:string,
}