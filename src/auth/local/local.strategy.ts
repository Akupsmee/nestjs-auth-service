import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' }); // by default, local strategy expects the request to contain {username, password}, so we have to redefine it in the scope
  }

  // async validate(email: string, password: string): Promise<any> {
  //   const user = await this.authService.validateUser(email, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }

  //   return user;
  // }

  // tutorial implementation
  async validate(email: string, password: string) {
    return await this.authService.verifyUser(email, password);
  }
}
