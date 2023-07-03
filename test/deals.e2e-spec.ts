import { INestApplication } from '@nestjs/common';
import { DealCreateRequest, DealUpdateRequest } from '@protogen/deal/deal';
import { DealsController } from '../src/modules/deals/deals.controller';
import prisma from './client';
import { deals } from './fixtures/deals';
import { applyFixtures } from './utils/applyFixtures';

describe('DealController (e2e)', () => {
  let app: INestApplication;
  let controller: DealsController;

  beforeEach(async () => {
    app = (global as any).app;
    controller = app.get<DealsController>(DealsController);

    await applyFixtures(deals, prisma.deal);
  });

  it('gets list of deals', async () => {
    const response = await controller.list({ options: undefined });

    expect(response.count).toEqual(3);

    const results = response.results;
    const count = response.count;

    expect(count).toEqual(3);

    expect(results[0].guid).toEqual('66e33c1b-938a-497b-89db-56532322ac49');
    expect(results[0].title).toEqual('First deal');
    expect(results[0].description).toEqual('This is the first test deal!');

    expect(results[1].guid).toEqual('9c3feb28-1438-456e-be4f-d6edabebb3d2');
    expect(results[1].title).toEqual('Second deal title');
    expect(results[1].description).toEqual('This is the second test deal!');

    expect(results[2].guid).toEqual('039b06f5-e1e8-48f4-8de9-4f88da9e07df');
    expect(results[2].title).toEqual('Third deal title');
    expect(results[2].description).toEqual('This is the third test deal!');
  });

  it('gets one deal', async () => {
    const response = await controller.detail({
      guid: '66e33c1b-938a-497b-89db-56532322ac50',
    });

    const result = response.result;

    expect(result.guid).toEqual('66e33c1b-938a-497b-89db-56532322ac50');
    expect(result.title).toEqual('Second deal title');
    expect(result.description).toEqual('This is the second test deal!');
  });

  it('creates one deal', async () => {
    const deal: DealCreateRequest = {
      title: 'Title for created deal',
      description: 'Text for created deal',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      owner: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      bids: [
        {
          bid: '1000',
          userId: '66e33c1b-938a-497b-89db-56532322ac11',
          order: '1',
        },
      ],
      reviews: [
        {
          review: 'good',
          userId: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      category: {
        guid: '66e33c1b-938a-497b-89db-56532322ac22',
        title: 'category',
        description: 'category description',
        parentId: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
    };

    const response = await controller.create(deal);

    expect(response.result.guid).toBeDefined();
    expect(response.result.title).toEqual(deal.title);
    expect(response.result.description).toEqual(deal.description);
  });

  it('updates one deal', async () => {
    const updatedDeal: DealUpdateRequest = {
      guid: '66e33c1b-938a-497b-89db-56532322ac51',
      title: 'Title for updated deal',
      description: 'Text for updated deal',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      owner: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      bids: [
        {
          bid: '1000',
          userId: '66e33c1b-938a-497b-89db-56532322ac11',
          order: '1',
        },
      ],
      reviews: [
        {
          review: 'good',
          userId: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      category: {
        guid: '66e33c1b-938a-497b-89db-56532322ac22',
        title: 'category',
        description: 'category description',
        parentId: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
    };

    const response = await controller.update(updatedDeal);

    const result = response.result;

    expect(result.guid).toEqual(updatedDeal.guid);
    expect(result.title).toEqual(updatedDeal.title);
    expect(result.description).toEqual(updatedDeal.description);

    const detailResponse = await controller.detail({
      guid: updatedDeal.guid,
    });

    const detailResult = detailResponse.result;

    expect(detailResult.guid).toEqual(updatedDeal.guid);
    expect(detailResult.title).toEqual(updatedDeal.title);
    expect(detailResult.description).toEqual(updatedDeal.description);
  });

  it('errors. Creating one deal without title', async () => {
    const deal: DealCreateRequest = {
      title: null,
      description: 'Text for created deal',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      owner: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      bids: [
        {
          bid: '1000',
          userId: '66e33c1b-938a-497b-89db-56532322ac11',
          order: '1',
        },
      ],
      reviews: [
        {
          review: 'good',
          userId: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      category: {
        guid: '66e33c1b-938a-497b-89db-56532322ac22',
        title: 'category',
        description: 'category description',
        parentId: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
    };

    try {
      await controller.create(deal);
    } catch (error) {
      expect(error.error.fieldErrors[0].location[0]).toEqual('title');
    }
  });
});
