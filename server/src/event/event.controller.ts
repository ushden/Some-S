import {Body, Controller, Inject, Post} from '@nestjs/common';
import {Resource, Service} from "@enums";
import {IEventService} from './event.service';
import {BaseController} from "../base/base.controller";
import {Event} from "./entities/event.entity";
import {CreateEventDto} from "./dto/create-event.dto";

@Controller(Resource.Event)
export class EventController extends BaseController<Event>(Event, Service.Events){
  constructor(@Inject(Service.Events) private readonly eventService: IEventService) {
    super()
  }
  
  @Post('create-with-notifications')
  public async createWithNotifications(@Body() event: CreateEventDto): Promise<Event> {
    return this.eventService.createWithNotifications(event);
  }
}
