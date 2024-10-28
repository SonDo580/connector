import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_CONFIG } from './common/config';
import { UserModule } from './modules/domains/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_CONFIG.MONGODB_URI),
    UserModule,
    AuthModule,
    MailModule,
  ],
})
export class AppModule {}
