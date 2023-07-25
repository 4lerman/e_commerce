import express, { Router } from "express";
import { user } from "./user";
import { product } from "./product";

export const api: Router = express.Router();

api.use("/user", user);
api.use("/product", product);
