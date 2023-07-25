import express, { Router } from "express";
import productController from "../controller/product";
import middlewares from "../middlewares/error";
import * as auth from "../middlewares/auth";

export const product: Router = express.Router();

product.get("", auth.verify, middlewares.cover(productController.getByDetails));
product.get(
	"/myproducts",
	auth.verify,
	middlewares.cover(productController.getUserProducts)
);
product.post(
	"",
	auth.verify,
	middlewares.cover(productController.createProduct)
);
product.put(
	"/:id",
	auth.verify,
	middlewares.cover(productController.updateProduct)
);
product.delete(
	"/:id",
	auth.verify,
	middlewares.cover(productController.deleteProduct)
);
