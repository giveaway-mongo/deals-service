import { Prisma } from '@prisma/generated';

export const category: Prisma.CategoryCreateInput[] = [
  {
    guid: '77e33c1b-938a-497b-89db-56532322ac51',
    title: 'category 1',
    description: 'category description',
    parentGuid: null,
  },
];
