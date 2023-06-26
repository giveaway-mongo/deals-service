import { generateCommonProtoPaths } from '@common/utils/proto-paths';
import { join } from 'path';

const paths = ['common/common.proto', 'deal/deal.proto', 'deal/service.proto'];

export const protoPath = generateCommonProtoPaths(
  join(process.cwd(), 'protos'),
  paths,
);
