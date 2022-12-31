import {createParamDecorator} from '@nestjs/common';
import {AllowedQueryService} from '@utils/query';

export const AllowedQuery = createParamDecorator(AllowedQueryService.allowedQueryFactory);
