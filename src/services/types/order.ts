import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants";

export interface IOrder {
  _id: string;
  ingredients: string[];
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export interface IOrderProps {
  order: {
    _id: string;
    number: number;
    name: string;
    status: string;
    createdAt: string;
    ingredients: string[];
  };
}

export interface IOrdersResponse {
  success: boolean;
  orders: IOrder[];
  total: number;
  totalToday: number;
}

interface CreateOrderRequestAction {
  type: typeof CREATE_ORDER_REQUEST;
}

interface CreateOrderSuccessAction {
  type: typeof CREATE_ORDER_SUCCESS;
  payload: { orderNumber: number };
}

interface CreateOrderFailureAction {
  type: typeof CREATE_ORDER_FAILURE;
  error: string;
}

export type OrderActionTypes = CreateOrderRequestAction | CreateOrderSuccessAction | CreateOrderFailureAction;
