import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Get,
  Post,
  Req,
  BadRequestException,
  Controller,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { User } from './user.document';
import { Request } from 'express';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User], description: 'User' })
  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @ApiOperation({ summary: 'Get user by email or id' })
  @ApiOkResponse({ type: User, description: 'User' })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  @Get('find-by')
  getUser(@Req() req: Request) {
    const email = req.query.email;
    const id = req.query.id;
    if (email) return this.usersService.getUserByEmail(email as string);
    if (id) return this.usersService.getUserById(id as string);
    throw new BadRequestException('No search query param defined');
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    type: User,
    description: 'User created successfully',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUserWithProfile(dto);
  }
}
