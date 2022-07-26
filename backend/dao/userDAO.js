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
      return await users.findOne({ username: username })
    } catch (e) {
      console.error(`Unable to get user by username: ${e}`)
      return { error: e }
    }
  }

  static async login(username, password) {
    try {
      await sessions.updateOne(
        { user_id: email},
        { $set: { token: token } },
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

  
}