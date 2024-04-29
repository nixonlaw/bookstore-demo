import { model, Schema, Types }  from 'mongoose';
import { IOrder, IOrderItem, OrderStatus } from '../interface/order';
import { IUser } from '../interface/user';
import { isEmpty } from 'lodash';

const OrderSchema = new Schema({
    buyer        : Object,
    items        : [Object],
    totalPrice   : Number,
    status       : {type: String, enum: OrderStatus, default: OrderStatus.Purchased},
    createdAt    : Date,
    updatedAt    : Date
}, {
    timestamps   : {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});

const OrderModel = model<IOrder>('orders', OrderSchema);

export const createOrder = async (buyer: IUser, items: IOrderItem[]) => {
    try {
        if(isEmpty(items)){
            throw new Error('empty item');
        }
    
        const totalPrice = items.reduce((prev, {price,quantity})=>prev+(price*quantity),0);

        const newOrder = await new OrderModel({buyer, items, totalPrice}).save();

        return newOrder;
        
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const cancelOneOrder = async (_id: string) => {
    try {
        return await OrderModel.updateOne({_id}, {$set: {status: OrderStatus.Cancelled}});
    } catch (e) {
        console.error(e);
        return null;
    }
}

export const listOrdersForBuyer = async (buyer: IUser) => {
    try{
        return await OrderModel.find({'buyer._id': buyer._id}).sort({createdAt: -1}).lean(); 
    } catch(e) {
        console.error(e);
        return null;
    }
}