import {Injectable} from '@nestjs/common';
import {CreateEventDto} from './dto/create-event.dto';
import {UpdateEventDto} from './dto/update-event.dto';
import {BaseService, IBaseService} from "../base/base.service";
import {Event} from "./entities/event.entity";

interface IEventService extends IBaseService<Event> {

}
@Injectable()
export class EventService extends BaseService<Event>(Event) implements IEventService {
}
