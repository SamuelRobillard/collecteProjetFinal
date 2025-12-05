import { Router } from "express";
import express, { Request, Response } from 'express';
import { UserController } from "../../controllers/v3/UserController";
import { createRateLimiter } from "../../middleswares/rateLimitMiddleware"
import { authMiddleware, AuthRequest } from "../../middleswares/authentificationMiddleswares";
import { adminMiddleware } from "../../middleswares/adminMiddleware";
import UserModel from "../../models/v3/UserModel";
import DTOUser from "../../models/v3/DTOUser";
const router = Router();
const userController = new UserController();

router.post("/user", userController.createUser);

router.post("/admin", adminMiddleware, userController.createAdmin);

const loginLimiter = createRateLimiter('/api/v3/login');
if (loginLimiter) router.post('/login', loginLimiter, userController.login);

router.get('/users',authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/users/:id',authMiddleware, adminMiddleware, userController.getUserById);


router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    
    // Vérifie que le middleware a bien ajouté req.user
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    // Récupère le user depuis MongoDB
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Retourne le user sans le mot de passe
    const userNoPass : DTOUser = new DTOUser(user.id, user.firstName, user.lastName, user.email);
    res.status(200).json(userNoPass);
  } catch (error) {
    console.error('Erreur dans /me :', error);
    res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
});

export default router;