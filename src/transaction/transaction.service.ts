import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SendTransactionDto } from './dto/send-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(
    sendTransactionDto: SendTransactionDto, 
    accountId: number): Promise<void> {

    const { sender, receiver, amount } = sendTransactionDto;

    // Fetch the sender's account from the database
    const senderAccount = await this.prisma.account.findUnique({ 
        where: { 
            id: accountId
        } });

    if (!senderAccount) {
      throw new Error('Sender account not found');
    }

    if (senderAccount.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Deduct the amount from the sender's account balance
    const updatedSenderBalance = senderAccount.balance - amount;

    // Update the sender's account balance in the database
    await this.prisma.account.update({
      where: { id: senderAccount.id },
      data: { balance: updatedSenderBalance },
    });

    // Fetch the receiver's account from the database
    const receiverAccount = await this.prisma.account.findUnique({ 
        where: { 
            accountId: receiver
        } });

    if (!receiverAccount) {
      throw new Error('Receiver account not found');
    }

    // Add the amount to the receiver's account balance
    const updatedReceiverBalance = receiverAccount.balance + amount;

    // Update the receiver's account balance in the database
    await this.prisma.account.update({
      where: { id: receiverAccount.id },
      data: { balance: updatedReceiverBalance },
    });

    // Create the transaction record
    await this.prisma.transaction.create({
      data: {
        amount,
        sender: { connect: { id: sender } },
        receiver: { connect: { id: receiver } },
      },
    });
  }
}
