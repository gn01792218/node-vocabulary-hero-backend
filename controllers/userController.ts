import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../types/user";
import UserRepository from "../repositories/userRepository";
import { Request, Response } from "express";
import {
  UserCreateRequest,
  UserSignUpRequest,
  UserLoginRequest,
  UserRespons,
  UserUpdateRequest,
} from "../types/user";
import { ErrorRespons } from "../types/error";
import { authSecret } from "../config/auth"
import { checkRolesAllExist } from "./roleController"

const userRepo = new UserRepository();
const tokenExpiresDay = 3;

export const getAllUser = async (req: Request, res: Response<UserRespons[]>) => {
  const users = await userRepo.getAll();
  const usersDTO = users.map(user=>getUserDTO(user)) 
  console.log(usersDTO);
  res.status(200).json(usersDTO);
};
export const getUser = async ( req: Request<{ id: string }>, res: Response<UserRespons | ErrorRespons>) => {
  const user = await userRepo.getById(Number(req.params.id));
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
  if(! await checkRolesAllExist(payload.rolesEnum)) return res.status(400).send({message:"權限列表中出現不明權限"})
  payload.password = await bcryptPassword(payload.password); //加密密碼
  const user = await userRepo.update(Number(req.params.id), payload);
  const userDTO = getUserDTO(user);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const deleteUser = async ( req: Request, res: Response<UserRespons | ErrorRespons>) => {
  const { id } = req.params;
  if (!(await isThisUserExist(Number(id)))) return res.status(400).send({ message: "沒有此User" });
  const user = await userRepo.delete(Number(id));
  const userDTO = getUserDTO(user);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const signUp = async ( req: Request<never, never, UserSignUpRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  if (await isThisEmailExist(payload.email)) return res.status(400).send({ message: "此email已經存在!" }); //1.檢查email有沒有重複
  if (payload.confirmPassword !== payload.password) return res.status(400).send({ message: "密碼與確認密碼不同!" }); //2.檢查確認密碼
  const user = await userRepo.add({
    name: payload.name,
    email: payload.email,
    password: await bcryptPassword(payload.password),
    provider: payload.provider,
  });
  //建立Roles

  const userDTO = getUserDTO(user);
  console.log(userDTO);
  res.status(200).json(userDTO);
};
export const login = async ( req: Request<never, never, UserLoginRequest>, res: Response<UserRespons | ErrorRespons>) => {
  const payload = req.body;
  const user = await userRepo.getByEmail(payload.email);
  if (!user) return res.status(400).send({ message: "找不到該使用者" });
  if (!(await passwordCompare(payload.password, user.password))) return res.status(400).send({ message: "密碼不正確!" });
  const userDTO = getUserDTO(user);
  const token = createUserToken(userDTO);
  if (token) userDTO.accessToken = token;
  return res.status(200).send(userDTO);
};

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
function createUserToken(user: UserRespons) {
  if (!authSecret) return console.log("請定義好auth secret 環境變數");
  const token = jwt.sign(user, authSecret, {
    algorithm: "HS256",
    expiresIn: 86400 * tokenExpiresDay, //86400代表24小時
  });
  return token;
}
