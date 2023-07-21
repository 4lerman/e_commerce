import { NextFunction, Request, Response } from "express";
import userService from "../services/user";
import { User, UserRes } from "../model/user";
import { createUserRM } from "../model/request";
import { validationResult } from "express-validator";

interface IUserController {
	getUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const InitUserController = (): IUserController => {
	return {
		getUser: getUser,
		register: register,
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

const register = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { name, email, password } = req.body;

	const data: createUserRM = {
		name: name,
		email: email,
		password: password,
	};

	const userExists: User | null = await userService.find({
		id: req.body.id,
		email: req.body.email,
	});
	if (userExists) throw { status: 403, message: "Already exists" };

	const newUser = await userService.create(data);
	res.cookie("accessToken", newUser.accessToken, {
		maxAge: 5 * 60 * 1000,
		httpOnly: false,
		path: "/",
	});
	res.cookie("refreshToken", newUser.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: false,
		path: "/",
	});
	res.status(200).json(newUser);
};

export default InitUserController();
