import { Router } from "express";
import { punchedIn, punchedOut } from "../controllers/timeTracking.controller.js";

const router = Router();

router.post('/punch-in', punchedIn);
router.post('/punch-out', punchedOut);

export default router;
