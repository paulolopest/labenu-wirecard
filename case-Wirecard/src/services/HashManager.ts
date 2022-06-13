import * as bcrypt from "bcryptjs"

export class HashManager {
    generateHash = async(password: string) => {
        const rounds: number = 12
        const salt = await bcrypt.genSalt(rounds)
        
        return bcrypt.hash(password, salt)
    }

    compare = (password: string, cypherPassword: string): Promise<boolean> => {
        return bcrypt.compare(password, cypherPassword)
    }
}