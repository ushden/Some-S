import {Controller, Get, Post, Body, Patch, Param, Delete, Inject} from '@nestjs/common';
import {EventService} from './event.service';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {Resource, Service} from "@enums";
import {BaseController} from "../base/base.controller";
import {Event} from "./entities/event.entity";

@Controller(Resource.Event)
export class EventController extends BaseController<Event>(Event, Service.Events){
  constructor(@Inject(Service.Events) private readonly eventService: EventService) {
    super()
  }
}
