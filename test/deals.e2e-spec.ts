import { INestApplication } from '@nestjs/common';
import { DealsController } from '@src/modules/deals/deals.controller';
import prisma from './client';
import { deals } from './fixtures/deals';
import { applyFixtures } from './utils/applyFixtures';
import { DealCreateRequest, DealUpdateRequest } from '@protogen/deal/deal';

describe('DealController (e2e)', () => {
  let app: INestApplication;
  let controller: DealsController;

  beforeEach(async () => {
    app = (global as any).app;
    controller = app.get<DealsController>(DealsController);

    await applyFixtures(deals, prisma.deal);
  });

  it('gets list of deals', async () => {
    try {
      const response = await controller.list({ options: undefined });

      expect(response.count).toEqual(3);

      const results = response.results;
      const count = response.count;

      expect(count).toEqual(3);

      expect(results[0].guid).toEqual('66e33c1b-938a-497b-89db-56532322ac49');
      expect(results[0].title).toEqual('First deal');
      expect(results[0].description).toEqual('This is the first test deal!');

      expect(results[1].guid).toEqual('66e33c1b-938a-497b-89db-56532322ac50');
      expect(results[1].title).toEqual('Second deal');
      expect(results[1].description).toEqual('This is the second test deal!');

      expect(results[2].guid).toEqual('66e33c1b-938a-497b-89db-56532322ac51');
      expect(results[2].title).toEqual('Third deal');
      expect(results[2].description).toEqual('This is the third test deal!');
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('gets one deal', async () => {
    try {
      const response = await controller.detail({
        guid: '66e33c1b-938a-497b-89db-56532322ac50',
      });

      const result = response.result;

      expect(result.guid).toEqual('66e33c1b-938a-497b-89db-56532322ac50');
      expect(result.title).toEqual('Second deal');
      expect(result.description).toEqual('This is the second test deal!');
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('creates one deal', async () => {
    const deal: DealCreateRequest = {
      title: 'Title for created deal',
      description: 'Text for created deal',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      bids: [
        {
          bid: '1000',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          order: '1',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
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
        parentGuid: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
    };

    try {
      const response = await controller.create(deal);

      expect(response.result.guid).toBeDefined();
      expect(response.result.title).toEqual(deal.title);
      expect(response.result.description).toEqual(deal.description);
    } catch (e) {
      expect(e).not.toBeDefined();
    }
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
      author: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      bids: [
        {
          bid: '1000',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          order: '1',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
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
        parentGuid: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
    };

    try {
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
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('errors. Creating one deal without title', async () => {
    const deal: DealCreateRequest = {
      title: null,
      description: 'Text for created deal',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        phoneNumber: '375293333333',
      },
      bids: [
        {
          bid: '1000',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          order: '1',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
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
        parentGuid: '66e33c1b-938a-497b-89db-56532322ac33',
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
