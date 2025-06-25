import { Body, Controller, Post } from '@nestjs/common';
import { SpinUserDto } from './dto/spinUser.dto';
import { PlayService } from './play.service';

@Controller('play')
export class PlayController {
  constructor(private readonly playService: PlayService) {}
  @Post('/spin')
  spin(@Body() spinUserDto: SpinUserDto) {
    return this.playService.spinAnalyze(spinUserDto);
  }
}
