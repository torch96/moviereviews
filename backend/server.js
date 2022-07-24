import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import movies from "./api/movies.route.js"
import userRoute from "./api/user.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/",movies)
app.use("/api/v1/user",userRoute)
app.use("/status", express.static("build"))
app.use("/", express.static("build"))

app.use("*", (req,res) => res.status(404).json({error: "not found"}))

export default app 
