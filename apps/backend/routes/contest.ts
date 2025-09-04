import { Router } from "express";

export const contestRouter = Router();

contestRouter.post("/submit/:challendeId", (req, res) => {
  // have rate limiting
  // max 20 submissions per problem
  // forward the request to GPT
  // store the res in sorted set and the DB
});

contestRouter.get("/active-contests", (req, res) => {
  const { offset, page } = req.query;
});

contestRouter.get("/finished-contests", (req, res) => {
  const { offset, page } = req.query;
});

// return all the sub challenges and their start time
contestRouter.get("/:contestId", (req, res) => {
  const { contestId } = req.params;
});

contestRouter.get("/:contestId/:challenngeId", (req, res) => {
  const { contestId, challenngeId } = req.params;
});

contestRouter.get("/leaderboard/:contestId", (req, res) => {});
