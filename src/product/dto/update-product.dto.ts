import { IsNotEmpty,IsOptional, IsNumber, IsPositive, IsBoolean, IsString } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  availability?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsString()
  updatedByUserId?: string; 
}
