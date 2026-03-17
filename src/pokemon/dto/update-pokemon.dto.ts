import { IsInt, IsOptional, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class UpdatePokemonDto {
    @IsOptional()
    @IsInt()
    @IsPositive()
    @Min(1)
    no?: number;
    
    @IsOptional()
    @IsString()
    @MinLength(2)
    name?: string;
}