import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { checkHashedPassword } from '../utils/hashPassword';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findUser(email);
    console.log(pass);
    if (!(await checkHashedPassword(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async checkToken(token: string) {
    try {
      const payload = this.jwtService.verify(token); // кине помилку, якщо токен невалідний
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async checkUserValidity({ access_token }: { access_token: string }) {
    const userAuthInfo = await this.checkToken(access_token);
    if (!userAuthInfo) {
      throw new UnauthorizedException();
    }
    const userInfo = await this.userService.findUser(userAuthInfo.email);
    if (!userInfo) {
      throw new NotFoundException();
    }
    return userInfo;
  }
}
