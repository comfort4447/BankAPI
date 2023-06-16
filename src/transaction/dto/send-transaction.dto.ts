import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class SendTransactionDto {
    @IsNumber()
    @IsNotEmpty()
    amount?: number

    @IsNumber()
    @IsNotEmpty()
    receiver: number
    
    @IsString()
    @IsNotEmpty()
    sender?: number

    @IsNumber()
    @IsNotEmpty()
    balance?: number
}
