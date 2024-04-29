import { Document } from "mongoose"

export interface IUser extends Document {
    username     : string
    name         : string
    phone        : string
    password    ?: string
    createdAt    : Date
    updatedAt    : Date
}
