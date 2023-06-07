import { 
    Controller, 
    Get, 
    Req, 
    UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator'
import { JwtGuard } from '../auth/guard'
import { Request } from 'express';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
}
