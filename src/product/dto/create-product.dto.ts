import { IsNotEmpty, IsNumber, IsPositive, IsBoolean, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;  // or `@IsBoolean()` for stricter validation

  @IsOptional()
  @Type(() => Date) // Convert input to Date object
  createdAt?: Date; // Optional field, as it will be set automatically by the database

  @IsOptional()
  @Type(() => Date) // Convert input to Date object
  updatedAt?: Date; // Optional field, as it will be set automatically by the database

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true; // Default to true, but can be overridden

  @IsOptional()
  createdByUserId?: string; // Optional field

  @IsOptional()
  updatedByUserId?: string; // Optional field
}
