import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from 'src/common/dto/user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() dto: CreateUserDto) {
    return this.authService.registerUser(dto);
  }

  @Post('login')
  loginUser(@Body() dto: LoginUserDto) {
    return this.authService.loginUser(dto);
  }
}
