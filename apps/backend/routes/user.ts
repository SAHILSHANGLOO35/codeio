import { Router } from "express";
import { prisma } from "db/client";
import jwt from "jsonwebtoken";
import {
  authMiddleware,
  type AuthRequest,
} from "../middlewares/authMiddleware";

export const userRouter = Router();

userRouter.get("/profile", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user },
      select: {
        id: true,
        username: true,
        email: true,
        picture: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
