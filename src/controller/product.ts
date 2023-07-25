import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import {
	createProductRM,
	getProductRM,
	updateProductRM,
} from "../model/request";
import productService from "../services/product";

interface IProductController {
	getByDetails: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	getUserProducts: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	createProduct: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	updateProduct: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	deleteProduct: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
}

const InitProductController = (): IProductController => {
	return {
		getByDetails,
		getUserProducts,
		createProduct,
		updateProduct,
		deleteProduct,
	};
};

const getByDetails = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const reqData: getProductRM = req.body;
	const product = await productService.find(reqData);

	res.status(200).json(product);
};

const getUserProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const userId = req.body.user.id;
	if (!userId) throw { status: 404, message: "Bad request" };

	const products = await productService.findById(parseInt(userId));

	res.status(200).json(products)
};

const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const reqData: createProductRM = {...req.body, userId: req.body.user.id};
	const newProduct = await productService.create(reqData);

	res.status(200).json(newProduct);
};

const updateProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const productId = req.params.id;
	const userId = req.body.user.id;

	const reqData: updateProductRM = {
		...req.body,
		id: parseInt(productId),
		userId: userId,
	};
	const product = await productService.update(reqData);

	res.status(200).json(product);
};

const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const productId = req.params.id;
	const userId = req.body.user.id;

	const product = await productService.deleteById({
		id: parseInt(productId),
		userId,
	});
	res.status(200).json(product);
};


export default InitProductController();