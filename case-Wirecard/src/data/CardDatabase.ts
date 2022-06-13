import { CreditCard } from "../models/CreditCard";
import { BaseDatabase } from "./BaseDatabase";

export class CardDatabase extends BaseDatabase {
    insertCard = async (card: CreditCard) => {
        await this.connection("card_w")
        .insert({
            id: card.id,
            number: card.number,
            name: card.name,
            expiration: card.expiration,
            cvv: card.cvv,
            user_id: card.user_id
        })
    }

    getCardByNumber = async(number: string) => {
        const result = await this.connection("card_w")
        .select("*")
        .where({number: number})

        return {
            id: result[0].id,
            name: result[0].name,
            email: result[0].email,
            cpf: result[0].cpf,
            password: result[0].password 
        }
    }
}