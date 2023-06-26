import { Controller } from '@nestjs/common';
import { DealsService } from './deals.service';
import {
  Ctx,
  EventPattern,
  GrpcMethod,
  Payload,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

import {
  DealCreateRequest,
  DealCreateResponse,
  DealDetailRequest,
  DealDetailResponse,
  DealListRequest,
  DealListResponse,
  DealUpdateRequest,
  DealUpdateResponse,
} from '@protogen/deal/deal';
import { UserEvent } from './dto/broker.dto';

@Controller()
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @GrpcMethod('DealsService', 'CreateDeal')
  async create(
    dealCreateRequest: DealCreateRequest,
  ): Promise<DealCreateResponse> {
    const { result, errors } = await this.dealsService.create(
      dealCreateRequest,
    );

    return { result, errors };
  }

  @GrpcMethod('DealsService', 'UpdateDeal')
  async update(
    dealUpdateRequest: DealUpdateRequest,
  ): Promise<DealUpdateResponse> {
    const guid = dealUpdateRequest.guid;

    const { result, errors } = await this.dealsService.update(
      guid,
      dealUpdateRequest,
    );

    return { result, errors };
  }

  @GrpcMethod('DealsService', 'ListDeal')
  async list(listRequest: DealListRequest): Promise<DealListResponse> {
    const { results, count, errors } = await this.dealsService.list(
      listRequest,
    );

    return { results, count, errors };
  }

  @GrpcMethod('DealsService', 'DetailDeal')
  async detail({ guid }: DealDetailRequest): Promise<DealDetailResponse> {
    const { result, errors } = await this.dealsService.detail({ guid });

    return { result, errors };
  }

  @EventPattern('user.user.add', Transport.RMQ)
  async dealConsumer(@Payload() data: UserEvent, @Ctx() context: RmqContext) {
    console.log(
      data,
      context.getPattern(),
      context.getPattern(),
      context.getMessage(),
    );
  }
}
