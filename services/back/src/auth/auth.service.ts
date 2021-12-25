import { CreateUserDto } from './../users/dto/create-user.dto';
import { UsersService } from './../users/users.service';
import { User, UserDocument } from '../users/user.document';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { Profile as DiscordProfile } from 'passport-discord';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Profile, ProfileDocument } from 'src/profiles/profile.document';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = this.userModel.findOne({ email: userDto.email });
    return user;
  }

  async registration(userDto: CreateUserDto) {
    this.logger.log('AUTH SERVICE / REGISTRATION');
    const candidate = await this.userModel.findOne({ email: userDto.email });
    if (candidate) throw new BadRequestException('Such user already exists');
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const _user: CreateUserDto = { ...userDto, password: hashPassword };
    const user = await this.userModel.create(_user);
    const profile = await this.profileModel.create({ user: user._id });

    await this.userModel.findByIdAndUpdate(user.id, { profile: profile._id });
    await this.profileModel.findByIdAndUpdate(profile.id, { user: user._id });

    return user;
  }

  async validateDiscordProfile(userDto: DiscordProfile): Promise<User> {
    this.logger.log('VALIDATE DISCORD / INIT', userDto);
    const user = await this.userModel.findOne({ discordId: userDto.id });
    if (user) {
      this.logger.log(
        `VALIDATE DISCORD / USER FOUND ${JSON.stringify(user, null, 2)}`,
      );
      return user;
    }
    const newUser = await this.usersService.createForDiscordStrategy(userDto);
    this.logger.log('VALIDATE DISCORD / NEW USER', newUser);
    return newUser;
  }
  async validateGoogleProfile(userDto: GoogleProfile): Promise<User> {
    this.logger.log(
      `VALIDATE GOOGLE / INIT ${JSON.stringify(userDto, null, 2)}`,
    );
    const user = await this.userModel.findOne({ googleId: userDto.id });
    if (user) {
      this.logger.log(
        `VALIDATE GOOGLE / USER FOUND ${JSON.stringify(user, null, 2)}`,
      );
      return user;
    }
    const newUser = await this.usersService.createForGoogleStrategy(userDto);
    this.logger.log(
      `VALIDATE GOOGLE / NEW USER ${JSON.stringify(user, null, 2)}`,
    );
    return newUser;
  }
  async validateLocalUser(userDto: CreateUserDto): Promise<User | undefined> {
    this.logger.log('VALIDATE LOCAL / INIT');
    const user = await this.userModel.findOne({ email: userDto.email });
    if (!user) {
      this.logger.log('VALIDATE LOCAL / USER NOT FOUND');
      throw new BadRequestException('User with such credentials not found');
    }
    this.logger.log('VALIDATE LOCAL / USER FOUND', user);
    const passwordsEqual = await bcrypt.compare(
      userDto.password,
      user.password || '',
    );
    if (passwordsEqual) {
      this.logger.log('AUTH SERVICE / VALIDATE LOCAL / PASSWORD MATCHED');
      return user;
    }
    if (!passwordsEqual)
      throw new BadRequestException('Wrong password provided');
    return;
  }
}
