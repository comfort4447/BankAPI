import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { 
    CreateAccountDto, 
    EditAccountDto 
} from './dto';

@Injectable()
export class Accountservice {
    constructor(private prisma: PrismaService){}
    
async createAccount(
    userId: number, 
    dto: CreateAccountDto
    ) {
        const account = await this.prisma.account.create({
            data: {
                userId,
                ...dto,
            },
        });
        return account;
    }

getAccounts(
    userId: number
    ) {
        return this.prisma.account.findMany({
            where: {
                userId,
            },
        });
    }

getAccountById(
    userId: number, 
    AccountId: number,
    ) {
        return this.prisma.account.findFirst({
            where: {
                id: AccountId,
                userId,
            },
        });
    }
getAccountByAccountNumber(
        account_Number: number,
        ) {
            return this.prisma.account.findUnique({
                where: {
                    id: account_Number,
                },
            });
        }

 async editAccountById(
    userId: number, 
    AccountId: number,
    dto: EditAccountDto, 
    ) {
        const account = await this.prisma.account.findUnique({
            where: {
                id: AccountId,
            },
        });
        if (!account || account.userId !== userId)
        throw new ForbiddenException(
            'Access to resources denied',
        );
        return this.prisma.account.update({
            where: {
                id: AccountId,
            },
            data: {
                ...dto,
            },
        });
    }

    async deleteAccountById(
        userId: number,
        AccountId: number,
    ){
        const account = await this.prisma.account.findUnique({
            where: {
                id: AccountId,
            },
        });
        if(!account || account.userId !== userId)
        throw new ForbiddenException(
            'Access to resources denied',
        );
        await this.prisma.account.delete({
            where: {
                id: AccountId,
            }
        })
    }
}