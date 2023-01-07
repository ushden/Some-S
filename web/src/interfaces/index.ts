import {Dayjs} from "dayjs";

export interface IEvent {
  id?: string;
  start: number;
  end: number;
  created: number;
  price: number;
  services: Array<IService>;
  createdAt?: string;
  updatedAt?: string;
  meta?: any;
  masterId: number;
  customerId: number;
  status: string;
  master?: {name: string, id: number};
  customer?: {name: string, id: number};
}

export interface IService {
  id: number;
  name: string;
  price: number;
  leadTime: number;
}

export interface ICreateEvent {
  master: string | number;
  services: any;
  date: Dayjs;
  time: number | null;
}
