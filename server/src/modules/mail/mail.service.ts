import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as sgMail from '@sendgrid/mail';
import * as fs from 'fs';
import Handlebars from 'handlebars';
import * as path from 'path';
import { GENERAL_CONFIG, JWT_CONFIG, MAIL_CONFIG } from 'src/common/config';
import { EmailTemplateName, EmailType } from 'src/common/constants';
import { ErrorCode } from 'src/common/constants/error-code';

export interface MailPayload {
  email: string;
  type: EmailType;
}

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly jwtService: JwtService) {
    sgMail.setApiKey(MAIL_CONFIG.API_KEY);
  }

  private async sendEmailWithTemplate<T>({
    to,
    subject,
    templateName,
    context,
  }: {
    to: string | string[];
    subject: string;
    templateName: EmailTemplateName;
    context: T;
  }) {
    const template = await this.getTemplate(templateName);
    const htmlContent = this.getHtmlContent(template, context);

    const msg = {
      to,
      from: MAIL_CONFIG.SENDER,
      subject,
      html: htmlContent,
    };

    try {
      await sgMail.send(msg);
    } catch (err) {
      this.logger.error(err);
      throw new Error(ErrorCode.SEND_EMAIL_FAILED);
    }
  }

  private getTemplatePath(templateName: EmailTemplateName) {
    return path.resolve(MAIL_CONFIG.TEMPLATE_PATH, `${templateName}.hbs`);
  }

  private async getTemplate(templateName: EmailTemplateName) {
    const templatePath = this.getTemplatePath(templateName);

    try {
      const templateSource = await fs.promises.readFile(templatePath, 'utf8');
      return Handlebars.compile(templateSource);
    } catch (err) {
      this.logger.error(err);
      throw new Error(ErrorCode.LOAD_TEMPLATE_FAILED);
    }
  }

  private getHtmlContent<T>(
    template: HandlebarsTemplateDelegate<T>,
    context: T,
  ) {
    try {
      return template(context);
    } catch (err) {
      this.logger.error(err);
      throw new Error(ErrorCode.RENDER_TEMPLATE_FAILED);
    }
  }

  async sendCompleteRegisterEmail(email: string) {
    const payload: MailPayload = { email, type: EmailType.COMPLETE_REGISTER };
    const token = await this.jwtService.signAsync(payload, {
      secret: JWT_CONFIG.MAIL_SECRET,
      expiresIn: JWT_CONFIG.MAIL_EXPIRE_IN,
    });

    const verificationUrl = `${GENERAL_CONFIG.CLIENT_URL}/auth/complete-register?token=${token}`;

    await this.sendEmailWithTemplate({
      to: email,
      subject: 'Complete your registration',
      templateName: EmailTemplateName.COMPLETE_REGISTER,
      context: {
        verificationUrl,
      },
    });
  }
}
