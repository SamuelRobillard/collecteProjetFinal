import { Router } from "express";

import { UserController } from "../../controllers/v3/UserController";
import { createRateLimiter } from "../../middleswares/rateLimitMiddleware"
import { authMiddleware } from "../../middleswares/authentificationMiddleswares";
import { adminMiddleware } from "../../middleswares/adminMiddleware";
const router = Router();
const userController = new UserController();

router.post("/user", userController.createUser);
router.post("/admin", adminMiddleware, userController.createUser);

const loginLimiter = createRateLimiter('/api/v3/login');
if (loginLimiter) router.post('/login', loginLimiter, userController.login);

router.get('/users',authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/users/:id',authMiddleware, adminMiddleware, userController.getUserById);

export default router;