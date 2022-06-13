import { CardDatabase } from "../data/CardDatabase"
import { PaymentDatabase } from "../data/PaymentDatabase"
import { Authenticator } from "../services/Authenticator"
import { IdGenerator } from "../services/IdGenerator"

const idGenerator = new IdGenerator()
const paymentDatabase = new PaymentDatabase()
const cardDatabase = new CardDatabase()
const authenticator = new Authenticator()

export class PaymentBussiness {
    makeCreditPayment = async(amount: number, credit_card: string, token: string) => {
        if(!amount) {
            throw new Error("The amount input is missing")
        }
        if(!credit_card) {
            throw new Error("The credit card input is missing")
        }
        if(!token) {
            throw new Error("Verify your authorization")
        }

        const id = idGenerator.generateId()
        const userId = authenticator.getTokenData(token)
        const card = await cardDatabase.getCardByNumber(credit_card)

        if(!card) {
            throw new Error("Incorrect card")
        }

        await paymentDatabase.makeCreditPayment({
            id: id,
            amount: amount, 
            payment: "Credit card",
            credit_card: credit_card,
            payment_situation: "Paid",
            user_id: userId.id
        })
    }

    makeBoletoPayment = async(amount: number, token: string) => {
        if(!amount) {
            throw new Error("The amount input is missing")
        }
        if(!token) {
            throw new Error("Verify your authorization")
        }

        const userId = authenticator.getTokenData(token)
        const id = idGenerator.generateId()
        const ticketId = idGenerator.generateId()

        await paymentDatabase.makeTicketPayment({
            id: id,
            amount: amount, 
            payment: "Boleto",
            payment_situation: "Waiting Payment",
            id_ticket: ticketId,
            user_id: userId.id
        })

        return ticketId
    }

    getPayment = async(token: string) => {
        if(!token) {
            throw new Error("Verify de authorization token")
        }

        const getTokenData = authenticator.getTokenData(token)

        const result = await paymentDatabase.getPaymentByUserId(getTokenData.id)

        return result
    }
}






