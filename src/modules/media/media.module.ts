import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { mediaProviders } from './media.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  providers: [...mediaProviders, MediaService],
  controllers: [MediaController],
  imports: [DatabaseModule],
})
export class MediaModule {}
