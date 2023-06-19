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
    sender?: number

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    balance?: number

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    type_of_transaction?: string
}
