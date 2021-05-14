const express = require("express")
const cors = require("cors")
const SuperHerosRouter = require("./superheros/superheros-router.js")

const server = express()

server.use(cors())
server.use(express.json())

server.use("/api", SuperHerosRouter)

server.get("/", (req, res) => {
    res.json({
        message: "Welcome to my Superhero API",
    })
})

server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "Something went wrong",
    })
})

module.exports = server