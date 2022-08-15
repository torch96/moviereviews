
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export default class User{
    constructor({name, email, password } = {}){
        this.name = name
        this.email = email
        this.password = password
       
    }
    toJson(){
        return { name: this.name, email: this.email }
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
            process.env.JWT_SECRET,
        )
    }
    static async decoded(userJwt){
        return jwt.verify(userJwt, process.env.JWT_SECRET, (error, res) => {
            if (error) {
                return { error }
            }
            return new User(res)
        })
    }
}

//export default User