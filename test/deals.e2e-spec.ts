import { INestApplication } from '@nestjs/common';
import { DealCreateRequest, DealUpdateRequest } from '@protogen/deal/deal';
import { DealsController } from '@src/modules/deals/deals.controller';
import prisma from './client';
import { category } from './fixtures/category';
import { deals } from './fixtures/deals';
import { users } from './fixtures/users';
import { applyFixtures } from './utils/applyFixtures';
import { Category } from '@protogen/broker/category/category';

describe('DealController (e2e)', () => {
  let app: INestApplication;
  let controller: DealsController;

  beforeEach(async () => {
    app = (global as any).app;
    controller = app.get<DealsController>(DealsController);

    await applyFixtures(deals, prisma.deal);
    await applyFixtures(users, prisma.user);
    await applyFixtures(category, prisma.category);
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
      console.log(e);
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
      title: 'First deal',
      description: 'This is the first test deal!',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        guid: '77e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      buyer: {
        guid: '81e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      bids: [
        {
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          bid: '1000',
          dateOfBid: 'Tue Jun 27 2023 12:20:01 GMT+0500',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: [
        {
          guid: '71e33c1b-938a-497b-89db-56532322ac49',
          fullName: 'Ivan',
          phoneNumber: '375293333333',
          email: 'user@mail.ru',
          bidsAvailable: 0,
          isActive: true,
          isDeleted: false,
          role: 'user',
          avatarUrl: '',
        },
      ],
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
      guid: '66e33c1b-938a-497b-89db-56532322ac49',
      title: 'First deal',
      description: 'This is the first test deal!',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        guid: '77e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      buyer: {
        guid: '81e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      bids: [
        {
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          bid: '1000',
          dateOfBid: 'Tue Jun 27 2023 12:20:01 GMT+0500',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: [
        {
          guid: '71e33c1b-938a-497b-89db-56532322ac49',
          fullName: 'Ivan',
          phoneNumber: '375293333333',
          email: 'user@mail.ru',
          bidsAvailable: 0,
          isActive: true,
          isDeleted: false,
          role: 'user',
          avatarUrl: '',
        },
      ],
      category: {
        guid: '66e33c1b-938a-497b-89db-56532322ac22',
        title: 'category',
        description: 'category description',
        parentGuid: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
      userGuid: '77e33c1b-938a-497b-89db-56532322ac49',
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
      description: 'This is the first test deal!',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        guid: '77e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      buyer: {
        guid: '81e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      bids: [
        {
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          bid: '1000',
          dateOfBid: 'Tue Jun 27 2023 12:20:01 GMT+0500',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: [
        {
          guid: '71e33c1b-938a-497b-89db-56532322ac49',
          fullName: 'Ivan',
          phoneNumber: '375293333333',
          email: 'user@mail.ru',
          bidsAvailable: 0,
          isActive: true,
          isDeleted: false,
          role: 'user',
          avatarUrl: '',
        },
      ],
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

  it('errors. error on update deal if user is not owner of the deal', async () => {
    const updatedDeal: DealUpdateRequest = {
      guid: '66e33c1b-938a-497b-89db-56532322ac49',
      title: 'First deal',
      description: 'This is the first test deal!',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        guid: '77e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      buyer: {
        guid: '81e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      bids: [
        {
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          bid: '1000',
          dateOfBid: 'Tue Jun 27 2023 12:20:01 GMT+0500',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: [
        {
          guid: '71e33c1b-938a-497b-89db-56532322ac49',
          fullName: 'Ivan',
          phoneNumber: '375293333333',
          email: 'user@mail.ru',
          bidsAvailable: 0,
          isActive: true,
          isDeleted: false,
          role: 'user',
          avatarUrl: '',
        },
      ],
      category: {
        guid: '66e33c1b-938a-497b-89db-56532322ac22',
        title: 'category',
        description: 'category description',
        parentGuid: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
      userGuid: '77e33c1b-938a-497b-89db-56532322ac51',
    };

    try {
      await controller.update(updatedDeal);
    } catch (error) {
      expect(error.message).toEqual('Permission denied');
    }
  });

  it('update deal if user is admin', async () => {
    const updatedDeal: DealUpdateRequest = {
      guid: '66e33c1b-938a-497b-89db-56532322ac49',
      title: 'First deal',
      description: 'This is the first test deal!',
      contactMethod: 'chat',
      activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      type: 'auction',
      status: 'active',
      author: {
        guid: '77e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      buyer: {
        guid: '81e33c1b-938a-497b-89db-56532322ac49',
        fullName: 'Ivan',
        phoneNumber: '375293333333',
        email: 'user@mail.ru',
        bidsAvailable: 0,
        isActive: true,
        isDeleted: false,
        role: 'user',
        avatarUrl: '',
      },
      bids: [
        {
          userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
          bid: '1000',
          dateOfBid: 'Tue Jun 27 2023 12:20:01 GMT+0500',
        },
      ],
      reviews: [
        {
          review: 'good',
          userGuid: '66e33c1b-938a-497b-89db-56532322ac49',
        },
      ],
      reportedBy: [
        {
          guid: '71e33c1b-938a-497b-89db-56532322ac49',
          fullName: 'Ivan',
          phoneNumber: '375293333333',
          email: 'user@mail.ru',
          bidsAvailable: 0,
          isActive: true,
          isDeleted: false,
          role: 'user',
          avatarUrl: '',
        },
      ],
      category: {
        guid: '66e33c1b-938a-497b-89db-56532322ac22',
        title: 'category',
        description: 'category description',
        parentGuid: '66e33c1b-938a-497b-89db-56532322ac33',
      },
      photos: [''],
      userGuid: '77e33c1b-938a-497b-89db-56532322ac50',
    };

    try {
      await controller.update(updatedDeal);
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('add new user', async () => {
    const newUser = {
      guid: '77e33c1b-938a-497b-89db-56532322ac99',
      fullName: 'Ivan Ivanov',
      phoneNumber: '375293333333',
      email: 'user@mail.ru',
      bidsAvailable: 0,
      isActive: true,
      isDeleted: false,
      role: 'user',
      avatarUrl: '',
      createdAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      updatedAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
    };

    try {
      const result = await controller.addUserConsumer(newUser);
      expect(result.guid).toBeDefined();
      expect(result.fullName).toEqual(newUser.fullName);
      expect(result.phoneNumber).toEqual(newUser.phoneNumber);
      expect(result.email).toEqual(newUser.email);
      expect(result.bidsAvailable).toEqual(newUser.bidsAvailable);
      expect(result.isActive).toEqual(newUser.isActive);
      expect(result.isDeleted).toEqual(newUser.isDeleted);
      expect(result.role).toEqual(newUser.role);
      expect(result.avatarUrl).toEqual(newUser.avatarUrl);
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('update user', async () => {
    const updatedUser = {
      guid: '77e33c1b-938a-497b-89db-56532322ac51',
      fullName: 'John Ivanov',
      phoneNumber: '1111111111',
      email: 'john@mail.ru',
      bidsAvailable: 3,
      isActive: true,
      isDeleted: false,
      role: 'user',
      avatarUrl: '',
      createdAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      updatedAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
    };

    try {
      await controller.updateUserConsumer(updatedUser);
      const result = await prisma.user.findUniqueOrThrow({
        where: {
          guid: updatedUser.guid,
        },
      });
      expect(result.guid).toBeDefined();
      expect(result.fullName).toEqual(updatedUser.fullName);
      expect(result.phoneNumber).toEqual(updatedUser.phoneNumber);
      expect(result.email).toEqual(updatedUser.email);
      expect(result.bidsAvailable).toEqual(updatedUser.bidsAvailable);
      expect(result.isActive).toEqual(updatedUser.isActive);
      expect(result.isDeleted).toEqual(updatedUser.isDeleted);
      expect(result.role).toEqual(updatedUser.role);
      expect(result.avatarUrl).toEqual(updatedUser.avatarUrl);
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('add new category', async () => {
    const newCategory: Category = {
      guid: '77e33c1b-938a-497b-89db-56532322ac99',
      title: 'new category',
      description: 'new category',
      parentGuid: '77e33c1b-938a-497b-89db-56532322ac51',
      createdAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      updatedAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
    };

    try {
      const result = await controller.addCategoryConsumer(newCategory);
      expect(result.guid).toBeDefined();
      expect(result.title).toEqual(newCategory.title);
      expect(result.description).toEqual(newCategory.description);
      expect(result.parentGuid).toEqual(newCategory.parentGuid);
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });

  it('update category', async () => {
    const updatedCategory: Category = {
      guid: '77e33c1b-938a-497b-89db-56532322ac51',
      title: 'updated category',
      description: 'updated category',
      parentGuid: null,
      createdAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
      updatedAt: 'Tue Jun 27 2023 12:20:01 GMT+0500',
    };

    try {
      await controller.updateCategoryConsumer(updatedCategory);
      const result = await prisma.category.findUniqueOrThrow({
        where: {
          guid: updatedCategory.guid,
        },
      });

      expect(result.guid).toEqual(updatedCategory.guid);
      expect(result.title).toEqual(updatedCategory.title);
      expect(result.description).toEqual(updatedCategory.description);
      expect(result.parentGuid).toEqual(updatedCategory.parentGuid);
    } catch (e) {
      expect(e).not.toBeDefined();
    }
  });
});
