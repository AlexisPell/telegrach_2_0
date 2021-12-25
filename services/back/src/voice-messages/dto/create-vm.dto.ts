import { ApiProperty } from '@nestjs/swagger';
import {
  // IsString, IsNotEmpty,
  IsMongoId,
} from 'class-validator';

export class CreateVMDto {
  // @ApiProperty({ description: 'Voice record / audio', example: 'myVoice.mp3' })
  // @IsNotEmpty({ message: 'May not be empty' })
  // @IsString({ message: 'Must be a string' })
  // readonly audio: string;

  @ApiProperty({ description: "Creator's profile id", example: 'ObjectId' })
  @IsMongoId({ message: 'Must be a valid mongo id' })
  readonly profileId: string;
}
