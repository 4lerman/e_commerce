import { NextFunction, Request, Response } from "express";
import userService from "../services/user";
import { User } from "../model/user";
import { createUserRM } from "../model/request";

interface IUserController {
	getUser: (req: Request, res: Response, next: NextFunction) => void;
	createUser: (req: Request, res: Response, next: NextFunction) => void;
}

const InitUserController = (): IUserController => {
	return {
		getUser: getUser,
		createUser: createUser,
	};
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
	const data: { id: number; email: string } = {
		id: req.body.id,
		email: req.body.email,
	};

	const user = await userService.find(data);

	if (!user || user === undefined)
		throw { status: 404, message: "Does not exist" };

	res.status(200).json(user);
};

const createUser = async (req: Request, res: Response, next: NextFunction) => {
	const data: createUserRM = {
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
	};

	const userExists: User | null = await userService.find({
		...req.body.id,
		...req.body.email,
	});
	if (userExists) throw { status: 403, message: "Already exists" };

	const newUser = await userService.create(data);
	res.status(200).json(newUser);
};


export default InitUserController();