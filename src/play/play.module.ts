import { Module } from '@nestjs/common';
import { PlayController } from './play.controller';
import { PlayService } from './play.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  exports: [],
  controllers: [PlayController],
  providers: [PlayService],
})
export class PlayModule {}
