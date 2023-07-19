import { Product as ProductModel } from "@prisma/client";

export interface Product extends ProductModel {}

export interface ProductRes {
	id: number;
	title: string;
	price: number;
	userId: number;
	description: string;
	amount: number;
	category: string;
	image?: string;
}
