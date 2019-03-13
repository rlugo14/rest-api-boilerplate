import { IsNumber, IsString } from "class-validator";

export default class CreateAddressDto {
    @IsString()
    public city: string;

    @IsString()
    public country: string;

    @IsString()
    public houseNumber: string;

    @IsString()
    public street: string;

    @IsNumber()
    public postNumber: number;
}
