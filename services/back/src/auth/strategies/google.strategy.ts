import { Strategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './../auth.service';
import { STRATEGIES } from '../auth.constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(
  Strategy,
  STRATEGIES.GOOGLE,
) {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URI,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile | any,
    done: VerifyCallback,
  ): Promise<any> {
    console.log('GOOGLE STRATEGY: ', accessToken, refreshToken, profile);
    const user = await this.authService.validateGoogleProfile(profile);
    if (!user) {
      console.log('GOOGLE STRATEGY / !USER');
      throw new UnauthorizedException('!USER');
    }
    return user;
  }
}
