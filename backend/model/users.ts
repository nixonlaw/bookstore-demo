import { model, Schema, Types }  from 'mongoose';
import { IUser } from '../interface/user';

const UserSchema = new Schema({
    username     : String, 
    name         : String, 
    phone        : String,
    password     : String,
    createdAt    : Date,
    updatedAt    : Date,
}, {
    timestamps   : {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});

const UserModel = model<IUser>('Users', UserSchema);

export const authUser = async (username: string, password: string): Promise<IUser|null> => {
    try{
        return await UserModel.findOne({username, password}).select(['_id', 'phone', 'name', 'username']).lean();
    }catch(e){
        console.error(e);
        return null;
    }
}

export const getUserById = async (_id: Types.ObjectId) => {
    try{
        return await UserModel.findOne({_id}).select(['_id', 'phone', 'name', 'username']).lean();
    }catch(e){
        console.error(e);
        return null;
    }
}

export const updateUserById = async (_id: Types.ObjectId, payload: Partial<IUser>) => {
    try{
        return await UserModel.updateOne({_id}, {...payload});
    }catch(e){
        console.error(e);
        return null;
    }
}