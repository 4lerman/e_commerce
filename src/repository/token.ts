import { createTokenRM, saveTokenRM } from "../model/request";
import { RefreshToken } from "../model/user";
import prisma from "../utils/prisma";

interface ITokenRepo {
	find: (req: {
		userId: number;
		refreshToken: string;
	}) => Promise<RefreshToken | null>;
	create: (req: createTokenRM) => Promise<RefreshToken>;
	save: (req: saveTokenRM) => Promise<RefreshToken>;
	deleteToken: (refreshToken: string) => Promise<RefreshToken>;
}

const InitTokenRepo = (): ITokenRepo => {
	return {
		find: find,
		create: create,
		save: save,
		deleteToken: deleteToken,
	};
};

const find = async (req: {
	userId: number ;
	refreshToken: string;
}): Promise<RefreshToken | null> => {
	return await prisma.refreshTokens.findFirst({
		where: {
			OR: [{ userId: req.userId }, { token: req.refreshToken }],
		},
	});
};

const create = async (req: createTokenRM): Promise<RefreshToken> => {
	return await prisma.refreshTokens.create({
		data: {
			userId: req.userId,
			token: req.token,
		},
	});
};

const save = async (req: saveTokenRM): Promise<RefreshToken> => {
	return await prisma.refreshTokens.update({
		where: {
			userId: req.userId,
		},
		data: {
			token: req.token,
		},
	});
};

const deleteToken = async (refreshToken: string): Promise<RefreshToken> => {
	const tokenData = await prisma.refreshTokens.findFirst({
		where: {
			token: refreshToken,
		},
	});

	if (!tokenData) throw { status: 500, message: "error ocurred" };

	const token = await prisma.refreshTokens.delete({
		where: {
			userId: tokenData.userId,
		},
	});

	return token;
};

export default InitTokenRepo();
