import { Module } from '@nestjs/common';
import { AccessTokenService } from './access-token.service';
import { AccessTokenController } from './access-token.controller';
import {Service} from "@enums";
import {SequelizeModule} from "@nestjs/sequelize";
import {AccessToken} from "./entities/access-token.entity";

@Module({
  imports: [SequelizeModule.forFeature([AccessToken])],
  controllers: [AccessTokenController],
  providers: [{
    provide: Service.Token,
    useClass: AccessTokenService,
  }],
  exports: [Service.Token],
})
export class AccessTokenModule {}
