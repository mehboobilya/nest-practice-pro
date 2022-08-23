import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EmailHandlerModule } from 'src/email-handler/email-handler.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    EmailHandlerModule,
    ConfigModule,
    JwtModule.register({
      secret: 'f809bba1fedbc42d26135e5aaab72b9c',
      signOptions: { expiresIn: '1d' },
    }),
    // JwtModule.register({
    //   secret: 'f809bba1fedbc42d26135e5aaab72b9c',
    // }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
