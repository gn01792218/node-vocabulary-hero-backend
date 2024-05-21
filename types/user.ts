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