import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { UserService } from './user.service';
import { addUserPointsDto } from './dto/addUserPoints.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.registerUser(registerUserDto);
  }

  @Post('/add-points')
  addToken(@Body() addUserToken: addUserPointsDto) {
    return this.userService.addUserPointsHandler(addUserToken);
  }
}
