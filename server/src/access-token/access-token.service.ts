import {Injectable} from '@nestjs/common';
import {BaseService, IBaseService} from '../base/base.service';
import {AccessToken} from './entities/access-token.entity';

export interface IAccessTokenService extends IBaseService<AccessToken> {}

@Injectable()
export class AccessTokenService extends BaseService<AccessToken>(AccessToken) implements IAccessTokenService {}
