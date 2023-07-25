import { Product } from "../model/product";
import {
	createProductRM,
	getProductRM,
	updateProductRM,
} from "../model/request";
import prisma from "../utils/prisma";

interface IProductRepo {
	find: (req: getProductRM) => Promise<Product[]>;
	findById: (userId: number) => Promise<Product[] | null>;
	create: (req: createProductRM) => Promise<Product>;
	update: (req: updateProductRM) => Promise<Product>;
	deleteById: (req: { id: number; userId: number }) => Promise<Product>;
}

const InitProductRepo = (): IProductRepo => {
	return {
		find: find,
		findById: findById,
		create: create,
		update: update,
		deleteById: deleteById,
	};
};

const find = async (req: getProductRM): Promise<Product[]> => {
	return await prisma.product.findMany({
		where: {
			price: {
				gt: 1,
				lte: req.price,
			},
			category: req.category,
			title: {
				contains: req.title,
			},
		},
	});
};

const findById = async (userId: number): Promise<Product[] | null> => {
	return await prisma.product.findMany({
		where: {
            userId: userId
		},
	});
};

const create = async (req: createProductRM): Promise<Product> => {
	return await prisma.product.create({
		data: {
			title: req.title,
			category: req.category,
			description: req.description,
			price: req.price,
			image: req.image,
			amount: req.amount,
            userId: req.userId,
		}
	});
    
};

const update = async (req: updateProductRM): Promise<Product> => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.id,
			userId: req.userId,
		},
	});

	if (!product) throw { status: 404, message: "product not found" };

	return await prisma.product.update({
		where: {
			id: req.id,
			userId: req.userId,
		},
		data: {
			title: req.title,
			category: req.category,
			description: req.description,
			price: req.price,
			image: req.image,
			amount: req.amount,
		},
	});
};

const deleteById = async (req: { id: number; userId: number }) => {
	const product = await prisma.product.findFirst({
		where: {
			id: req.id,
			userId: req.userId,
		},
	});

	if (!product) throw { status: 404, message: "product not found" };

	return await prisma.product.delete({
		where: {
			id: req.id,
			userId: req.userId,
		},
	});
};

export default InitProductRepo();
