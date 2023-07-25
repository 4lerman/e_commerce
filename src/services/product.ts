import {
	createProductRM,
	getProductRM,
	updateProductRM,
} from "../model/request";
import productModel from "../repository/product";
import { Product } from "../model/product";

interface IProductService {
	find: (req: getProductRM) => Promise<Product[]>;
	findById: (userId: number) => Promise<Product[] | null>;
	create: (req: createProductRM) => Promise<Product>;
	update: (req: updateProductRM) => Promise<Product>;
	deleteById: (req: { id: number; userId: number }) => Promise<Product>;
}

const InitProductService = (): IProductService => {
	return {
		find: find,
		findById: findById,
		create: create,
		update: update,
		deleteById: deleteById,
	};
};

const find = async (req: getProductRM): Promise<Product[]> => {
	const products = await productModel.find(req);
	return products;
};

const findById = async (userId: number): Promise<Product[] | null> => {
	const product = await productModel.findById(userId);
	return product;
};

const create = async (req: createProductRM): Promise<Product> => {
	const products = await productModel.find({
		price: req.price,
		title: req.title,
		category: req.category,
	});

	if (products.length > 0) throw { status: 403, message: "products already exists" };

	const newProduct = await productModel.create(req);
	return newProduct;
};

const update = async (req: updateProductRM): Promise<Product> => {
	const product = await productModel.update(req);
	return product;
};

const deleteById = async (req: {
	id: number;
	userId: number;
}): Promise<Product> => {
	const product = await productModel.deleteById(req);
	return product;
};

export default InitProductService();
