import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import spinCheat from './utils/spinCheat';
import spinDrum from './utils/spinDrum';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PlayService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  async spinAnalyze({ access_token }: { access_token: string }) {
    const user = await this.authService.checkUserValidity({ access_token });

    let budget = user.points as number;
    const rewards = {
      Cherry: 10,
      Lemon: 20,
      Orange: 30,
      Watermelon: 40,
    };

    if ((user.points as number) <= 0) {
      throw new BadRequestException('Not enough points');
    }

    const slot: string[] = spinCheat(user.points as number, spinDrum());

    if (slot[0] === slot[1] && slot[1] === slot[2]) {
      budget += rewards[slot[0]];
    } else {
      budget -= 10;
    }

    const updatedPoints = await this.userService.editUserPointsHandler(user.email, budget);

    return {
      slot: slot,
      points: updatedPoints
    }
  }
}
