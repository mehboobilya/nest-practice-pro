import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/auth-changePassword.dto';
import { ForgotPasswordDto } from './dto/auth-forgetPassword.dto';
import { LoginCredentialsDto } from './dto/auth-login.dto';
import { AuthCredentialsDto } from './dto/auth-register.dto';
import { JwtAuthGuard } from './gaurd/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async registeruser(@Body() AuthCredentialsDto: AuthCredentialsDto) {
    return this.authService.interNEwUser(AuthCredentialsDto);
  }
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.userLogin(
      loginCredentialsDto.email,
      loginCredentialsDto.password,
    );
  }
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard('local'))
  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(
    @Body() ChangePasswordDto: ChangePasswordDto,
    @Req() { user },
  ) {
    console.log('user fffff', user);

    return this.authService.changePassword(
      ChangePasswordDto.newPassword,
      ChangePasswordDto.oldPassword,
      user.userId,
    );
  }
  @Post('forget-password')
  async forgetPassword(@Body() ForgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgetPassword(ForgotPasswordDto);
  }
}
