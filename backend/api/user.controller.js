
import userRepository from "../Repository/userRepository.js"
import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import env from "dotenv"



export default class userController {
   static async apiSignup(req, res, next) {
        try {
           
            const name = req.body.name
            const email = req.body.email
            const password = req.body.password
             let error = {}
            
            if(password.length < 8) {
                error.password = "Your password must be at least 8 characters."
            }
            if(name.length < 3) {
                error.name = "Your name must be at least 3 characters."
            }
            if(Object.keys(error).length > 0) {
                return res.status(400).json(error)
            }
            const userData = {
                name: name,
                email: email,
                password: await bcrypt.hash(password, 10),
            }
            const result = await userRepository.registerUser(userData)
  
            if(result.error) {
                
                return res.status(400).json({error: result.error})
            }

            const newUser = await userRepository.getUserByEmail(userData.email)
            console.log(newUser)
            if(!newUser) {
                return res.status(400).json({error: "User not found"})
            }
            
            const theUser = new User(newUser)
            console.log(theUser.toJson())
            
            const loggedInUser =  await userRepository.login(theUser.email, theUser.encoded())
            if(!loggedInUser) {
                return res.status(400).json({error: "User not found"})
            }

            res.json({
                  token: theUser.encoded(),
                info: theUser.toJson(),
            })

           
            
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


    static async apiLogin(req, res, next) {
        try {
            const email = req.body.email
            const password = req.body.password
           

            if(!email || !password) {
                return res.status(400).json({error: "Missing required fields"})
            }
            const userData = await userRepository.getUserByEmail(email)
            if(!userData) {
                return res.status(400).json({error: "User not found"})
            }
            const user = new User(userData)
            const isValid = await bcrypt.compare(password, user.password)
            if(!isValid) {
                return res.status(400).json({error: "Invalid password"})
            }
            const loggedInUser =  await userRepository.login(user.email, user.encoded())
            if(!loggedInUser) {
                return res.status(400).json({error: "User not found"})
            }
            
            res.json({ token: user.encoded(), info: user.toJson(), })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiLogout(req, res, next) {
        try {
            
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            console.log(userJwt)
            const userObj = await User.decoded(userJwt)
            console.log(userObj)
            
            
            const logoutResult = await userRepository.logout(userObj.email)
            
            
            
            res.json(logoutResult)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    
    
    static async apiDeleteUser(req, res, next) {
        try {
            const userJwt = req.get("Authorization").slice("Bearer ".length)
            const userObj = await User.decoded(userJwt)
            var { error } = userObj
            if(error) {
                res.status(401).json({ error })
                return
            }
            

            const deleteResult = await userRepository.deleteUser(userObj.email)
            var { error } = deleteResult
            if(error) {
                res.status(500).json({ error })
                return
            }
            res.json(deleteResult)
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }    
    static async apiCreateAdmin(req, res, next) {
        try {
            const makeAdmin = await userRepository.makeAdmin(req.body.email)
            
            if(makeAdmin.error) {
                 res.status(400).json({error: makeAdmin.error})
                    return
            }

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }


}