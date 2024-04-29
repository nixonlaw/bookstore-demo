import { Request, Response } from "express";
import { cancelOneOrder, createOrder, listOrdersForBuyer } from "../model/orders";
import { IUser } from "../interface/user";

export const listOrders = async (req: Request, res: Response) => {
    const buyer = <IUser>req.session.user;
    const orders = await listOrdersForBuyer(buyer);
    if(!orders){
        return res.status(500).send({message: 'Internal error'});
    }else{
        return res.status(200).send({message: orders});
    }
}

export const placeOrder = async (req: Request, res: Response) => {
    const items = req.body;
    const newOrder = await createOrder(<IUser>req.session.user, items);
    if(!newOrder){
        return res.status(500).send({message: 'Internal error'});
    }else{
        return res.status(200).send({message: newOrder});
    }
}

export const cancelOrder = async (req: Request, res: Response) => {
    const {_id} = req.params;

    const cancel = await cancelOneOrder(_id);

    if(!cancel){
        return res.status(500).send({message: 'Internal error'});
    }else{
        return res.status(200).send({message: 'Cancelled'});
    }
}
