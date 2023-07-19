import express, { Router } from "express";
import { user } from "./user";

export const api: Router = express.Router();

api.use("/user", user);

