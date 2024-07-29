import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  // Method to get the details of all products
  async getProducts(): Promise<any[]> {
    return this.prisma.product.findMany();
  }

  // Method to get the details of a specific product by ID
  async getProductById(id: string): Promise<any> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Method to create a new product
  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  // Method to update an existing product
  async updateProduct(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  // Method to delete a product
  async deleteProduct(id: string): Promise<any> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
