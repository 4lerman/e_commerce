import express, { Express, Response, Request } from "express";
import dotenv from "dotenv";
import config from "./config";
import cors from "cors";
import cookieParser from "cookie-parser";
import middlewares from "./middlewares/error.js";
import { api } from "./handler";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

app.use(cors(config.cors));
app.use(cookieParser());
app.use(express.json());

app.use("/api", api);
app.use(middlewares.errorHandler);

// app.use("/", (req: Request, res: Response) => {
// 	res.status(200).json("Working");
// });

app.listen(PORT, () => console.log(`Server running on port - ${PORT}`));
