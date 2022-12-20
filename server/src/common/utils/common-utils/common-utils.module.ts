import {Module} from '@nestjs/common';

import {Service} from '@enums';
import {CommonUtilsService} from './common-utils.service';

@Module({
  providers: [
    {
      provide: Service.CommonUtils,
      useClass: CommonUtilsService,
    },
  ],
  exports: [Service.CommonUtils],
})
export class CommonUtilsModule {
}
