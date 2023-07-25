import { CreateDealDto } from '@src/modules/deals/dto/create-deal.dto';
import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { ERROR_CODES, ERROR_TYPES } from '@common/constants/error';
import { getErrors } from '@common/utils/error';
import { RpcException } from '@nestjs/microservices';
import { dealWithoutTitle } from './mock/deal';

describe.skip('ValidationPipe', () => {
  let target: ValidationPipe;

  const transformMetadata: ArgumentMetadata = {
    type: 'body',
    metatype: CreateDealDto,
    data: '',
  };

  beforeEach(async () => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
      validationError: {
        target: false,
        value: false,
      },
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          location: [error.property],
          message: error.constraints[Object.keys(error.constraints)[0]],
          type: ERROR_TYPES.INVALID,
        }));

        const errorResponse = getErrors({
          fieldErrors: result,
          errorCode: ERROR_CODES.BAD_REQUEST,
        });
        return new RpcException(errorResponse);
      },
    });
  });

  it('errors. Creating one deal without title', async () => {
    await target.transform(dealWithoutTitle, transformMetadata).catch((err) => {
      expect(err.error.fieldErrors[0].message).toEqual(
        'title must be a string',
      );
    });
  });
});
