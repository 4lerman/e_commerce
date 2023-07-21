import {
	User as UserModel,
	RefreshTokens as RefreshTokensModel,
} from "@prisma/client";
import { Product } from "./product";

export interface User extends UserModel {}
export interface RefreshToken extends RefreshTokensModel {}

export interface UserRes {
	[key: string]: any;
	accessToken: string;
	refreshToken: string;
}
