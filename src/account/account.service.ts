import { Injectable } from '@nestjs/common';
import { 
    CreateAccountDto, 
    EditAccountDto 
} from './dto';

@Injectable()
export class Accountservice {
    
createAccount(
    userId: number, 
    dto: CreateAccountDto
    ) {}

getAccounts(
    userId: number
    ) {}

getAccountById(
    userId: number, 
    accountId: number,
    account_Number: number
    ) {}

editAccountById(
    userId: number, 
    accountId: number,
    dto: EditAccountDto, 
    ) {}
}
