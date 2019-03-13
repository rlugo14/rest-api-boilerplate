import { IsDefined, IsEmail, IsNumber, IsString, ValidateNested } from "class-validator";
import Address from "./adresses/addresses.interface";

export class CreateUserDto {
    @IsString()
    public username: string;

    @IsString()
    public firstname: string;

    @IsString()
    public lastname: string;

    @IsEmail()
    public email: string;

    @ValidateNested()
    public address: Address;
}
