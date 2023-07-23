import { createUserRM, updateUserRM } from "../model/request";
import { User } from "../model/user";
import prisma from "../utils/prisma";

interface IUserRepo {
	find: (req: { id: number; email: string }) => Promise<User | null>;
	create: (req: createUserRM) => Promise<User>;
	update: (req: updateUserRM) => Promise<User>;
	deleteById: (id: number) => Promise<User>;
}

const InitUserRepo = (): IUserRepo => {
	return {
		find: find,
		create: create,
		update: update,
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
		include: {
			products: true,
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

const update = async (req: updateUserRM): Promise<User> => {
	const user = await prisma.user.findFirst({
		where: {
			email: req.email,
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
		include: {
			products: true,
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
