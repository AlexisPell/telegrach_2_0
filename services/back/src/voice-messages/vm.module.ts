import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VoiceMessage, VoiceMessageSchema } from './vm.document';
import { VoiceMessageController } from './vm.controller';
import { VoiceMessagesService } from './vm.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [VoiceMessageController],
  providers: [VoiceMessagesService],
  imports: [
    FilesModule,
    MongooseModule.forFeature([
      { name: VoiceMessage.name, schema: VoiceMessageSchema },
    ]),
  ],
})
export class VoiceMessageModule {}
