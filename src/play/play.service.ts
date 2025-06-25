import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import spinCheat from './utils/spinCheat';
import spinDrum from './utils/spinDrum';
import { UserService } from '../user/user.service';

@Injectable()
export class PlayService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async spinAnalyze(userData: { email: string }) {
    const user = await this.userService.findUser(userData.email);

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

    return this.userService.editUserTokenHandler(userData.email, budget);
  }
}
