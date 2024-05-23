export enum RoleEnum{ 
    SUPERADMIN="SUPERADMIN",
    ADMIN="ADMIN",
    MEMBER="MEMBER",
    GUEST="GUEST"
}
export interface RoleModel{
    id:number
    name:string,
}

//請求與回應
export interface RoleCreateRequest{
    name:string,
}
export interface RoleUpdateRequest{
    name:string,
}

//資料庫所需的型態
export interface RoleCreateDTO{
    name:string,
}