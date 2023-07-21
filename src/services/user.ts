import { authRM, createUserRM, updateUserRM } from "../model/request";
import { RefreshToken, User, UserRes } from "../model/user";
import userModel from "../repository/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import tokenService from "./token";
dotenv.config();

interface IUserService {
	find: (req: { id: number; email: string }) => Promise<User | null>;
	create: (req: createUserRM) => Promise<UserRes>;
	update: (req: updateUserRM) => Promise<User>;
	login: (req: authRM) => Promise<UserRes>;
	logout: (refreshToken: string) => Promise<RefreshToken>;
	refresh: (refreshToken: string) => Promise<UserRes | undefined>;
}

const InitUserService = (): IUserService => {
	return {
		find: find,
		create: create,
		update: update,
		login: login,
		logout: logout,
		refresh: refresh,
	};
};

const find = async (req: {
	id: number;
	email: string;
}): Promise<User | null> => {
	const data = await userModel.find(req);
	return data;
};

const create = async (req: createUserRM): Promise<UserRes> => {
	const hash = await bcrypt.hash(
		req.password,
		parseInt(String(process.env.SALT_ROUND))
	);

	const user = (await userModel.create({ ...req, password: hash })) as {
		[key: string]: any;
	};
	delete user.password;
	const tokens = await tokenService.generateToken({
		id: user.id,
		email: user.email,
	});
	await tokenService.saveToken({ userId: user.id, token: tokens.refreshToken });
	return { ...tokens, user };
};

const login = async (req: authRM): Promise<UserRes> => {
	const user = (await userModel.find({ email: req.email, id: 0 })) as {
		[key: string]: any;
	};

	if (!user) throw { status: 403, message: "User does not exist" };

	const isEqual = await bcrypt.compare(req.password, user.password);
	if (!isEqual)
		throw { status: 400, message: "Info does not match. Try again" };

	delete user.password;
	const tokens = await tokenService.generateToken({
		id: user.id,
		email: user.email,
	});
	await tokenService.saveToken({ userId: user.id, token: tokens.refreshToken });
	return { ...tokens, user };
};

const logout = async (refreshToken: string): Promise<RefreshToken> => {
	return await tokenService.removeToken(refreshToken);
};

const update = async (req: updateUserRM): Promise<User> => {
	const data = await userModel.update(req);
	return data;
};

const refresh = async (refreshToken: string): Promise<UserRes | undefined> => {
	if (!refreshToken) throw { status: 401, message: "User is unaurthorized" };
	const token = await tokenService.validateRToken(refreshToken);

	if (token !== undefined) {
		const user = (await userModel.find({ id: token.id, email: "" })) as {
			[key: string]: any;
		};
		delete user.password;
		const tokens = await tokenService.generateToken({
			id: user.id,
			email: user.email,
		});
		await tokenService.saveToken({
			userId: user.id,
			token: tokens.refreshToken,
		});
		return { ...tokens, user };
	}
};

export default InitUserService();
