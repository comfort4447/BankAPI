import { 
    Body,
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post, 
    UseGuards 
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { Accountservice } from './account.service';
import { 
    CreateAccountDto,
    EditAccountDto
} from './dto';

@UseGuards(JwtGuard)
@Controller('Accounts')
export class AccountController {
    constructor(
        private Accountservice: Accountservice,
    ) {}


@Get()
getAccounts(
    @GetUser('id') userId: number
    ) {
        return this.Accountservice.getAccounts(
            userId,
        );
    }

@Get(':id')
getAccountsById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe)  AccountId: number, account_Number: number 
    ) {
        return this.Accountservice.getAccountById(
            userId,
            AccountId,
        );
    }

@Post('addAccount')
createAccount(
    @GetUser('id') userId: number, 
    @Body() dto: CreateAccountDto,
    ) {
        return this.Accountservice.createAccount(
            userId,
            dto,
        );
    }


@Patch(':id') 
editAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) AccountId: number,
    @Body() dto: EditAccountDto,
    ) {
        return this.Accountservice.editAccountById(
            userId,
            AccountId,
            dto,
        );
    }

@HttpCode(HttpStatus.NO_CONTENT)
@Delete(':id')
deleteAccountById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) AccountId: number,
){
    return this.Accountservice.deleteAccountById(
        userId, 
        AccountId
    );
}

@Post(':senderAccountId/send-money/:receiverAccountId')
async sendMoney(
  @Param('account_Number', ParseIntPipe) account_Number: number,
  @Param('receiver', ParseIntPipe) receiver: number,
  @Param('balance', ParseIntPipe) balance: number,
  @Body() dto: EditAccountDto,
) {
  const amount = dto.balance; 

  const result = await this.Accountservice.sendMoney(
    account_Number,
    receiver,
    amount,
    balance,
    dto,
  );

  return {
    message: 'Money sent successfully',
    senderAccount: result.senderAccount,
    receiverAccount: result.receiverAccount,
  };
}
}