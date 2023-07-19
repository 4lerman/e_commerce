import { createUserRM, updateUserRM } from "../model/request";
import { User } from "../model/user";
import prisma from "../utils/prisma";

interface IUserRepo {
	find: (req: { id: number; email: string }) => Promise<User | null>;
	create: (req: createUserRM) => Promise<User>;
	updateById: (req: updateUserRM) => Promise<User>;
	deleteById: (id: number) => Promise<User>;
}

const InitUserRepo = (): IUserRepo => {
	return {
		find: find,
		create: create,
		updateById: updateById,
		deleteById: deleteById,
	};
};

const find = async (req: {
	id: number;
	email: string;
}): Promise<User | null> => {
	return await prisma.user.findFirst({
		where: {
			OR: [{ id: req.id }, { email: req.email }],
		},
	});
};

const create = async (req: createUserRM): Promise<User> => {
	return await prisma.user.create({
		data: {
			name: req.name,
			email: req.email,
			password: req.password,
		},
	});
};

const updateById = async (req: updateUserRM): Promise<User> => {
	const user = await prisma.user.findFirst({
		where: {
			id: req.id,
		},
	});

	if (!user) throw { status: 404, message: "not found" };

	return await prisma.user.update({
		data: {
			name: req.name,
			email: req.email,
		},
		where: {
			id: req.id,
		},
	});
};

const deleteById = async (id: number): Promise<User> => {
	const user = await prisma.user.findFirst({
		where: {
			id: id,
		},
	});

	if (!user) throw { status: 404, message: "not found" };

	return await prisma.user.delete({
		where: {
			id: id,
		},
	});
};

export default InitUserRepo();
