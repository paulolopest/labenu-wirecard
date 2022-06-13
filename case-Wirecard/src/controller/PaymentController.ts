import { Request, Response } from "express";
import { PaymentBussiness } from "../bussiness/PaymentBussines";

const paymentBussiness = new PaymentBussiness()

export class PaymentController {
    makeCreditPayment = async(req: Request, res: Response) => {
        try {
            const {amount, credit_card} = req.body
            const token = req.headers.authorization as string
            const response = await paymentBussiness.makeCreditPayment(amount, credit_card, token)

            res.send("Purchase made")
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
          }
    }
    
    makeBoletoPayment = async(req: Request, res: Response) => {
        try {
            const {amount} = req.body
            const token = req.headers.authorization as string
            const response = await paymentBussiness.makeBoletoPayment(amount, token)

            res.send({response})
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
          }
    }

    getPayment = async(req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string
            const result = await paymentBussiness.getPayment(token)

            res.send(result)
        } catch (error: any) {
            res.status(400).send(error.message || error.sqlMessage);
        }
    }
}