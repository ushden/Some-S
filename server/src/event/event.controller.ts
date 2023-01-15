import {Controller, Inject} from '@nestjs/common';
import {EventService} from './event.service';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {Event} from "./entities/event.entity";

@Controller(Resource.Event)
export class EventController extends BaseController<Event>(Event, Service.Events){
  constructor(@Inject(Service.Events) private readonly eventService: EventService) {
    super()
  }
}
