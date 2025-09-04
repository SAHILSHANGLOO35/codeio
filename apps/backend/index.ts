import express from "express";
import { userRouter } from "./routes/user";
import { adminRouter } from "./routes/admin";
import { contestRouter } from "./routes/contest";
import cookieParser from "cookie-parser";
import passport from "passport";
import { authRouter } from "./routes/auth";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/contest", contestRouter);

app.get("/health", (req, res) => {
  res.json({ status: "OK Status", timestamp: new Date().toISOString() });
});

app.listen(process.env.PORT || 4000, () => {
  console.log(`SERVER STARTED ON PORT ${process.env.PORT}`);
});
