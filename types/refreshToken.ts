export interface RefreshTokenModel {
  id: number;
  token: string;
  expiryDate: Date;
}
export interface RefreshTokenRequest {
  refreshToken: string;
}
export interface RefreshTokenRespons {
  accessToken:string,
  refreshToken:string
}
