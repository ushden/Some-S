import {Controller, Get, Inject} from '@nestjs/common';
import {IAppService} from './app.service';
import {Service} from "@enums";

@Controller()
export class AppController {
  constructor(@Inject(Service.App) private readonly appService: IAppService) {}
}
