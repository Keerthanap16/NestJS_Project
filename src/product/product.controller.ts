import { Controller, Get, Post, Param, Body, Put, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/jwt.service';
import { ResponseDto } from './dto/response.dto'; 
import { Roles,RolesGuard } from 'src/auth/roles.service';

@Controller('products')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  @Roles('admin', 'user')
  async findOne(@Param('id') id: string): Promise<ResponseDto<object>> {
    const product = await this.productService.getProductById(id);
    return new ResponseDto<object>(true, 'Product retrieved successfully', product);
  }

  @Get()
  @Roles('admin', 'user')
  async getProducts(): Promise<ResponseDto<object[]>> {
    const products = await this.productService.getProducts();
    return new ResponseDto<object[]>(true, 'Products retrieved successfully', products);
  }

  @Post()
  @Roles('admin')
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req: Request): Promise<ResponseDto<null>> {
    //@ts-ignore
    const userId = req.user.userId; // Get user ID from request 
    const productData = {
      ...createProductDto,
      createdByUserId: userId
    };
    await this.productService.createProduct(productData);
    return new ResponseDto<null>(true, 'Product created successfully');
  }

  @Put(':id')
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request
  ): Promise<ResponseDto<null>> {
    //@ts-ignore
    const userId = req.user.userId;
    const updatedProductData = {
      ...updateProductDto,
      updatedByUserId: userId,
    };
    await this.productService.updateProduct(id, updatedProductData);
    return new ResponseDto<null>(true, 'Product updated successfully');
  }

  @Delete(':id')
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<ResponseDto<null>> {
    await this.productService.deleteProduct(id);
    return new ResponseDto<null>(true, 'Product deleted successfully');
  }
}
