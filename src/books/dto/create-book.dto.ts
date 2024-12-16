import { IsNotEmpty, IsString } from "class-validator";


export class CreateBookDto{

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    author: string;

    @IsNotEmpty()
    price: number;
    

}