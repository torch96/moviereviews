import app from "./server.js"
import mongodb from "mongodb"
import donenv from "dotenv"
import moviesDAO from "./dao/moviesDAO.js"
import reviewsDAO from "./dao/reviewsDAO.js"
import userDAO from "./dao/userDAO.js"

donenv.config()
const MongoClient = mongodb.MongoClient
const port = process.env.port || 8000

MongoClient.connect(
    process.env.MOVIEREVIEWS_DB_URI,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true }
    )
    .catch(err => {console.error(err.stack)
    process.exit(1)
}).then(async client =>{ 
    await moviesDAO.injectDB(client)
    await reviewsDAO.injectDB(client)
    await userDAO.injectDB(client)
    app.listen(port,() => 
    {console.log(`listening on port ${ port }`) 
    })
})