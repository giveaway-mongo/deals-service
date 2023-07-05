import {
  ERROR_CODES,
  ERROR_MESSAGES,
  ERROR_TYPES,
} from '@common/constants/error';
import { WithError } from '@common/types/utils';
import { getErrors, getFieldErrors } from '@common/utils/error';
import { generateGuid } from '@common/utils/generate-guid';
import { getListOptions } from '@common/utils/list-params';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { Deal, Prisma } from '@prisma/generated';
import {
  DealCreateRequest,
  DealListRequest,
  DealUpdateRequest,
} from '@protogen/deal/deal';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(
    private prisma: PrismaService,
    @Inject('deals-service') private client: ClientRMQ,
  ) {}

  async create(deal: DealCreateRequest): Promise<WithError<{ result: Deal }>> {
    let fieldErrors = [];

    if (!deal.title) {
      fieldErrors = getFieldErrors(
        [
          {
            location: ['title'],
            message: ERROR_MESSAGES.EMPTY,
            type: ERROR_TYPES.EMPTY,
          },
        ],
        fieldErrors,
      );
    }

    if (fieldErrors.length) {
      throw new RpcException(
        getErrors({ fieldErrors, errorCode: ERROR_CODES.BAD_REQUEST }),
      );
    }

    const dealToCreate: Prisma.DealCreateInput = {
      guid: generateGuid(),
      ...deal,
    };

    const result = await this.prisma.deal.create({
      data: dealToCreate,
    });

    return { result, errors: null };
  }

  async update(
    guid: string,
    deal: DealUpdateRequest,
  ): Promise<WithError<{ result: Deal }>> {
    if (!guid) {
      // Error without any fields. NonFieldError example
      // look into rpc-exception.filter.ts file. There is RpcExceptionFilter,
      // which handles all RpcException objects
      throw new RpcException('No guid is provided.');
    }

    const result = await this.prisma.deal.update({
      data: deal,
      where: {
        guid,
      },
    });

    return { result, errors: null };
  }

  async list(
    listRequest: DealListRequest,
  ): Promise<WithError<{ results: Deal[]; count: number }>> {
    const { skip, orderBy, where, take } = getListOptions<
      Prisma.DealWhereInput,
      Prisma.DealOrderByWithRelationInput
    >(listRequest.options);

    const [count, results] = await this.prisma.$transaction([
      this.prisma.deal.count(),
      this.prisma.deal.findMany({
        skip,
        orderBy,
        where,
        take,
      }),
    ]);

    return { results, count, errors: null };
  }

  async detail({ guid }: Prisma.DealWhereUniqueInput): Promise<
    WithError<{
      result: Deal;
    }>
  > {
    const result = await this.prisma.deal.findUniqueOrThrow({
      where: {
        guid,
      },
    });

    return { result, errors: null };
  }
}
