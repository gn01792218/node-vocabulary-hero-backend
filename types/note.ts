export interface CreateNoteRequest{
    title:string
    description:string,
}
export interface UpdateNoteRequest{
    title:string
    description:string,
}
export interface UpdateNoteVocabularysRequest{
    vocabularys_id:number[]
}