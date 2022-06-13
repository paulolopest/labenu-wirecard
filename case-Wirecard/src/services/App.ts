import express from "express"
import cors from "cors"

export const app = express()
app.use(express.json())
app.use(cors())

const port = 3003
const server = app.listen(3003, () => {
    if(!server) {
        console.log("Error when running the server")
    } else {
        console.log(`The server is running on port ${port}`)
    }
})