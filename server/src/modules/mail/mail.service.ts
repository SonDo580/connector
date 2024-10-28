import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import { MAIL_CONFIG } from 'src/common/config';
import { ErrorCode } from 'src/common/constants/error-code';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor() {
    sgMail.setApiKey(MAIL_CONFIG.API_KEY);
  }

  async sendEmailWithTemplate(
    to: string,
    subject: string,
    templateName: string,
    context: any,
  ) {
    const template = await this.getTemplate(templateName);
    const htmlContent = this.getHtmlContent(template, context);

    const msg = {
      to,
      from: process.env.MAIL_CONFIG_SENDER,
      subject,
      html: htmlContent,
    };

    await sgMail.send(msg);
  }

  private getTemplatePath(templateName: string) {
    return path.join(__dirname, 'templates', `${templateName}.hbs`);
  }

  private async getTemplate(templateName: string) {
    const templatePath = this.getTemplatePath(templateName);

    try {
      const templateSource = await fs.promises.readFile(templatePath, 'utf8');
      return Handlebars.compile(templateSource);
    } catch (err) {
      this.logger.error(err.message);
      throw new Error(ErrorCode.LOAD_TEMPLATE_FAILED);
    }
  }

  private getHtmlContent(
    template: HandlebarsTemplateDelegate<any>,
    context: any,
  ) {
    try {
      return template(context);
    } catch (err) {
      this.logger.error(err.message);
      throw new Error(ErrorCode.RENDER_TEMPLATE_FAILED);
    }
  }
}
