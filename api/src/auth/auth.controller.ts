import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() registerDto: RegisterDto){
    return this.authService.register(registerDto.name, registerDto.email, registerDto.password);
  }

  @Post('/login')
  loginUser(@Body() loginDto:LoginDto){
    return this.authService.login(loginDto.email, loginDto.password);
  }
}
