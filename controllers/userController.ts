import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library'
import UserRepository from "../repositories/userRepository";
import { Request, Response } from "express";
import {
  UserCreateRequest,
  UserSignUpRequest,
  UserLoginRequest,
  UserRespons,
  UserUpdateRequest,
  UserModel,
  UserLoginWithGoogleCredentialRequest,
} from "../types/user";
import { ErrorRespons } from "../types/error";
import { accessTokenExpiration, authSecret, timeBase } from "../config/auth"
import { RoleEnum } from "../types/role";
import { createRefreshToken, verifyRefreshTokenExpiration, deleteRefreshTokenById, deleteRefreshTokenByUserId, getRefreshTokenByTokenIncludeUser, getRefreshTokenById, getRefreshTokenByUserId } from "./refreshController"
import { RefreshTokenRequest, RefreshTokenRespons } from "../types/refreshToken";

const userRepo = new UserRepository();

export const getAllUser = async (req: Request, res: Response<UserRespons[]>) => {
  const users = await userRepo.getAll();
  const usersDTO = users.map(user=>getUserDTO(user)) 
  console.log(usersDTO);
  res.status(200).json(usersDTO);
};
export const getUserById = async ( req: Request<{ id: string }>, res: Response<UserRespons | ErrorRespons>) => {
  const user = await userRepo.getById(Number(req.params.id));
  if (!user) return res.status(400).json({ message: "查無此User" });
  const userDTO = getUserDTO(user);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const getUser = async ( req: Request, res: Response<UserRespons | ErrorRespons>) => {
  console.log('進getUser')
  const user = await userRepo.getById(Number(req.user?.id));
  if (!user) return res.status(400).json({ message: "查無此User" });
  const userDTO = getUserDTO(user);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const createUser = async ( req: Request<never, never, UserCreateRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  if (await isThisEmailExist(payload.email)) return res.status(400).send({ message: "此email已經存在!" }); //1.檢查email有沒有重複
  if (payload.confirmPassword !== payload.password) return res.status(400).send({ message: "密碼與確認密碼不同!" }); //2.檢查確認密碼
  const user = await userRepo.add({
    name: payload.name,
    email: payload.email,
    password: await bcryptPassword(payload.password),
    provider: payload.provider,
    rolesEnum:payload.rolesEnum
  });
  console.log(user)
  const userDTO = getUserDTO(user);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const updateUser = async ( req: Request<{ id: string }, never, UserUpdateRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  if (await isThisEmailExist(payload.email)) return res.status(400).send({ message: "此email已經存在!" }); //1.檢查email有沒有重複
  if (!(await isThisUserExist(Number(req.params.id)))) return res.status(400).send({ message: "找不到此user" });
  payload.password = await bcryptPassword(payload.password); //加密密碼
  const user = await userRepo.update(Number(req.params.id), payload);
  const userDTO = getUserDTO(user);
  removeUserRefreshToken(userDTO.id) //當後臺更新使用者時，就刪除該使用者的refreshToken，前端要讓使用者再次登入才行
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const deleteUser = async ( req: Request, res: Response<UserRespons | ErrorRespons>) => {
  const { id } = req.params;
  if (!(await isThisUserExist(Number(id)))) return res.status(400).send({ message: "沒有此User" });
  const user = await userRepo.delete(Number(id));
  const userDTO = getUserDTO(user);
  console.log(userDTO);
  removeUserRefreshToken(userDTO.id)
  res.status(200).json(userDTO);
};
export const signUp = async ( req: Request<never, never, UserSignUpRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  if (await isThisEmailExist(payload.email)) return res.status(400).send({ message: "此email已經存在!" }); //1.檢查email有沒有重複
  if (payload.confirmPassword !== payload.password) return res.status(400).send({ message: "密碼與確認密碼不同!" }); //2.檢查確認密碼
  const userDTO = await createUserAndConverToUserDTO(payload);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const login = async ( req: Request<never, never, UserLoginRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  const user = await userRepo.getByEmail(payload.email);
  if (!user) return res.status(400).json({ message: "找不到該使用者" });
  if (!(await passwordCompare(payload.password, user.password))) return res.status(400).json({ message: "密碼不正確!" });
  const userDTO = getUserDTO(user);
  //檢查是不是重複登入
  await checkIfUserAlreadyHaveRefreshToken(userDTO);
  //準備製作acceccToken和refreshToken
  const accessToken = createUserJWTToken(userDTO);
  const refreshToken = await createRefreshToken(userDTO)
  if(!refreshToken) return res.status(500).json({message:'產生refreshToken時發生錯誤'})
  if(!accessToken) return res.status(500).json({message:"產生accessToken時發生錯誤"})
  userDTO.accessToken = accessToken;
  userDTO.refreshToken = refreshToken
  return res.status(200).json(userDTO);
};
export const loginWithGooleByCredential = async ( req: Request<never, never, UserLoginWithGoogleCredentialRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  //1.利用前端傳的access token 取得使用者的資訊
  const userInfo = await getGoogleUserInfoWithCredentialFlow(payload.credential)
  if(!userInfo?.email) return res.status(403).json({message:'驗證google credential時出錯了'})
  const user = await userRepo.getByEmail(userInfo?.email)
  let userDTO:UserRespons
  if(!user) {
    userDTO = await createUserAndConverToUserDTO({
      name:userInfo.name || '',
      email:userInfo.email,
      password: await bcryptPassword(''),
      provider:'google',
    })
  }else{
    userDTO = getUserDTO(user)
  }
  //檢查是不是重複登入
  await checkIfUserAlreadyHaveRefreshToken(userDTO);
  //準備製作acceccToken和refreshToken
  const accessToken = createUserJWTToken(userDTO);
  const refreshToken = await createRefreshToken(userDTO)
  if(!refreshToken) return res.status(500).json({message:'產生refreshToken時發生錯誤'})
  if(!accessToken) return res.status(500).json({message:"產生accessToken時發生錯誤"})
  userDTO.accessToken = accessToken;
  userDTO.refreshToken = refreshToken
  return res.status(200).json(userDTO);
};
export const logOut = async (req:Request,res:Response<{message:string} | ErrorRespons>)=>{
  if(!req.user?.id) return res.status(400).send({message:"無該使用者accessToken"})
  const user = await userRepo.getByIdIncludeRefreshToken(Number(req.user.id))
  if(!user) res.status(403).send({message:"找不到該使用者"})
  if(!user?.refreshToken) return res.status(403).send({message:"此使用者並未登入，因為找不到refreshToken"})
  await deleteRefreshTokenById(user.refreshToken.id)
  return res.status(200).send({message:'log out success'})
}
export const refreshToken = async(req:Request<never,never, RefreshTokenRequest>,res:Response<ErrorRespons | RefreshTokenRespons>)=>{
  if(!req.body) return res.status(403).send({message:"Refresh token is required!"})
  const { refreshToken:requestToken } = req.body
  const refreshToken = await getRefreshTokenByTokenIncludeUser(requestToken)
  if(!refreshToken) return res.status(403).send({message:'can not find this refreshToken in database!'})
  if(verifyRefreshTokenExpiration(refreshToken)) { //refresh token 過期的處理
    //1.先移除該refreshToken
    deleteRefreshTokenById(refreshToken.id)
    //2.請使用者再次登入
    return res.status(403).send({message:'Refresh token expired. Please login again'})
  }
  const user =await userRepo.getById(refreshToken.userId)
  if(!user) return res.status(500).send({message:"無法透過此Refresh中提供的userId找到該user"})
  const newAccessToken = createUserJWTToken(user)
  if(!newAccessToken) return res.status(500).send({message:"無法製作新的accesstoken"})
  return res.status(200).json({accessToken:newAccessToken, refreshToken:refreshToken.token})
}
async function createUserAndConverToUserDTO(payload: UserSignUpRequest) {
  const user = await userRepo.add({
    name: payload.name,
    email: payload.email,
    password: await bcryptPassword(payload.password),
    provider: payload.provider,
    rolesEnum: [RoleEnum.MEMBER] //暫時註冊時都會具備MEMBER的權限
  });
  //建立Roles
  const userDTO = getUserDTO(user);
  return userDTO;
}

async function checkIfUserAlreadyHaveRefreshToken(userDTO: UserRespons) {
  const userRefreshToken = await getRefreshTokenByUserId(userDTO.id);
  if (userRefreshToken) { //假如已經存在refreshId就要清除這個refreshToken
    deleteRefreshTokenByUserId(userDTO.id);
  }
}

function getUserDTO(user: UserModel): UserRespons {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    roles:user.roles
  };
}
//內部方法
async function isThisEmailExist(email: string) {
  const user = await userRepo.getByEmail(email);
  if (!user) return false;
  return true;
}
async function isThisUserExist(id: number) {
  const user = await userRepo.getById(id);
  if (!user) return false;
  return true;
}
async function bcryptPassword(password: string) {
  return await bcrypt.hash(password, 12);
}
async function passwordCompare(inputPassword: string, comparePassword: string) {
  return await bcrypt.compare(inputPassword, comparePassword);
}
async function removeUserRefreshToken(userId:number){
  const existR = await getRefreshTokenById(userId)
  if(!existR) return 
  await deleteRefreshTokenByUserId(userId)
}
function createUserJWTToken(user: UserRespons) {
  if (!authSecret) return console.log("請定義好auth secret 環境變數");
  const token = jwt.sign(user, authSecret, {
    algorithm: "HS256",
    expiresIn: timeBase * accessTokenExpiration,
  });
  return token;
}
async function getGoogleUserInfoWithTokenFlow(access_token:string){
  const oauthClient = new OAuth2Client()
  oauthClient.setCredentials({access_token})

  const { data:userInfo } = await oauthClient.request({url:'https://www.googleapis.com/oauth2/v3/userinfo'})
  oauthClient.revokeCredentials()

  return userInfo
}
async function getGoogleUserInfoWithCredentialFlow(credential:string){
  const oauthClient = new OAuth2Client()

  const ticket = await oauthClient.verifyIdToken({idToken:credential})
  const userInfo = ticket.getPayload()

  return userInfo
}
