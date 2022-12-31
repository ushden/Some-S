import {applyDecorators, SetMetadata, UseInterceptors} from '@nestjs/common';

import {MetadataKey, RequestQuerySubSource} from '@enums';
import {IQueryProcessingOptions} from '@interfaces';
import {QueryProcessingInterceptor} from '@interceptors';
import type {QuerySource} from '@types';

export const QueryProcessing = <T>(
  source: QuerySource,
  subSource?: RequestQuerySubSource,
): MethodDecorator & ClassDecorator => {
  return applyDecorators(
    SetMetadata<MetadataKey, IQueryProcessingOptions>(MetadataKey.QueryProcessingOptions, {source, subSource}),
    UseInterceptors(QueryProcessingInterceptor<T>),
  );
};
