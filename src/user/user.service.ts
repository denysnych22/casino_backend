import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { hashPassword } from '../utils/hashPassword';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async registerUser(userData: Prisma.UserCreateInput) {
    try {
      const encryptedPassword = await hashPassword(userData.password);

      const createdUser = await this.prismaService.user.create({
        data: {
          ...userData,
          password: encryptedPassword,
        },
      });

      const token = this.authService.signIn(
        createdUser.email,
        userData.password,
      );

      return token;
    } catch (error) {
      if ((error.code as string) === 'P2002') {
        throw new HttpException(
          'User with this email already exists',
          HttpStatus.CONFLICT,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async findUser(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async editUserPointsHandler(email: string, points: number) {
    try {
      const updatedUser = await this.prismaService.user.update({
        where: { email },
        data: {
          points,
        },
      });

      return updatedUser.points;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async addUserPointsHandler({
    points_to_add,
    access_token,
  }: {
    points_to_add: number;
    access_token: string;
  }) {
    const userInfo = await this.authService.checkUserValidity({ access_token });
    return this.editUserPointsHandler(
      userInfo.email,
      (userInfo.points as number) + points_to_add,
    );
  }
}
