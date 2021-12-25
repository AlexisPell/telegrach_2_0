import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Profile } from '../profiles/profile.document';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends Document {
  @ApiProperty({ description: 'User email', example: 'my-mail@gmail.com' })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  @Prop({ type: String, minlength: 6 })
  password: string;

  @ApiProperty({
    description: 'If verified locally or somewhere else',
    example: true,
  })
  @Prop({ type: Boolean, default: false })
  locallyVerified: boolean;

  @ApiProperty({ description: 'google account id' })
  @Prop({ type: String, unique: true, sparse: true }) // sparse to let uniqie while null
  googleId: string;
  @ApiProperty({ description: 'discord account id' })
  @Prop({ type: String, unique: true, sparse: true }) // sparse to let uniqie while null
  discordId: string;

  @ApiProperty({
    description: 'profile of current user (bio, username, etc...)',
    type: () => Profile,
  })
  @Prop({ type: { type: MongooseSchema.Types.ObjectId, ref: 'Profile' } })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
