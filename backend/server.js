import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import movies from "./api/movies.route.js"
import userRoute from "./api/user.route.js"
import path from "path"
import {fileURLToPath} from 'url';

const app = express()
const filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(filename);
app.use(cors())
process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, '../frontend/build')));


 /*   app.use(express.static(path.join(__dirname, '../frontend')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
    })*/

app.use("/api/v1/",movies)
app.use("/api/v1/users",userRoute)
app.use("/status", express.static("build"))
app.use("/", express.static("build"))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
} )
app.use("*", (req,res) => res.status(404).json({error: "not found"}))

export default app 
