import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class EmailHandlerService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey("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");
  }

  async sendEmail(mail: SendGrid.MailDataRequired) {
    try {
      const transport = await SendGrid.send(mail);
      return transport;
    } catch (err) {
      throw err;
    }
  }
}
