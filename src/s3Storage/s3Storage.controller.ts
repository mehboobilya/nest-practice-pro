import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/gaurd/jwt-auth.guard';
// import { AdminJwt2FaAuthGuard } from 'src/admin-auth/strategy/admin-jwt-2fa.guard';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { Role } from 'src/auth/enums/role.enum';
// import { Jwt2FaAuthGuard } from 'src/auth/strategy/jwt-2fa.guard';
// import { RolesGuard } from 'src/auth/strategy/roles.guard';
import { SignatureDto } from './dto/signature.dto';
import { UploadDto } from './dto/upload.dto';
import { S3StorageService } from './s3Storage.service';

// @ApiTags('storage')
@ApiTags('storage')
@Controller('storage')
export class S3StorageController {
  constructor(private readonly s3Storage: S3StorageService) {
  console.log("user-----");

  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        type: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() uploadPayload: UploadDto,
    @Req() { user },
  ) {
    console.log("file-----", file);
    console.log("uploadPayload-----", uploadPayload);
    console.log("user-----", user);
    
    return this.s3Storage.uploadPublicFile(uploadPayload.type, user, file);
  }
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       type: {
  //         type: 'string',
  //       },
  //     },
  //   },
  // })
  // @ApiBearerAuth()
  // @UseGuards(Jwt2FaAuthGuard)
  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file'))
  // @Post('upload/base64')
  // async uploadSignature(@Body() uploadPayload: SignatureDto, @Req() { user }) {
  //   return this.s3Storage.uploadBase64File(uploadPayload, user);
  // }

  // @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       type: {
  //         type: 'string',
  //       },
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  // @Roles(Role.ADMIN)
  // @UseGuards(RolesGuard)
  // @ApiBearerAuth()
  // @UseGuards(AdminJwt2FaAuthGuard)
  // @Post('admin/upload')
  // @UseInterceptors(FileInterceptor('file'))
  // async adminUpload(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Body() uploadPayload: UploadDto,
  //   @Req() { user },
  // ) {
  //   console.log(uploadPayload.type, user, file);
  //   return this.s3Storage.uploadPublicFile(uploadPayload.type, user, file);
  // }
}
