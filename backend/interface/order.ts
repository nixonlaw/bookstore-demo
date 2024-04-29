import { Document } from "mongoose";
import { IUser } from "./user";
import { IBook } from "./book";

export enum OrderStatus{
    Purchased = 'Purchased',
    Cancelled = 'Cancelled'
}

export interface IOrderItem extends IBook {
    quantity: number
}

export interface IOrder extends Document{
    buyer     : IUser,
    items     : IOrderItem[],
    totalPrice: number,
    status    : OrderStatus,
    createdAt : Date
    updatedAt : Date
}