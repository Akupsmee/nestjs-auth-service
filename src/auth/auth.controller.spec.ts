import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

jest.mock('./auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => {
      return {
        validateUser: jest.fn(),
        login: jest.fn(),
      };
    }),
  };
});

jest.mock('../users/users.service.ts', () => {
  return {
    UsersService: jest.fn().mockImplementation(() => {
      return {
        getUser: jest.fn(),
        getAllUsers: jest.fn(),
      };
    }),
  };
});
jest.mock('./auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => {
      return {
        validateUser: jest.fn(),
        login: jest.fn(),
      };
    }),
  };
});

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
