import { RequestQuerySubSource } from '@enums';
import type { QuerySource } from '@types';
export declare const QueryProcessing: <T>(source: QuerySource, subSource?: RequestQuerySubSource) => MethodDecorator & ClassDecorator;
