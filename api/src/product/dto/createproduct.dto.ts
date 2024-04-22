import { IsNotEmpty } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    price: number;
    description: string;
}