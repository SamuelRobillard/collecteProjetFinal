import { describe, it, expect, jest, beforeEach } from '@jest/globals';

// We isolate modules per test to reset internal token state
beforeEach(() => {
  jest.resetModules();
});

describe('auth.generateAmadeusToken', () => {
  it('returns access token when axios succeeds and config is valid', async () => {
    jest.doMock('axios', () => ({
      __esModule: true,
      default: {
        post: jest
          .fn<(...args: any[]) => Promise<any>>()
          .mockResolvedValue({ data: { access_token: 'TOKEN123', expires_in: 3600 } }),
      },
    }));
    jest.doMock('../config/config', () => ({ __esModule: true, default: { clientId: 'CID', clientSecret: 'SECRET' } }));

    const { generateAmadeusToken } = await import('../services/v3/auth');
    const token = await generateAmadeusToken();

    expect(token).toBe('TOKEN123');
    const axiosMod = (await import('axios')).default as any;
    expect(axiosMod.post).toHaveBeenCalledWith(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      expect.any(URLSearchParams),
      expect.objectContaining({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }),
    );
  });

  it('returns "null" when config values are not strings', async () => {
    jest.doMock('axios', () => ({ __esModule: true, default: { post: jest.fn() } }));
    jest.doMock('../config/config', () => ({ __esModule: true, default: { clientId: null, clientSecret: undefined } }));

    const { generateAmadeusToken } = await import('../services/v3/auth');
    const token = await generateAmadeusToken();

    expect(token).toBe('null');
  });
});

describe('auth.getToken', () => {
  it('returns cached token when not expired (does not call axios again)', async () => {
    const axiosPost = jest.fn() as jest.MockedFunction<(...args: any[]) => Promise<any>>;
    axiosPost.mockResolvedValue({ data: { access_token: 'CACHED', expires_in: 3600 } });

    jest.doMock('axios', () => ({ __esModule: true, default: { post: axiosPost } }));
    jest.doMock('../config/config', () => ({ __esModule: true, default: { clientId: 'CID', clientSecret: 'SECRET' } }));

    const { generateAmadeusToken, getToken } = await import('../services/v3/auth');

    await generateAmadeusToken();
    const token = await getToken();

    expect(token).toBe('CACHED');
    expect(axiosPost).toHaveBeenCalledTimes(1);
  });
});

describe('auth.refreshToken', () => {
  it('forces token renewal', async () => {
    const axiosPost = jest.fn() as jest.MockedFunction<(...args: any[]) => Promise<any>>;
    axiosPost.mockResolvedValueOnce({ data: { access_token: 'FIRST', expires_in: 3600 } });
    axiosPost.mockResolvedValueOnce({ data: { access_token: 'SECOND', expires_in: 3600 } });

    jest.doMock('axios', () => ({ __esModule: true, default: { post: axiosPost } }));
    jest.doMock('../config/config', () => ({ __esModule: true, default: { clientId: 'CID', clientSecret: 'SECRET' } }));

    const { generateAmadeusToken, refreshToken } = await import('../services/v3/auth');

    const t1 = await generateAmadeusToken();
    const t2 = await refreshToken();

    expect(t1).toBe('FIRST');
    expect(t2).toBe('SECOND');
    expect(axiosPost).toHaveBeenCalledTimes(2);
  });
});
