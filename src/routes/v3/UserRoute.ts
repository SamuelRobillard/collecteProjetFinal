import { Router } from "express";

import { UserController } from "../../controllers/v3/UserController";
import {createRateLimiter} from "../../middleswares/rateLimitMiddleware"

const router = Router();
const userController = new UserController();

router.post("/user", userController.createUser);

const loginLimiter = createRateLimiter('/api/v3/login');
console.log(loginLimiter + "allo")
if (loginLimiter) router.post('/login', loginLimiter, userController.login);

export default router;