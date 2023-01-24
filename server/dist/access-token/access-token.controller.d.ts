import { AccessTokenService } from './access-token.service';
import { AccessToken } from './entities/access-token.entity';
declare const AccessTokenController_base: import("@nestjs/common").Type<import("../base/base.controller").IBaseController<AccessToken>>;
export declare class AccessTokenController extends AccessTokenController_base {
    private readonly accessTokenService;
    constructor(accessTokenService: AccessTokenService);
}
export {};
