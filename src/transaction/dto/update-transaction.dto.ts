import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class SendTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    amount?: number

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    receiver?: number
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    sender?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    status?: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type_of_transaction?: ['Deposit', 'Withdraw', 'send']
}
