import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type VoiceMessageDocument = VoiceMessage & Document;

@Schema({ timestamps: false })
export class VoiceMessage extends Document {
  @ApiProperty({ description: 'Voice record / audio', example: 'myVoice.mp3' })
  @Prop({ type: String, required: true })
  audio: string;

  @ApiProperty({ description: "Creator's profile id", example: 'ObjectId' })
  @Prop({ type: String, required: true })
  profileId: string;
}

export const VoiceMessageSchema = SchemaFactory.createForClass(VoiceMessage);
