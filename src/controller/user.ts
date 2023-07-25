import { NextFunction, Request, Response } from "express";
import userService from "../services/user";
import { User, UserRes } from "../model/user";
import { createUserRM } from "../model/request";
import { validationResult } from "express-validator";

interface IUserController {
	getUserById: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	logout: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	refresh: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const InitUserController = (): IUserController => {
	return {
		getUserById: getUserById,
		register: register,
		login: login,
		logout: logout,
		refresh: refresh,
	};
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const id = req.params.id || req.params["id"];

	const user = (await userService.find({ id: parseInt(id), email: "" })) as {
		[key: string]: any;
	};

	if (!user || user === undefined)
		throw { status: 404, message: "Does not exist" };

	delete user.password;

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

const login = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { email, password } = req.body;
	const user = await userService.login({ email, password });
	res.cookie("accessToken", user.accessToken, {
		maxAge: 5 * 60 * 1000,
		httpOnly: false,
		path: "/",
	});
	res.cookie("refreshToken", user.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: false,
		path: "/",
	});
	res.status(200).json(user);
};

const logout = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { refreshToken } = req.cookies;

	await userService.logout(refreshToken);
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	res.status(200).send(refreshToken);
};

const refresh = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const { refreshToken } = req.cookies;

	const user = (await userService.refresh(refreshToken)) as UserRes;
	res.cookie("accessToken", user.accessToken, {
		maxAge: 5 * 60 * 1000,
		httpOnly: false,
		path: "/",
	});
	res.cookie("refreshToken", user.refreshToken, {
		maxAge: 7 * 24 * 60 * 60 * 1000,
		httpOnly: false,
		path: "/",
	});
	res.status(200).json(user);
};

export default InitUserController();
