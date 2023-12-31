import { NextFunction, Request, Response } from "express";
import tokenService from '../services/token'
import { JwtPayload } from "jsonwebtoken";


export const verify = async (req: Request, res: Response, next: NextFunction) => {
	const accessToken: string =
		req.cookies.accessToken || req.cookies["accessToken"];
	if (!accessToken) return res.status(403).send("Login first");

    try {
        const data = await tokenService.validateAToken(accessToken);
        req.body.user = data;
        next();
    } catch {
        res.status(401).send('Please authenticate');
    }
};
