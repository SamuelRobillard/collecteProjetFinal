import { Router } from 'express';
import { UserController } from '../../controllers/v1/user.controller';
import express, { Request, Response } from 'express';
import User from '../../models/v1/User';
import bcrypt from "bcryptjs";
import { UserService } from '../../services/v1/user.service';
import jwt from 'jsonwebtoken';
const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);
router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/users', async (req: Request, res: Response) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role
    const username = req.body.username
    const email = req.body.email
    const favorites = req.body.favorites
    const users: User[] = await UserService.getAllUsers()
    const userFound = users.find(user => user.email === req.body.email);
    if (userFound !== undefined) {

        res.status(400).send("email deja enregistré")
    }
    else {
        const id = (UserService.getMaxId() + 1).toString()


        const user = new User(id, username, email, hashedPassword, role, favorites);
        userController.createUser(user)
        res.status(201).send('Utilisateur enregistré');
    }

});


router.post('/login', async (req, res) => {
    const users: User[] = await UserService.getAllUsers()
    const user = users.find(user => user.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('email ou mot de passe incorrect');
    }
});
export default router;