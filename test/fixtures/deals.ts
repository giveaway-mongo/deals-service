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
    photos: ['src/test'],
  },
  {
    guid: '66e33c1b-938a-497b-89db-56532322ac50',
    title: 'Second deal',
    description: 'This is the second test deal!',
    contactMethod: 'chat',
    activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
    type: 'auction',
    status: 'active',
    author: {
      guid: '72e33c1b-938a-497b-89db-56532322ac49',
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
      guid: '82e33c1b-938a-497b-89db-56532322ac49',
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
        bid: '1000',
        userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
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
        guid: '73e33c1b-938a-497b-89db-56532322ac49',
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
    photos: ['src/test'],
  },
  {
    guid: '66e33c1b-938a-497b-89db-56532322ac51',
    title: 'Third deal',
    description: 'This is the third test deal!',
    contactMethod: 'chat',
    activeUntil: 'Tue Jun 27 2023 12:20:01 GMT+0500',
    type: 'auction',
    status: 'active',
    author: {
      guid: '74e33c1b-938a-497b-89db-56532322ac49',
      fullName: 'Ivan',
      phoneNumber: '375293333333',
      email: 'user@mail.ru',
      bidsAvailable: 0,
      isActive: true,
      isDeleted: false,
      role: 'user',
      avatarUrl: '',
    },
    buyer: null,
    bids: [
      {
        bid: '1000',
        userGuid: '66e33c1b-938a-497b-89db-56532322ac11',
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
        guid: '75e33c1b-938a-497b-89db-56532322ac49',
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
    photos: ['src/test'],
  },
];
