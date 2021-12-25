import { FilesService } from './../files/files.service';
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateVMDto } from './dto/create-vm.dto';
import { VoiceMessage, VoiceMessageDocument } from './vm.document';
import { FILE_TYPE } from 'src/files/files.interfaces';

@Injectable()
export class VoiceMessagesService {
  private logger: Logger = new Logger(VoiceMessagesService.name);

  constructor(
    @InjectModel(VoiceMessage.name)
    private voiceMessageModel: Model<VoiceMessageDocument>,
    private filesService: FilesService,
  ) {}

  async getAll(): Promise<VoiceMessage[] | string> {
    this.logger.log(`Voice message // get all`);
    return await this.voiceMessageModel.find();
  }

  async getOne(vmId: ObjectId | string): Promise<VoiceMessage> {
    this.logger.log(`Voice message // get one`);
    const voiceMessage = await this.voiceMessageModel.findById(vmId);
    if (!voiceMessage)
      throw new BadRequestException('Such voice message not found');
    return voiceMessage;
  }

  async create(
    profileId: string,
    audio: Express.Multer.File,
  ): Promise<VoiceMessage> {
    const pathToVoiceMessage = this.filesService.createFile(
      FILE_TYPE['VOICE_MESSAGE'],
      audio,
    );
    const vm = await this.voiceMessageModel.create({
      profileId,
      audio: pathToVoiceMessage,
    });
    return vm;
  }

  async delete(vmId: string): Promise<boolean> {
    try {
      this.logger.log(`Voice message // delete`);
      const deletingVM = await this.voiceMessageModel.findOneAndDelete({
        _id: vmId,
      });
      if (deletingVM) {
        this.filesService.removeFile(deletingVM?.audio);
      }
      return true;
    } catch (e) {
      throw new BadRequestException('Bad request for deleting voice message');
    }
  }
}
