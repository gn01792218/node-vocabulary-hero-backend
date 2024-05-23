export interface UserModel{
    id:number
    name:string,
    email:string
    password:string,
    provider:string,  
}

//請求與回應
export interface UserCreateRequest{
    name:string,
    email:string
    password:string,
    confirmPassword?:string,
    provider?:string,  //沒有填DB會自動標示為email
}
export interface UserUpdateRequest{
    name:string,
    email:string
    password:string,
    provider?:string,
}
export interface UserSignInRequest{
    name:string,
    password:string,
    confirmPassword:string,
    email:string
}
export interface UserLoginRequest{
    email:string
    password:string,
}
export interface UserLoginRequest{
    email:string
    password:string,
}

//資料庫所需的型態
export interface UserCreateDTO{
    name:string,
    email:string
    password:string,
    provider?:string,  //沒有填DB會自動標示為email
}