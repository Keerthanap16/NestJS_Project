import { Controller, Get, Param, Put, Body, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from './dto/response.dto'; // Import ResponseDto

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<ResponseDto<any[]>> {
    const users = await this.userService.getAllUsers();
    return new ResponseDto<any[]>(true, 'Users retrieved successfully', users);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ResponseDto<any | null>> {
    const user = await this.userService.getUserById(id);
    return new ResponseDto<any | null>(true, 'User retrieved successfully', user);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto<null>> {
    await this.userService.updateUser(id, updateUserDto);
    return new ResponseDto<null>(true, 'User updated successfully');
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<ResponseDto<null>> {
    await this.userService.deleteUser(id);
    return new ResponseDto<null>(true, 'User deleted successfully');
  }
}
