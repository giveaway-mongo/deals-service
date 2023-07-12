import { Controller } from '@nestjs/common';
import {
  EventPattern,
  GrpcMethod,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { DealsService } from './deals.service';

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
import { CategoryEvent, UserEvent } from './dto/broker.dto';

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
  async addUserConsumer(@Payload() data: UserEvent) {
    this.dealsService.addUser(data);
  }

  @EventPattern('user.user.update', Transport.RMQ)
  async updateUserConsumer(@Payload() data: UserEvent) {
    this.dealsService.updateUser(data);
  }

  @EventPattern('category.category.add', Transport.RMQ)
  async addCategoryConsumer(@Payload() data: CategoryEvent) {
    this.dealsService.addCategory(data);
  }

  @EventPattern('category.category.update', Transport.RMQ)
  async updateCategoryConsumer(@Payload() data: CategoryEvent) {
    this.dealsService.updateCategory(data);
  }
}
