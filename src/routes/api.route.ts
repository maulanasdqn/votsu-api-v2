import { Router } from "express";

export const api = Router();

api.get("/", async (req, res, next) => {
  res.send({ message: "API IS Running" });
  next();
});
