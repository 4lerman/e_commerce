import {
	User as UserModel,
	RefreshTokens as RefreshTokensModel,
} from "@prisma/client";
import { Product } from "./product";

export interface User extends UserModel {}
export interface RefreshToken extends RefreshTokensModel {}

export interface UserRes {
	id: number;
	name?: string;
	email: string;
	products: Product[];
    createdAt: Date;
    updatedAt: Date;
}

export interface RefreshTokenRes {
	userId: number;
	refreshToken: string;
}
