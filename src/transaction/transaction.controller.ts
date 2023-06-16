import { Controller, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { GetUser } from 'src/auth/decorator';


@Controller('transaction')
export class TransactionController {
    constructor(
        private TransactionService: TransactionService
    ) {}

@Post('')
SendFunds(
    @GetUser('id') AccountId: number,
) {
    return this.TransactionService.createTransaction(
        AccountId,
    );
}
}
