import { ForbiddenException, Injectable } from "@nestjs/common";
import { User, Transaction, Account, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService{
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password)

        // save the new user in the db
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                    fullNmae: dto.fullNmae,
                    account: dto.account,
                    pin: dto.pin,
                },
            });
            delete user.hash;
            return user;
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException(
                        'Credentials taken',
                    );
                }
            }
            throw error;
        }
    }


    async login(dto: AuthDto) {

        // find user by email
        const user =  await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            },
        });
        // if user does not exist throw exception
        if (!user)
            throw new ForbiddenException(
                'Credientials incorrect',
            );
        // compare password
        const pwmaches = await argon.verify(
            user.hash,
            dto.password,
        );
        // if password incorrect throw exception
        if (!pwmaches)
            throw new ForbiddenException(
                'Credientials incorrect'
            );
        // send back the user
        delete user.hash;
        return user;
        return { msg: 'I have signed in' };
    }

    
}