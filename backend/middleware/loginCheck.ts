import { Request, Response } from "express";

const loginCheck = async (req: Request, res: Response, next: ()=>void) => {
    if (req.session.user) {
        // User is logged in, proceed to the next middleware or route handler
        next();
    } else {
        // User is not logged in, redirect to login page or send an error response
        return res.status(401).send({message:'Unauthorized'});
    }
}

export default loginCheck