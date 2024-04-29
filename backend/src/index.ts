import express, { Express } from "express";
import dotenv from "dotenv";
import cors from 'cors'
dotenv.config();

import {initDataBaseConnection} from '../config/database'
import route from './routes'
import session, {Session} from 'express-session'
import cookieParser from "cookie-parser";
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import { IUser } from "../interface/user";

interface CustomSession extends Session {
  user?: IUser; // Replace 'any' with the appropriate type for your user object
}

declare module 'express' {
  interface Request {
    session: CustomSession;
  }
}

const app: Express = express();
const port = process.env.PORT;
initDataBaseConnection();

const MongoDBStore = connectMongoDBSession(session);

app.use(
  session({
    secret: process.env.SESSION_SECRET || '',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
    },
    store: new MongoDBStore({
      uri: process.env.MONGODB_CONNECTION || '',
      collection: 'sessions'
    })
  })
);

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:8080'
}));

route(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;