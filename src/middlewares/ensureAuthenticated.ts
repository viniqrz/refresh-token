import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export function ensureAuthenticated(
    req: Request, res: Response, next: NextFunction
  ): void {
    const authToken = req.headers.authorization;

    if (!authToken) {
      res.status(401).json({
        message: "Token is missing",
      });

      return;
    }

    const [, token] = authToken.split(' ');

    const SECRET ='e4b03338-208f-484d-83b7-be91e0ee11a3';

    try {
      verify(token, SECRET);

      next();

      return;
    } catch(err) {
      res.status(401).json({
        message: "Invalid Token",
      });

      return;
    }
}