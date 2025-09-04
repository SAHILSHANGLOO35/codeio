import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized! Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized! Not logged in" });
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    const err = error as Error;
    return res.status(404).send({
      message: "Unauthorized!",
      error: err.message,
    });
  }
};
