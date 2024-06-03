import { RoleModel, RoleEnum } from "./role"
export interface UserModel{
    id:number
    name:string,
    email:string
    provider:string,  
    accessToken?:string,
    refreshToken?:string
    roles:RoleModel[]
}

//請求與回應
export interface UserRespons{
    id:number,
    name:string,
    email:string
    provider:string,  //沒有填DB會自動標示為email
    accessToken?:string //登入的時候才會拿到accessToken
    refreshToken?:string
    roles:RoleModel[]
}
export interface UserSignUpRequest{
    name:string,
    email:string
    password:string,
    confirmPassword?:string,
    provider?:string,  //沒有填DB會自動標示為email
}
export interface UserCreateRequest{
    name:string,
    email:string
    password:string,
    confirmPassword?:string,
    provider?:string,  //沒有填DB會自動標示為email
    rolesEnum:RoleEnum[]
}
export interface UserUpdateRequest{
    name:string,
    email:string
    password:string,
    provider:string,
    rolesEnum:RoleEnum[]
}
export interface UserLoginRequest{
    email:string
    password:string,
}
export interface UserLoginWithGoogleTokenRequest{
    access_token:string
}
export interface UserLoginWithGoogleCredentialRequest{
    credential:string
}