import { Document } from "mongoose"

export enum BookCategory {
    Fiction        = 'Fiction',
    NonFiction     = 'Non-Fiction',
    Mystery        = 'Mystery',
    Biography      = 'Biography',
    ScienceFiction = 'Science Fiction',
    Fantasy        = 'Fantasy',
    Romance        = 'Romance',
    History        = 'History',
    Thriller       = 'Thriller',
    Horror         = 'Horror',
    Poetry         = 'Poetry',
    SelfHelp       = 'Self-Help',
    Business       = 'Business',
    Cookbooks      = 'Cookbooks'
}

export interface IBook extends Document {
    categories: BookCategory[]
    authors   : string[]
    title     : string
    ratings   : number
    price     : number
    createdAt : Date
    updatedAt : Date
}