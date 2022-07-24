
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export default class User{
    constructor({name, email, password, preferences = {} } = {}){
        this.name = name
        this.email = email
        this.password = password
        this.preferences = preferences
    }
    toJson(){
        return { name: this.name, email: this.email, preferences: this.preferences }
    }
    async comparePassword(plainText){
        return await bcrypt.compare(plainText, this.password)
    }
    encoded(){
        return jwt.sign(
            {
                exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4,
                ...this.toJson(),
            },
            process.env.SECRET_KEY,
        )
    }
}

