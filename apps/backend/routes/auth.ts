import { Router } from "express";
// import passport from "../middlewares/googleAuth";
import jwt from "jsonwebtoken";
import passport from "passport";

export const authRouter = Router();

// Start Google login
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in prod
      sameSite: "strict",
    });

    res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
  }
);
