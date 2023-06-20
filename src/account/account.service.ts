import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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
async sendMoney(
    account_Number: number,
    receiver: number,
    amount: number,
    balance: number,
    dto: EditAccountDto,
      ) {
          const senderAccount = await this.prisma.account.findUnique({
            where: {
              id: account_Number,
              },
            });
        
          const receiverAccount = await this.prisma.account.findUnique({
            where: {
              id: receiver,
            },
            });
        
          if (!senderAccount || !receiverAccount) {
            throw new NotFoundException('Account not found');
          }
        
          if (senderAccount.balance < amount) {
            throw new ForbiddenException('Insufficient balance');
          }
        
            // Deduct the amount from the sender's account balance
          const updatedSenderAccount = await this.prisma.account.update({
            where: {
              id: account_Number,
            },
            data: {
              balance: senderAccount.balance - amount,
            },
            });
        
            // Update the receiver's account balance
          const updatedReceiverAccount = await this.prisma.account.update({
            where: {
              id: receiver,
            },
            data: {
              balance: receiverAccount.balance + amount,
            },
          });
        
            // Update other fields of the accounts if provided in the DTO
          if (dto) {
            await this.prisma.account.update({
              where: {
                id: account_Number,
              },
              data: {
                ...dto,
              },
            });
        
            await this.prisma.account.update({
              where: {
                id: receiver,
              },
              data: {
                ...dto,
              },
            });
          }
        
          return {
            senderAccount: updatedSenderAccount,
            receiverAccount: updatedReceiverAccount,
          };
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