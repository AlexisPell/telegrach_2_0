import { Profile, Strategy } from 'passport-discord';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URI,
      scope: ['identify', 'email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile | any,
    done: any,
  ): Promise<any> {
    console.log('DISCORD STRATEGY: ', accessToken, refreshToken, profile);
    const user = await this.authService.validateDiscordProfile(profile);
    if (!user) {
      console.log('DISCORD STRATEGY / !USER');
      throw new UnauthorizedException();
    }
    return user;
  }
}
