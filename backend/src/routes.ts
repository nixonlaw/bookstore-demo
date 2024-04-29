import { Express, Request, Response } from "express";
import { login, getUser, updateUser, logout } from "../controller/UserController";
import loginCheck from "../middleware/loginCheck";
import bodyParser from "body-parser";
import { listBooks } from "../controller/BookController";
import { placeOrder, cancelOrder, listOrders } from "../controller/OrderController";

export default function route(app: Express){
    app.use(bodyParser.json());

    app.get('/user', [loginCheck], async (req: Request, res: Response)=>await getUser(req,res));
    app.put('/user', [loginCheck], async (req: Request, res: Response)=>await updateUser(req,res));
    app.get('/user/session', async (req: Request, res: Response)=>res.status(200).send({message: 'logged in'}));
    app.post('/user/login', async (req: Request, res: Response)=>await login(req,res));
    app.post('/user/logout', async (req: Request, res: Response)=>await logout(req,res));

    app.post('/book/list', async (req: Request, res: Response)=>await listBooks(req,res));

    app.get('/orders',[loginCheck], async (req: Request, res: Response)=>await listOrders(req,res));
    app.post('/orders',[loginCheck], async (req: Request, res: Response)=>await placeOrder(req,res));
    app.put('/orders/cancel/:_id',[loginCheck], async (req: Request, res: Response)=>await cancelOrder(req,res));
}