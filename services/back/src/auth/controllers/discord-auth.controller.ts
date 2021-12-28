import { DiscordAuthGuard } from '../guards/discord.guard';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('auth')
export class DiscordAuthController {
  @Get('/discord/login')
  @UseGuards(DiscordAuthGuard)
  loginDiscord() {
    return;
  }

  @Get('/discord/redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: any) {
    res.redirect(`${process.env.WEB_URL}`);
  }
}
