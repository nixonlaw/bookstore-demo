import {connect, set} from "mongoose";

export async function initDataBaseConnection() {
    try{
        // set('debug',true)
        await connect(process.env.MONGODB_CONNECTION || "mongodb://127.0.0.1:27017/bookstore");
    }catch(e){ 
        console.error(e)
    }
}