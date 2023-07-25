import {
  Bid,
  Category,
  DealCreateRequest,
  Review,
  User,
} from '@protogen/deal/deal';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ContactMethod, DealType, Status } from '@common/types/enums';

export class CreateDealDto implements DealCreateRequest {
  @MaxLength(64)
  @IsNotEmpty()
  @IsString()
  title: string;

  @Length(32, 512)
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsEnum(ContactMethod)
  contactMethod: string;

  @Validate((data) => new Date(data).valueOf())
  activeUntil: string;

  @IsEnum(DealType)
  type: string;

  @IsEnum(Status)
  status: string;

  @ValidateNested()
  author: User;

  @ValidateNested()
  buyer: User;

  @ValidateNested({ each: true })
  bids: Bid[];

  @ValidateNested({ each: true })
  reviews: Review[];

  @ValidateNested({ each: true })
  reportedBy: User[];

  @ValidateNested()
  category: Category;

  @ArrayNotEmpty()
  photos: string[];
}
