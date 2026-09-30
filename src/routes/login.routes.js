import { Router } from "express";

import { loginUser } from "../controllers/login.controller.js";
import authenticateUser from "../middlewares/authentication.middleware.js";

const router = Router();

router.post('/', authenticateUser, loginUser);

export default router;