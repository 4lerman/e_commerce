import express, { Router } from "express";
import userController from "../controller/user";
import middlewares from "../middlewares";
import * as auth from "../middlewares/auth";

export const user: Router = express.Router();

user.get("/:id", auth.verify, middlewares.cover(userController.getUserById));
user.post("/register", middlewares.cover(userController.register));
user.post("/login", middlewares.cover(userController.login));
user.post("/logout", middlewares.cover(userController.logout));
user.post("/refresh", middlewares.cover(userController.refresh));
