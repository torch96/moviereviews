
import userDAO from "../dao/userDAO.js"
import bcrypt from "bcryptjs"
import user from "../models/user.js"
import jwt from "jsonwebtoken"

export default class userController {
   static async apiSignup(req, res, next) {
        try {
           
            const name = req.body.name
            const email = req.body.email
            const password = req.body.password
            let error = {}
            if(!name || !email || !password) {
                return res.status(400).json({error: "Missing required fields"})
            }
            if(password.length < 8) {
                errors.password = "Your password must be at least 8 characters."
            }
            if(name.length < 3) {
                errors.name = "Your name must be at least 3 characters."
            }
            if(Object.keys(error).length > 0) {
                return res.status(400).json(error)
            }
            const userData = {
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10),
            }
            const result = await userDAO.registerUser(userData)
            if(result.error) {
                return res.status(400).json({error: result.error})
            }
            const newUser = await userDAO.getUserByEmail(email)
            if(!newUser) {
                return res.status(400).json({error: "User not found"})
            }
            
            const user = new user(newUser)

            res.json({
                auth_token: user.encoded(),
                info: user.toJson(),
            })

           
            
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    static async apiLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if(!email || !password) {
                return res.status(400).json({error: "Missing required fields"})
            }
            const userData = await userDAO.getUserByEmail(email)
            if(!userData) {
                return res.status(400).json({error: "User not found"})
            }
            const user = new user(userData)
            const isValid = await bcrypt.compare(password, user.password)
            if(!isValid) {
                return res.status(400).json({error: "Invalid password"})
            }
            const loggedInUser =  await userDAO.login(user.email, user.encoded())
            if(!loggedInUser) {
                return res.status(400).json({error: "User not found"})
            }
            res.json({ auth_token: user.encoded(), info: user.toJson() })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiLogout(req, res, next) {
        try {
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const userObj = await User.decoded(userJwt)
            var { error } = userObj
            if(error) {
                res.status(401).json({ error })
                return
            }
            const logoutResult = await userDAO.logout(userObj.email)
            var { error } = logoutResult
            if(error) {
                res.status(500).json({ error })
                return
            }
            res.json(logoutResult)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiPostUser(req, res, next) {
        try {
        let user = await userDAO.getUserByEmail(req.body.email)
        if (user) {
            res.status(409).json({ error: "Email already exists" })
            return
        }
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(req.body.password, salt)
        let newUser = {
            email: req.body.email,
            password: hash,
            name: req.body.name,
            age: req.body
        }
        } catch (e) {
        console.log(`api, ${e}`)
        res.status(500).json({ error: e })
        }
    }
}