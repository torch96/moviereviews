import mongodb from "mongodb"
import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import user from "../models/user.js"
const ObjectId = mongodb.ObjectId

let users
let sessions


export default class usersDAO {
  static async injectDB(conn) {
    if (users && sessions) {
      return
    }
    try {
      users = await conn.db(process.env.MOVIEREVIEWS_NS).collection("users")
      sessions = await conn.db(process.env.MOVIEREVIEWS_NS).collection("sessions")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async registerUser(user) {
    try {
      

      return await users.insertOne(user)
    } catch (e) {
      console.error(`Unable to register user: ${e}`)
      return { error: e }
    }
  }

  static async getUserByEmail(email) {
    try {
      
      return await users.findOne({ email: email })
    } catch (e) {
      console.error(`Unable to get user by email: ${e}`)
      return { error: e }
    }
  }

  static async getUserByUsername(username) {
    try {
      return await users.findOne({ name: username })
    } catch (e) {
      console.error(`Unable to get user by username: ${e}`)
      return { error: e }
    }
  }

  static async login(email, jwt) {
    try {
      
      await sessions.updateOne(
        { user_id: email},
        { $set: { jwt: jwt} },
        { upsert: true }  
        )
      return { success: true }

    } catch (e) {
      console.error(`Unable to login: ${e}`)
      return { error: e }
    }
  }

  static async logout(email) {
    try {
      
      await sessions.deleteOne({ user_id: email })
      return { success: true }
    } catch (e) {
      console.error(`Unable to logout: ${e}`)
      console.log(e)
      return { error: e }
    }
  }
  
  static async getSession(email) {
    try {
      return await sessions.findOne({ user_id: email })
    } catch (e) {
      console.error(`Unable to get session: ${e}`)
      return { error: e }
    }
  }

  static async deleteUser(email) {
    try {
      await users.deleteOne({ email })
      await sessions.deleteOne({ user_id: email })
      if (!(await this.getUserEmail(email)) && !(await this.getSession(email))) {
        return { success: true }
      } else {
        console.error(`Deletion unsuccessful`)
        return { error: `Deletion unsuccessful` }
      }
    } catch (e) {
      console.error(`Unable to delete user: ${e}`)
      return { error: e }
    }
  }
  
  static async makeAdmin(email) {
    try {
      const isUser = await this.getUserByEmail(email)
      if (!isUser) {
        return { error: `User ${email} does not exist` }
      }
      
      await users.updateOne({ email }, { $set: { isAdmin: true } })
      return { success: true }
    } catch (e) {
      console.error(`Unable to make user an admin: ${e}`)
      return { error: e }
    }
  }

  static async adminCheck(email) {
    try {
      const { isAdmin } = await this.getUserByEmail(email)
      return isAdmin ? true : false
    } catch (e) {
      console.error(`Unable to check if user is admin: ${e}`)
      return { error: e }
    }
  }

}