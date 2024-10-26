import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GENERAL_CONFIG } from './common/config';
import { UserModule } from './modules/domains/user/user.module';

@Module({
  imports: [MongooseModule.forRoot(GENERAL_CONFIG.MONGODB_URI), UserModule],
})
export class AppModule {}
