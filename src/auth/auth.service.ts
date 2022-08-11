import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  Options,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/database/entities/auth.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModal: Model<userDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async interNEwUser(AuthCredentialsDto) {
    // let foundExistingEmail = this.userModal.findOne({
    //   email: AuthCredentialsDto.email,
    // });
    // console.log('foundExistingEmail', foundExistingEmail);

    // if (foundExistingEmail) {
    //   throw new NotFoundException('User with that email already exists');
    // }
    let { password } = AuthCredentialsDto;
    const hashPassword = await bcrypt.hash(password, 10);
    return await this.userModal.create({
      ...AuthCredentialsDto,
      password: hashPassword,
    });
  }
  async userLogin(email, password) {
    // let { email, password } = loginCredentialsDto;
    const user = await this.userModal.findOne({ email: email.toLowerCase() });
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken: string = await this.getJwtToken(user);
      return {
        status: 'success',
        data: {
          accessToken,
          user,
        },
      };
    } else {
      return null;
    }
  }

  async getJwtToken(user: any, is2FaAuthenticated = false) {
    // console.log("user::::", user);

    const payload: any = {
      userId: user.id,
      // name: user.name,
      // email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async findUser(userId: string) {
    return await this.userModal.findOne({ _id: userId });
  }
}
