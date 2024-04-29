import { Request, Response } from "express";
import { listAndFilterBooks } from "../model/books";

export const listBooks = async (req: Request, res: Response) => {
    const {
        categories,
        authors,
        title,
        ratings,
        price
    } = req.body;

    const books = await listAndFilterBooks({
        categories,
        authors,
        title,
        ratings,
        price
    });

    return res.status(200).send({message: books});
}