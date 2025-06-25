import { Body, Controller, Post } from '@nestjs/common';
import { loginUserDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  loginUser(@Body() userData: loginUserDto) {
    console.log(userData);
    return this.authService.signIn(userData.email, userData.password);
  }
  @Post('/check-token')
  checkToken(@Body() tokenDto: TokenDto) {
    return this.authService.checkToken(tokenDto.access_token);
  }
}
