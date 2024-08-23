import { Controller, Get, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { CurrentUser } from './current-user.decorator';
import { User } from '../users/schema/user.schema';
import { Response } from 'express';
import { JwtAuthGuard2 } from './guards/jwt-auth.guard2';
import { UsersService } from '../users/users.service';
import { JwtRefreshAuthGuard } from './refresh-token/refresh-jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}
  // @UseGuards(AuthGuard('local'))
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Request() req,
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    // return this.authService.login(req.user)
    return this.authService.login2(user, response);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  @UseGuards(JwtAuthGuard2)
  getProfile(@Request() req, @CurrentUser() user: User) {
    console.log({ user });

    return this.usersService.getAllUsers();
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  refreshToken(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log({ user });

    return this.authService.login2(user, response);
  }
}
