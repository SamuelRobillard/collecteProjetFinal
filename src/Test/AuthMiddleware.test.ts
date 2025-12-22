import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import jwt from 'jsonwebtoken';
import { authMiddleware, AuthRequest } from '../middleswares/authentificationMiddleswares';
import { Response, NextFunction } from 'express';

describe('authMiddleware', () => {
  let res: Response;
  let next: NextFunction;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    next = jest.fn();
  });

  it('returns 401 if Authorization header is missing', () => {
    const req = { headers: {} } as AuthRequest;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token manquant' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 401 if token is missing', () => {
    const req = { headers: { authorization: 'Bearer ' } } as AuthRequest;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token manquant' });
    expect(next).not.toHaveBeenCalled();
  });

  it('returns 403 if token is invalid', () => {
    const req = { headers: { authorization: 'Bearer invalid-token' } } as AuthRequest;

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token invalide ou expiré' });
    expect(next).not.toHaveBeenCalled();
  });

  it('calls next if token is valid', () => {
    const payload = { userId: '123', role: 'user' };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret');

    const req = { headers: { authorization: `Bearer ${token}` } } as AuthRequest;

    authMiddleware(req, res, next);

    expect(req.user).toMatchObject(payload);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
