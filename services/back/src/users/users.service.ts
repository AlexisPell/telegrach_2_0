import { Profile as DiscordProfile } from 'passport-discord';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from './user.document';
import { Profile, ProfileDocument } from '../profiles/profile.document';

@Injectable()
export class UsersService {
  private logger: Logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.log('GET BY EMAIL EXCEPTION');
      throw new NotFoundException("User with such email doesn't exist");
    }
    return user;
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) {
      this.logger.log('GET BY ID EXCEPTION');
      throw new NotFoundException("User with such email doesn't exist");
    }
    return user;
  }

  async createUserWithProfile(validatedDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(validatedDto);
    const profile = await this.profileModel.create({ user: user._id });

    await this.userModel.findByIdAndUpdate(user.id, { profile: profile._id });
    await this.profileModel.findByIdAndUpdate(profile.id, { user: user._id });

    return user;
  }

  async createForDiscordStrategy(
    discordPayload: DiscordProfile,
  ): Promise<User> {
    this.logger.log('createForDiscord / init', discordPayload);
    const candidateByDiscordId = await this.userModel.findOne({
      discordId: discordPayload.id,
    });
    if (candidateByDiscordId) {
      this.logger.log('createForDiscord / found local user by discordId');
      return candidateByDiscordId;
    }

    const userPayload: Partial<User> = {
      email: discordPayload.email,
      locallyVerified: discordPayload.verified,
      discordId: discordPayload.id,
    };
    const user = await this.userModel.create(userPayload);

    const profilePayload: Partial<Profile> = {};
    profilePayload.user = user._id; // NOTE: doesnt apply to profileModel
    if (discordPayload.username)
      profilePayload.username = discordPayload.username;
    if (discordPayload.avatar) profilePayload.avatar = discordPayload.avatar;

    const profile = await this.profileModel.create(profilePayload);

    await this.userModel.findByIdAndUpdate(user.id, { profile: profile._id });
    await this.profileModel.findByIdAndUpdate(profile.id, { user: user._id });

    return user;
  }

  async createForGoogleStrategy(googlePayload: GoogleProfile): Promise<User> {
    this.logger.log('createForGoogle / init', googlePayload);

    const userPayload: Partial<User> = {
      email: googlePayload._json.email,
      locallyVerified: !!googlePayload._json.email_verified,
      googleId: googlePayload.id,
    };
    const user = await this.userModel.create(userPayload);

    const profilePayload: Partial<Profile> = {};
    profilePayload.user = user._id;
    if (googlePayload._json.name)
      profilePayload.username = googlePayload._json.name;
    if (googlePayload.photos?.length)
      profilePayload.avatar = googlePayload.photos[0].value;

    const profile = await this.profileModel.create(profilePayload);

    await this.userModel.findByIdAndUpdate(user.id, { profile: profile._id });
    await this.profileModel.findByIdAndUpdate(profile.id, { user: user._id });

    return user;
  }

  // TODO: For further re-working
  // private async checkUnverifiedSameEmails(checkingEmail: string) {
  //   const usersWithSameEmail = await this.userModel.find({
  //     email: checkingEmail,
  //   });
  //   if (usersWithSameEmail.length) {
  //     console.log(`USERS SERVICE / REMOVING UNVERIFIED EMAIL`);
  //     const unverifiedSameMails = usersWithSameEmail
  //       .filter((u) => !u.locallyVerified)
  //       .map((u) => u.email);
  //     await this.userModel.deleteMany({ email: { $in: unverifiedSameMails } });
  //   }
  // }
}
