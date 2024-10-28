import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GENERAL_CONFIG } from './common/config';
import { UserModule } from './modules/domains/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(GENERAL_CONFIG.MONGODB_URI),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
