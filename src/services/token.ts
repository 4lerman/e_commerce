import jwt, { Jwt, JwtPayload, Secret } from "jsonwebtoken";
import { saveTokenRM } from "../model/request";
import tokenModel from "../repository/token";
import { RefreshToken } from "../model/user";
import "dotenv/config";

interface ITokenService {
	generateToken: (payload: {
		id: number;
		email: string;
	}) => Promise<{ accessToken: string; refreshToken: string }>;
	saveToken: (req: saveTokenRM) => Promise<void>;
	removeToken: (refreshToken: string) => Promise<RefreshToken>;
	validateAToken: (accessToken: string) => Promise<string | JwtPayload>;
	validateRToken: (refreshToken: string) => Promise<JwtPayload | undefined>;
}

const InitTokenService = (): ITokenService => {
	return {
		generateToken: generateToken,
		saveToken: saveToken,
		removeToken: removeToken,
		validateAToken: validateAToken,
		validateRToken: validateRToken,
	};
};

const generateToken = async (payload: {
	id: number;
	email: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
	const accessToken = jwt.sign(
		payload,
		String(process.env.ACCESS_TOKEN_SECRET),
		{
			expiresIn: "5min",
		}
	);
	const refreshToken = jwt.sign(
		payload,
		String(process.env.REFRESH_TOKEN_SECRET),
		{
			expiresIn: "7d",
		}
	);

	return { accessToken, refreshToken };
};

const saveToken = async (req: saveTokenRM): Promise<void> => {
	const tokenData = await tokenModel.find({
		userId: req.userId,
		refreshToken: req.token,
	});

	if (tokenData) {
		tokenData.token = req.token;
		tokenModel.save(tokenData);
		return;
	}

	await tokenModel.create(req);
};

const removeToken = async (refreshToken: string): Promise<RefreshToken> => {
	return await tokenModel.deleteToken(refreshToken);
};

const validateAToken = async (
	accessToken: string
): Promise<string | JwtPayload> => {
	try {
		return jwt.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET));
	} catch {
		throw { status: 401, message: "User is unauthorized" };
	}
};

const validateRToken = async (refreshToken: string): Promise<JwtPayload | undefined> => {
	try {
		const user = jwt.verify(
			refreshToken,
			String(process.env.REFRESH_TOKEN_SECRET)
		) as JwtPayload;

		const token = await tokenModel.find({
			userId: 0,
			refreshToken: refreshToken,
		});
		if (token && user) return user;
	} catch {
		throw { status: 401, message: "User is unauthorized: please login again" };
	}
};

export default InitTokenService();
