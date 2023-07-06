import { Prisma } from '@prisma/generated';

export const deals: Prisma.DealCreateInput[] = [
  {
    guid: '66e33c1b-938a-497b-89db-56532322ac49',
    title: 'First deal',
    description: 'This is the first test deal!',
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
  },
  {
    guid: '66e33c1b-938a-497b-89db-56532322ac50',
    title: 'Second deal',
    description: 'This is the second test deal!',
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
  },
  {
    guid: '66e33c1b-938a-497b-89db-56532322ac51',
    title: 'Third deal',
    description: 'This is the third test deal!',
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
  },
];
