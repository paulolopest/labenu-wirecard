import { UserDatabase } from "../data/UserDatabase"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"

const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const userDatabase = new UserDatabase()
const authenticator = new Authenticator()

export class UserBussiness {
    insertUser = async(name: string, email: string, cpf: string, password: string) => {
        if(!name) {
            throw new Error("Verify the name input")
        }
        if(!email) {
            throw new Error("Verify the email input")
        } else if (email.indexOf("@") === -1){
            throw new Error("Your email needs an @")
        }
        if(!cpf) {
            throw new Error("Verify the cpf input")
        } else if (cpf.length < 11) {
            throw new Error("Your cpf must be contain 11 numbers")
        }
        if(!password) {
            throw new Error("Verify the password input")
        } else if (password.length < 6) {
            throw new Error("The password must be longer than 6")
        }

        const id: string = idGenerator.generateId()
        const cypherPassword = await hashManager.generateHash(password)

        await userDatabase.insertUser({
            id: id,
            name: name,
            email: email,
            cpf: cpf,
            password: cypherPassword
        })
    }

    
    login = async (email: string, password: string) => {
        if(!email) {
            throw new Error("Verify the email input")
        } else if (email.indexOf("@") === -1){
            throw new Error("Your email needs an @")
        }
        if(!password) {
            throw new Error("Verify the password input")
        }

        const user = await userDatabase.selectUserByEmail(email)

        if(!user) {
            throw new Error("The user does not exist")
        }

        const validationPassword = hashManager.compare(password, user.password)

        if(!validationPassword) {
            throw new Error("Incorrect password")
        }

        const token = authenticator.generateToken({id: user.id})

        return token
    }
}