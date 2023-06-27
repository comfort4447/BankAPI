import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { SendTransactionDto } from './dto/send-transaction.dto';
import { GetUser } from 'src/auth/decorator';


@Controller('transaction')
export class TransactionController {
    constructor(
        private TransactionService: TransactionService
    ) {}

// @Get('Accounts/:AccountId')
// getTransactions(
//     // @GetUser('id') userId: number,
//     @Param('id', ParseIntPipe)  AccountId: number 
// ){
//     return this.TransactionService.getTransactions(
//         // userId,
//         AccountId,
//     );
// }

// @Get(':id')
// getTransactionsById(
//     @Param('id', ParseIntPipe)  AccountId: number,
//     @Param('id', ParseIntPipe) transactionId: number,
// ){
//     return this.TransactionService.getTransactionById(
//         AccountId,
//         transactionId,
//     );
// }
@Post(':id')
createTransaction(
    @GetUser('id') AccountId: number,
    @Body() dto: SendTransactionDto,
){
    return this.TransactionService.createTransaction(
        AccountId,
        dto,
    )
}

// @Patch(':id')
// editTransactionById(
//     @GetUser('id') userId: number,
//     @Param('id', ParseIntPipe) AccountId: number,
//     @Body() dto: SendTransactionDto,
//     ) {
//         return this.TransactionService.editTransactionById(
//             userId,
//             AccountId,
//             dto,
//         );
//     }

// @HttpCode(HttpStatus.NO_CONTENT)
// @Delete(':id')
// deleteAccountById(
//     @GetUser('id') userId: number,
//     @Param('id', ParseIntPipe) AccountId: number,
// ){
//     return this.TransactionService.deleteTransactionById(
//         userId, 
//         AccountId
//     );
// }
}
