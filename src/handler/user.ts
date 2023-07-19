import express, { Router } from "express";
import userController from "../controller/user";
import middlewares from "../middlewares";

export const user: Router = express.Router();

user.get("", middlewares.cover(userController.getUser));
user.post("", middlewares.cover(userController.createUser));
