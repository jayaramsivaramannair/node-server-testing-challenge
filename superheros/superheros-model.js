const db = require("../data/config.js")


function find() {
    return db("superheros")
}

function findById(id) {
    return db("superheros").where({ id }).first()
}

async function create(hero) {
    const [id] = await db("superheros").insert(hero)
    return findById(id)
}

async function remove(id) {
    const deletedHero = await findById(id)
    db("superheros").where({ id }).del()
    return deletedHero //returns deleted record
}

module.exports = {
    find,
    findById,
    create,
    remove,
}