import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { adminMiddleware } from '../middleswares/adminMiddleware';
import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleswares/authentificationMiddleswares';

describe('adminMiddleware', () => {
  const mockResponse = () => {
    const res = {} as Response;
    (res.status as any) = jest.fn().mockReturnThis();
    (res.json as any) = jest.fn();
    return res;
  };

  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if user is not authenticated', () => {
    const req = {
      user: undefined,
    } as AuthRequest;

    const res = mockResponse();

    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Utilisateur non authentifié' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if user is not admin', () => {
    const req = {
      user: { role: 'user' },
    } as AuthRequest;

    const res = mockResponse();

    adminMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Accès refusé : Admin requis' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next if user is admin', () => {
    const req = {
      user: { role: 'admin' },
    } as AuthRequest;

    const res = mockResponse();

    adminMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
