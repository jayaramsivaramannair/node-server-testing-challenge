const express = require("express")
const SuperHeros = require("./superheros-model.js")

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        res.json(await SuperHeros.find())
    } catch (err) {
        next(err)
    }
})

module.exports = router