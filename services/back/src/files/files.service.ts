import { VoiceMessage } from './../voice-messages/vm.document';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { FILE_TYPE } from './files.interfaces';
import { v4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { assetsPath } from 'src/common/constants/paths';

@Injectable()
export class FilesService {
  private logger: Logger = new Logger(FilesService.name);

  createFile(fileType: FILE_TYPE, file: Express.Multer.File): string {
    try {
      const fileExtension = path.extname(file.originalname);
      const fileName = `${fileType}-${v4()}${fileExtension}`;
      const filePath = path.resolve(assetsPath, fileType);
      console.log(
        '🚀 ~ file: files.service.ts ~ line 23 ~ FilesService ~ createFile ~ filePath',
        filePath,
      );
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);

      const pathToFile = `assets/${fileType}/${fileName}`;
      return pathToFile;
    } catch (e) {
      this.logger.error('File saving process has been corrupted.');
      throw new InternalServerErrorException(
        `Error during saving file: ${e.message}`,
      );
    }
  }

  removeFile(pathToFile: VoiceMessage['audio']) {
    fs.unlink(path.resolve(assetsPath, pathToFile), (err) => {
      if (err)
        throw new InternalServerErrorException(`File deleting failed: ${err}`);
      return true;
    });
    return true;
  }
}

// NOTE: 49:40
