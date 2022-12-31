export interface IEvent {
  id: string;
  start: string;
  end: string;
  created: string;
  createdAt: string;
  updatedAt: string;
  meta: object;
  masterId: number;
  customerId: number;
  status: string;
  master: { name: string };
  customer: { name: string };
}

export interface IService {
  id: number;
  name: string;
  price: number;
}
