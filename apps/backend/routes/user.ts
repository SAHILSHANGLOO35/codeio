import { Router } from "express";
import { prisma } from "db/client";
import jwt from "jsonwebtoken";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  authMiddleware,
  type AuthRequest,
} from "../middlewares/authMiddleware";

export const userRouter = Router();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
      callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await prisma.user.findUnique({
          where: { googleId: profile.id },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails?.[0]?.value ?? "",
              picture: profile.photos?.[0]?.value ?? null,
            },
          });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

userRouter.get("/profile", authMiddleware, (req: AuthRequest, res) => {
  res.json(req.user);
});

// Logout
userRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});
