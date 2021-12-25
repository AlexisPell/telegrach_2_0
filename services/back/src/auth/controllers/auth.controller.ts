import { ValidationPipe } from './../../common/pipes/validation.pipe';
import { CreateUserDto } from './../../users/dto/create-user.dto';
import { AuthGuard } from '../guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from '../guards/local.guard';
import { AuthService } from '../auth.service';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { User, UserDocument } from 'src/users/user.document';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  private logger: Logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  @ApiOperation({ summary: 'Get me, if logged in' })
  @ApiOkResponse({ type: User, description: 'User' })
  @Get('me')
  // @UseGuards(AuthGuard)
  status(@Req() req: Request) {
    this.logger.log(`REQUEST USER: ${JSON.stringify(req.user, null, 2)}`);
    // this.logger.log('REQUEST SESSION:', req.session);
    // this.logger.log('REQUEST COOKIE:', req.cookies);
    return req.user;
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  @UseGuards(LocalAuthGuard)
  login(@Res() res: Response) {
    res.redirect(`me`);
  }

  @Post('register')
  async register(@Body() body: CreateUserDto, @Res() res: Response) {
    await this.authService.registration(body);
    res.redirect(307, 'login');
  }

  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.logout();
    res.send({
      msg: 'Logged out',
    });
  }
}
