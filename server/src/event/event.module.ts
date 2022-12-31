import {Module} from '@nestjs/common';
import {EventService} from './event.service';
import {EventController} from './event.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {Event} from "./entities/event.entity";
import {Service} from "@enums";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Event]),
    UserModule,
  ],
  controllers: [EventController],
  providers: [{
    provide: Service.Events,
    useClass: EventService,
  }],
  exports: [Service.Events],
})
export class EventModule {
}
