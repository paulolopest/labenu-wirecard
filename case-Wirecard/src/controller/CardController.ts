import { Request, Response } from "express";
import { CardBussiness } from "../bussiness/CardBussiness";

const cardBussinnes = new CardBussiness()

export class CardController {
  insertCard = async (req: Request, res: Response) => {
    try {
        const {number, name, expiration, cvv} = req.body
        const token = req.headers.authorization as string
        const response = await cardBussinnes.insertCard(number, name, expiration, cvv, token)

        res.status(201).send("Card successfully created")

    } catch (error: any) {
      res.status(400).send(error.sqlMessage || error.message);
    }
  };
}
