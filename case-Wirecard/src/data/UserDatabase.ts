import { User } from "../models/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
    insertUser = async(user: User) => {
        await this.connection("user_w")
        .insert({
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            password: user.password
        })
    }

    selectUserByEmail = async(email: string) => {
        try {
            const result = await this.connection("user_w")
            .select("*")
            .where({email: email})

            return {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                cpf: result[0].cpf,
                password: result[0].password 
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    selectUserById = async(id: string) => {
        try {
            const result = await this.connection("user_w")
            .select("*")
            .where({id: id})

            return {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
                cpf: result[0].cpf,
                password: result[0].password 
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}