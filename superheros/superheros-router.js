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

router.post("/", async (req, res, next) => {
    try {
        const newHero = await SuperHeros.create({
            name: req.body.name,
            superpower: req.body.superpower,
        })
        res.status(201).json(newHero)
    } catch (err) {
        next(err)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const hero = await SuperHeros.findById(req.params.id)
        if (!hero) {
            return res.status(404).json({
                message: "Hero not found",
            })
        } else {
            const fallenHero = await SuperHeros.remove(req.params.id)
            res.status(200).json(fallenHero)
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router