import { AuthenticationData } from "../models/AuthenticationData";
import { CreditPayment, TicketPayment } from "../models/Payment";
import { BaseDatabase } from "./BaseDatabase";

export class PaymentDatabase extends BaseDatabase {
    makeCreditPayment = async (payment: CreditPayment) => {
        await this.connection("payment")
        .insert({
            id: payment.id,
            amount: payment.amount,
            payment: payment.payment,
            credit_card: payment.credit_card,
            payment_situation: "Paid",
            user_id: payment.user_id
        })
    }

    makeTicketPayment = async (payment: TicketPayment) => {
        await this.connection("payment")
        .insert({
            id: payment.id,
            amount: payment.amount,
            payment: payment.payment,
            payment_situation: "Waiting payment",
            id_ticket: payment.id_ticket,
            user_id: payment.user_id
        })
    }

    getPaymentByUserId = async(id: string) => {
        try {
            const result = await this.connection("payment")
            .select("*")
            .where({user_id: id})
    
            return result
        } catch(error: any) {
            throw new Error(error.message)
        }
    }
}