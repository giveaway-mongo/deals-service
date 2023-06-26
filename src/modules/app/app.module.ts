import { isTestEnvironment } from '@common/utils/environment';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DealsModule } from '../deals/deals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !isTestEnvironment() ? '.env' : '.env.test',
    }),
    DealsModule,
  ],
})
export class AppModule {}
