import { WithError } from '@common/types/utils';
import { generateGuid } from '@common/utils/generate-guid';
import { getListOptions } from '@common/utils/list-params';
import { Inject, Injectable } from '@nestjs/common';
import { ClientRMQ, RpcException } from '@nestjs/microservices';
import { Deal, Prisma } from '@prisma/generated';
import {
  Category,
  DealCreateRequest,
  DealListRequest,
  DealUpdateRequest,
  User,
} from '@protogen/deal/deal';
import { dateToString } from '@src/common/utils/dateToString';
import { PrismaService } from '@src/prisma/prisma.service';
import { CategoryEvent, DealEvent, UserEvent } from './dto/broker.dto';
import { getErrors, getFieldErrors } from '@common/utils/error';
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  ERROR_TYPES,
} from '@common/constants/error';

@Injectable()
export class DealsService {
  constructor(
    private prisma: PrismaService,
    @Inject('deals-service') private client: ClientRMQ,
  ) {}

  async create(
    deal: DealCreateRequest,
  ): Promise<WithError<{ result: DealEvent }>> {
    //TODO: 1. check if contact method is "phone and chat" then user must have phoneNumber field
    // 2. activeUntil = null if type = firstBidder
    // 3. activeUntil should be >= 1 day
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
      type: deal.type,
      bids: deal.bids,
      title: deal.title,
      category: deal.category,
      activeUntil: deal.activeUntil,
      contactMethod: deal.contactMethod,
      description: deal.description,
      author: deal.author,
      buyer: deal.buyer,
      photos: deal.photos,
      reportedBy: deal.reportedBy,
      reviews: deal.reviews,
      status: deal.status,
    };

    const result = await this.prisma.deal.create({
      data: dealToCreate,
    });

    const { createdAt, updatedAt } = dateToString(result);

    this.client.emit<string, DealEvent>('deal.deal.add', {
      guid: generateGuid(),
      type: result.type,
      bids: result.bids,
      title: result.title,
      category: result.category,
      activeUntil: result.activeUntil,
      contactMethod: result.contactMethod,
      description: result.description,
      author: result.author,
      buyer: result.buyer,
      photos: result.photos,
      reportedBy: result.reportedBy,
      reviews: result.reviews,
      status: result.status,
      updatedAt,
      createdAt,
    });

    return {
      result: { ...result, updatedAt, createdAt },
      errors: null,
    };
  }

  async update(
    guid: string,
    deal: DealUpdateRequest,
  ): Promise<WithError<{ result: DealEvent }>> {
    //TODO:  1. activeUntil = null if type = firstBidder
    // 2. activeUntil should be (if (current date - start date) >= duration).

    const { userGuid } = deal;
    let user: User;

    try {
      user = await this.prisma.user.findUniqueOrThrow({
        where: {
          guid: userGuid,
        },
      });
    } catch {
      throw new RpcException('User not found');
    }

    if (userGuid !== deal.author.guid && user.role !== 'admin') {
      throw new RpcException('Permission denied');
    }

    const result = await this.prisma.deal.update({
      data: {
        type: deal.type,
        bids: deal.bids,
        title: deal.title,
        category: deal.category,
        activeUntil: deal.activeUntil,
        contactMethod: deal.contactMethod,
        description: deal.description,
        author: deal.author,
        buyer: deal.buyer,
        photos: deal.photos,
        reportedBy: deal.reportedBy,
        reviews: deal.reviews,
        status: deal.status,
      },
      where: {
        guid,
      },
    });
    const { createdAt, updatedAt } = dateToString(result);

    this.client.emit<string, DealEvent>('deal.deal.change', {
      guid: generateGuid(),
      type: result.type,
      bids: result.bids,
      title: result.title,
      category: result.category,
      activeUntil: result.activeUntil,
      contactMethod: result.contactMethod,
      description: result.description,
      author: result.author,
      buyer: result.buyer,
      photos: result.photos,
      reportedBy: result.reportedBy,
      reviews: result.reviews,
      status: result.status,
      updatedAt,
      createdAt,
    });

    return { result: { ...result, updatedAt, createdAt }, errors: null };
  }

  async list(
    listRequest: DealListRequest,
  ): Promise<WithError<{ results: DealEvent[]; count: number }>> {
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

    const transformedResult = results.map((el) => dateToString(el));

    return { results: transformedResult, count, errors: null };
  }

  async detail({ guid }: Prisma.DealWhereUniqueInput): Promise<
    WithError<{
      result: DealEvent;
    }>
  > {
    const result = await this.prisma.deal.findUniqueOrThrow({
      where: {
        guid,
      },
    });

    return { result: dateToString(result), errors: null };
  }

  async addUser(data: UserEvent): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(data: UserEvent): Promise<void> {
    const { createdAt, updatedAt, ...restData } = data;

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          guid: data.guid,
        },
        data: {
          ...data,
        },
      }),

      this.prisma.deal.updateMany({
        where: {
          author: {
            is: {
              guid: data.guid,
            },
          },
        },
        data: {
          author: {
            set: {
              ...restData,
            },
          },
        },
      }),

      this.prisma.deal.updateMany({
        where: {
          buyer: {
            is: {
              guid: data.guid,
            },
          },
        },
        data: {
          buyer: {
            set: {
              ...restData,
            },
          },
        },
      }),

      this.prisma.deal.updateMany({
        data: {
          reportedBy: {
            updateMany: {
              where: {
                guid: data.guid,
              },
              data: {
                ...restData,
              },
            },
          },
        },
      }),
    ]);
  }

  async addCategory(data: CategoryEvent): Promise<Category> {
    return this.prisma.category.create({ data });
  }

  async updateCategory(data: CategoryEvent): Promise<void> {
    const { createdAt, updatedAt, ...restData } = data;

    await this.prisma.$transaction([
      this.prisma.category.update({
        where: {
          guid: data.guid,
        },
        data: {
          ...data,
        },
      }),

      this.prisma.deal.updateMany({
        where: {
          category: {
            is: {
              guid: data.guid,
            },
          },
        },
        data: {
          category: {
            set: {
              ...restData,
            },
          },
        },
      }),
    ]);
  }
}
