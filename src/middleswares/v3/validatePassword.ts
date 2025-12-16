import { Request, Response, NextFunction } from "express";

import FormatedStringRegex from "../../Regex/FormatedStringRegex";

export function ValidatePassword(req: Request, res: Response, next: NextFunction) {

    let { password } = req.body;

    if (typeof (password) != 'string') {
        return res.status(400).json({ message: "Password doit etre un string" });
    }

    if (!FormatedStringRegex.strongPassword(password)) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial" });
    }

    next();
}

