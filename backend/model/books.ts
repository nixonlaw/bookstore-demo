import { model, Schema }  from 'mongoose';
import { BookCategory, IBook } from '../interface/book';
import { isEmpty, isNumber } from 'lodash'
import RegexEscaper from '../util/RegexExp';

const BookSchema = new Schema({
    categories   : {type: [String], enum: BookCategory},
    authors      : [String],
    title        : String,
    ratings      : Number,
    price        : Number,
    createdAt    : Date,
    updatedAt    : Date,
}, {
    timestamps   : {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt' 
    }
});

const BookModel = model<IBook>('books', BookSchema);

export const listAndFilterBooks = async ({
    categories,
    authors,
    title,
    ratings,
    price
}: {
    categories: BookCategory[],
    authors: string,
    title: string,
    ratings: [number,number],
    price: [number,number]
}) => {
    try{
        const books = await BookModel.find({
            ...(!isEmpty(categories) ? {categories: {$in: categories}} : {}),
            ...(!isEmpty(authors) ? {authors: {$regex: RegexEscaper(authors, 'i')}} : {}),
            ...(!isEmpty(title) ? {title: {$regex: RegexEscaper(title, 'i')}} : {}),
            ...(!isEmpty(ratings) && isNumber(ratings[0]) && isNumber(ratings[1]) ? {ratings: {$gte: ratings[0], $lte: ratings[1]}} : {}),
            ...(!isEmpty(price) && isNumber(price[0]) && isNumber(price[1]) ? {price: {$gte: price[0], $lte: price[1]}} : {}),
        }).lean();

        return books;
    }catch(e){
        console.error(e);
        return [];
    }
}