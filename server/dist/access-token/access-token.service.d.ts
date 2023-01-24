import { IBaseService } from '../base/base.service';
import { AccessToken } from './entities/access-token.entity';
export interface IAccessTokenService extends IBaseService<AccessToken> {
}
declare const AccessTokenService_base: import("@nestjs/common").Type<IBaseService<AccessToken>>;
export declare class AccessTokenService extends AccessTokenService_base implements IAccessTokenService {
}
export {};
