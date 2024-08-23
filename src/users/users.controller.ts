import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user';
import { UsersService } from './users.service';
import { JwtAuthGuard2 } from '../auth/guards/jwt-auth.guard2';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    return await this.usersService.createUser(request);
  }

  @UseGuards(JwtAuthGuard2)
  @Get()
  async getUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':email')
  async getUser(@Param() params: any) {
    return await this.usersService.getUser(params.email);
  }
}
