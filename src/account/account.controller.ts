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


@Get('getAccounts')
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

@Post(':AccountId/send-money/:userId')
  async sendMoney(
    @Param('AccountId', ParseIntPipe) AccountId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Body() dto: EditAccountDto,
  ) {
    const result = await this.Accountservice.sendMoney(
        AccountId,
        userId,
        dto.balance,
    );

    return {
      message: 'Money sent successfully',
      senderAccount: result.senderAccount,
      receiverAccount: result.receiverAccount,
    };
  }
}