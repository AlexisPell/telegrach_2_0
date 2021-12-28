import { GoogleAuthGuard } from '../guards/google.guard';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class GoogleAuthController {
  @Get('/google/login')
  @UseGuards(GoogleAuthGuard)
  loginDiscord() {
    return;
  }
  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  redirect(@Res() res: any) {
    res.redirect(`${process.env.WEB_URL}`);
  }
}
