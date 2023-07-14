import { Prisma } from '@prisma/generated';

export const users: Prisma.UserCreateInput[] = [
  {
    guid: '77e33c1b-938a-497b-89db-56532322ac51',
    fullName: 'Ivan Ivanov',
    phoneNumber: '375293333333',
    email: 'user@mail.ru',
    bidsAvailable: 0,
    isActive: true,
    isDeleted: false,
    role: 'user',
    avatarUrl: '',
  },
  {
    guid: '77e33c1b-938a-497b-89db-56532322ac50',
    fullName: 'Misha Ivanov',
    phoneNumber: '375293333332',
    email: 'admin@mail.ru',
    bidsAvailable: 0,
    isActive: true,
    isDeleted: false,
    role: 'admin',
    avatarUrl: '',
  },
  {
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
];
