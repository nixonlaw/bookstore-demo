import { Request, Response } from "express";
import { getUserById, authUser, updateUserById } from "../model/users";

export const login = async (req: Request, res: Response) => {
    const {username, password} = req.body

    //find the user
    const user = await authUser(username, password);

    if(!user){
        return res.status(401).send({message: 'User not found'})
    }
    
    req.session.user = user;

    return res.status(200).send({message: 'logged in'});
}

export const logout = async (req: Request, res: Response) => {
    res.cookie("connect.sid",undefined);
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session:', err);
        } else {
            return res.status(200).send({message:'logged out'});
        }
    });
}

export const getUser = async (req: Request, res: Response) => {

    const user = await getUserById(req.session.user?._id);

    if(!user){
        return res.status(404).send({message: 'user not found'});
    }

    return res.status(200).send(user)
}

export const updateUser = async (req: Request, res: Response) => {

    const payload = req.body;

    const result = await updateUserById(req.session.user?._id, {...payload});

    if(result && result.acknowledged && result.matchedCount===1 && result.modifiedCount===1){
        return res.status(200).send({message: 'updated'});
    }else{
        console.error(result);
        return res.status(500).send({message: 'internal error'});
    }
}