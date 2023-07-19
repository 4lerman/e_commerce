import { createUserRM, updateUserRM } from "../model/request";
import { User } from "../model/user";
import userModel from "../repository/user";

interface IUserService {
	find: (req: { id: number; email: string }) => Promise<User | null>;
	create: (req: createUserRM) => Promise<User>;
	updateById: (req: updateUserRM) => Promise<User>;
	deleteById: (id: number) => Promise<User>;
}

const InitUserService = (): IUserService => {
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
	const data = await userModel.find(req);
	return data;
};

const create = async (req: createUserRM): Promise<User> => {
	const data = await userModel.create(req);
	return data;
};

const updateById = async (req: updateUserRM): Promise<User> => {
	const data = await userModel.updateById(req);
	return data;
};

const deleteById = async (id: number): Promise<User> => {
	const data = await userModel.deleteById(id);
	return data;
};

export default InitUserService();
