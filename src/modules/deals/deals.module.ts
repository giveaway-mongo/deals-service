import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { getRabbitMQOptions } from '@src/common/rabbitMQ/rabbitMQ-options';
import { PrismaModule } from '@src/prisma/prisma.module';
import { DealsController } from './deals.controller';
import { DealsService } from './deals.service';

@Module({
  controllers: [DealsController],
  providers: [DealsService],
  imports: [
    PrismaModule,
    ClientsModule.register([
      {
        name: 'deals-service',
        ...getRabbitMQOptions('new_queue'),
      },
    ]),
  ],
})
export class DealsModule {}
