import {Injectable} from '@nestjs/common';
import {BaseService, IBaseService} from "../base/base.service";
import {Event} from "./entities/event.entity";

export interface IEventService extends IBaseService<Event> {

}
@Injectable()
export class EventService extends BaseService<Event>(Event) implements IEventService {
}
