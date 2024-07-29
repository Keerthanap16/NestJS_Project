import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResponseDto } from './dto/response.dto'; // Import ResponseDto

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<ResponseDto<any>> {
    const data = await this.authService.login(loginDto);
    return new ResponseDto<any>(true, 'Login successful', data);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<ResponseDto<null>> {
    await this.authService.register(registerDto);
    return new ResponseDto<null>(true, 'User registered successfully');
  }
}
