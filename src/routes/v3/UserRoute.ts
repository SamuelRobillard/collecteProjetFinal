import { Router } from "express";

import { UserController } from "../../controllers/v3/UserController";

const router = Router();
const userController = new UserController();

router.post("/user", userController.createUser);

export default router;