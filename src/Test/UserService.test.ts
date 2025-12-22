import { describe, it, expect, jest } from '@jest/globals';
import { UserService } from '../services/v3/UserService';
import { HttpError } from '../utils/HttpError';
import UserModel from '../models/v3/UserModel';
import bcrypt from 'bcryptjs';

jest.mock('../models/v3/UserModel');
jest.mock('bcryptjs');

const mockedUser = UserModel as jest.Mocked<typeof UserModel>;
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

type UserOnly = { firstName: string; lastName: string; email: string; password: string; role: string };

describe('UserService.createUser', () => {
  it('should create a new user with hashed password', async () => {
    const fakeUser: UserOnly = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashedPassword123',
      role: 'user'
    };

    mockedUser.findOne.mockResolvedValue(null);
    mockedBcrypt.hash.mockResolvedValue('hashedPassword123' as never);

    const MockedUserConstructor = mockedUser as unknown as jest.Mock;
    MockedUserConstructor.mockImplementation(function (this: any, doc: any) {
      Object.assign(this, doc);
      this.save = jest.fn().mockResolvedValue(this as never);
      return this;
    });

    const result = await UserService.createUser(
      'John',
      'Doe',
      'john@example.com',
      'password123',
      'user'
    );

    expect(mockedUser.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
    expect(mockedBcrypt.hash).toHaveBeenCalledWith('password123', 10);
    expect(result).toMatchObject({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      role: 'user'
    });
  });

  it('should throw error if email already exists', async () => {
    const existingUser: UserOnly = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'hashedPassword456',
      role: 'user'
    };

    mockedUser.findOne.mockResolvedValue(existingUser as any);

    await expect(
      UserService.createUser('Jane', 'Smith', 'jane@example.com', 'password456', 'user')
    ).rejects.toThrow('Cet email est déjà utilisé.');
  });
});

describe('UserService.updateUser', () => {
  it('should update user with valid ID', async () => {
    const updatedUser: UserOnly = {
      firstName: 'John',
      lastName: 'Updated',
      email: 'john@example.com',
      password: 'hashedPassword123',
      role: 'admin'
    };

    mockedBcrypt.hash.mockResolvedValue('newHashedPassword' as never);
    mockedUser.findByIdAndUpdate.mockResolvedValue(updatedUser as any);

    const result = await UserService.updateUser('507f1f77bcf86cd799439011', {
      lastName: 'Updated',
      role: 'admin'
    });

    expect(mockedUser.findByIdAndUpdate).toHaveBeenCalled();
    expect(result).toEqual(updatedUser);
  });

  it('should throw error if user ID is invalid', async () => {
    await expect(
      UserService.updateUser('invalidId', { lastName: 'Updated' })
    ).rejects.toThrow('ID utilisateur invalide.');
  });

  it('should hash password if provided in update', async () => {
    const updatedUser: UserOnly = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'newHashedPassword',
      role: 'user'
    };

    mockedBcrypt.hash.mockResolvedValue('newHashedPassword' as never);
    mockedUser.findByIdAndUpdate.mockResolvedValue(updatedUser as any);

    const result = await UserService.updateUser('507f1f77bcf86cd799439011', {
      password: 'newPassword123'
    });

    expect(mockedBcrypt.hash).toHaveBeenCalledWith('newPassword123', 10);
    expect(result).toEqual(updatedUser);
  });

  it('should throw error if user not found', async () => {
    mockedUser.findByIdAndUpdate.mockResolvedValue(null);

    await expect(
      UserService.updateUser('507f1f77bcf86cd799439011', { lastName: 'Updated' })
    ).rejects.toThrow('Utilisateur non trouvé.');
  });
});

describe('UserService.getAllUsers', () => {
  it('should return all users', async () => {
    const fakeUsers: UserOnly[] = [
      { firstName: 'John', lastName: 'Doe', email: 'john@example.com', password: 'hashedPassword123', role: 'user' },
      { firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', password: 'hashedPassword456', role: 'admin' }
    ];

    mockedUser.find.mockResolvedValue(fakeUsers as any);

    const result = await UserService.getAllUsers();

    expect(mockedUser.find).toHaveBeenCalled();
    expect(result).toEqual(fakeUsers);
  });

  it('should return empty array if no users exist', async () => {
    mockedUser.find.mockResolvedValue([] as any);

    const result = await UserService.getAllUsers();

    expect(mockedUser.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});

describe('UserService.getuserById', () => {
  it('should return user if found by ID', async () => {
    const fakeUser: UserOnly = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashedPassword123',
      role: 'user'
    };

    mockedUser.findById.mockResolvedValue(fakeUser as any);

    const result = await UserService.getuserById('507f1f77bcf86cd799439011');

    expect(mockedUser.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(result).toEqual(fakeUser);
  });

  it('should return null if user not found', async () => {
    mockedUser.findById.mockResolvedValue(null);

    const result = await UserService.getuserById('507f1f77bcf86cd799439011');

    expect(mockedUser.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
    expect(result).toBeNull();
  });
});

describe('UserService.deleteUser', () => {
  it('should delete user by ID', async () => {
    const deletedUser: UserOnly = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'hashedPassword123',
      role: 'user'
    };

    mockedUser.findOneAndDelete.mockResolvedValue(deletedUser as any);

    const result = await UserService.deleteUser('507f1f77bcf86cd799439011');

    expect(mockedUser.findOneAndDelete).toHaveBeenCalledWith({ _id: '507f1f77bcf86cd799439011' });
    expect(result).toEqual(deletedUser);
  });

  it('should return null if user not found for deletion', async () => {
    jest.clearAllMocks();
    mockedUser.findOneAndDelete.mockResolvedValue(null);

    const result = await UserService.deleteUser('507f1f77bcf86cd799439011');

    expect(mockedUser.findOneAndDelete).toHaveBeenCalledWith({ _id: '507f1f77bcf86cd799439011' });
    expect(result).toBeNull();
  });
});
