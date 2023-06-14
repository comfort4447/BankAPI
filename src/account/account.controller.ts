import { 
    Body,
    Controller, 
    Get, 
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
    @Param('id', ParseIntPipe)  accountId: number 
    ) {
        return this.Accountservice.getAccountById(
            userId,
            accountId,
        );
    }

@Post()
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
    @Param('id', ParseIntPipe) accountId: number,
    @Body() dto: EditAccountDto,
    ) {
        return this.Accountservice.editAccountById(
            userId,
            accountId,
            dto,
        );
    }
}