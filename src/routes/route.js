import express from "express";
import { solve } from "../controllers/controller.js";
const router = express.Router();

router.post("/solve", solve);

export default router;
