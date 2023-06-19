import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { GetUser } from 'src/auth/decorator';


@Controller('transaction')
export class TransactionController {
    constructor(
        private TransactionService: TransactionService
    ) {}

@Get()
getTransactions(
    @GetUser('id') AccountId: number
){
    return this.TransactionService.getTransactions(
        AccountId,
    );
}

@Get(':id')
getTransactionsById(
    @GetUser('id') AccountId: number,
    @Param('id', ParseIntPipe) transactionId: number,
){
    return this.TransactionService.getTransactionById(
        AccountId,
        transactionId,
    );
}
// @Post(':id')
// createTransaction(
//     @GetUser('id') AccountId: number,
//     @Body() dto: SendTransactionDto,
// ){
//     return this.TransactionService.createTransacrion{
//         AccountId,
//         dto,
//     }
// }

// @Patch(':id')
// editAccountById(
//     @GetUser('id') userId: number,
//     @Param('id', ParseIntPipe) accountId: number,
//     @Body() dto: SendTransactionDto,
//     ) {
//         return this.TransactionService.editTransactionById(
//             userId,
//             accountId,
//             dto,
//         );
//     }

@HttpCode(HttpStatus.NO_CONTENT)
@Delete(':id')
deleteAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) accountId: number,
){
    return this.TransactionService.deleteTransactionById(
        userId, 
        accountId
    );
}
}
