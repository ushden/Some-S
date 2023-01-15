import {Controller, Inject} from '@nestjs/common';
import {AccessTokenService} from './access-token.service';
import {Resource, Service} from '@enums';
import {BaseController} from '../base/base.controller';
import {AccessToken} from './entities/access-token.entity';

@Controller(Resource.Token)
export class AccessTokenController extends BaseController<AccessToken>(AccessToken, Service.Token) {
  constructor(@Inject(Service.Token) private readonly accessTokenService: AccessTokenService) {
    super();
  }
}
