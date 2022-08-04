import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/auth-login.dto';
import { AuthCredentialsDto } from './dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registeruser(@Body() AuthCredentialsDto: AuthCredentialsDto) {
   return  this.authService.interNEwUser(AuthCredentialsDto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Body() loginCredentialsDto: LoginCredentialsDto) {    
    return this.authService.userLogin(loginCredentialsDto.email, loginCredentialsDto.password);
  }
}
