import { CardDatabase } from "../data/CardDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const cardDatabase = new CardDatabase()
const authenticator =  new Authenticator()
const userDatabase = new UserDatabase()

export class CardBussiness {
    insertCard = async(number: string, name: string, expiration: string, cvv: string, token: string) => {
        if(!number){
            throw new Error("Verify the card number input")
        } 
        if(!name){
            throw new Error("Verify the card name input")
        }
        if(!expiration){
            throw new Error("Verify the card expiration input // Ex input: YYYY/MM/DD")
        }
        if(!cvv){
            throw new Error("Verify the card cvv input")
        } else if (cvv.length !== 3) {
            throw new Error("Your card cvv must have 3 numbers")
        }
        if(!token) {
            throw new Error("You have to login to create a card")
        }

        const id = idGenerator.generateId()
        const cypherCvv = await hashManager.generateHash(cvv)
        
        const getTokenData = authenticator.getTokenData(token)

        await cardDatabase.insertCard({
            id: id,
            number: number,
            name: name,
            expiration: expiration,
            cvv: cypherCvv,
            user_id: getTokenData.id
        })
    }
}