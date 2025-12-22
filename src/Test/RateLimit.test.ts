import { describe, it, expect, jest, beforeEach } from '@jest/globals';
import { createRateLimiter } from '../middleswares/rateLimitMiddleware';
import rateLimit from 'express-rate-limit';
import config from '../config/config';

jest.mock('express-rate-limit');

describe('createRateLimiter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns null if route is not configured', () => {
    const result = createRateLimiter('nonexistentRoute');
    expect(result).toBeNull();
  });

  it('calls rateLimit with correct config for a configured route', () => {
    // mock a route config
    config.rateLimitSettings = {
      testRoute: { windowMs: 2, max: 5 },
    };

    const mockedRateLimit = rateLimit as jest.Mock;

    createRateLimiter('testRoute');

    expect(mockedRateLimit).toHaveBeenCalledWith(
      expect.objectContaining({
        windowMs: 2 * 1000, // seconds → ms
        max: 5,
        message: 'Trop de requêtes, réessayez plus tard.',
        standardHeaders: true,
        legacyHeaders: false,
      })
    );
  });

  it('uses defaults if route config values are missing', () => {
    config.rateLimitSettings = {
      testRoute: {}, // empty config
    };

    const mockedRateLimit = rateLimit as jest.Mock;

    createRateLimiter('testRoute');

    expect(mockedRateLimit).toHaveBeenCalledWith(
      expect.objectContaining({
        windowMs: 60 * 1000, // default 60 seconds
        max: 10,             // default 10 requests
      })
    );
  });
});
