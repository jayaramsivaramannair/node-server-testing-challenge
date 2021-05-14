const supertest = require("supertest") //supertest is similar to fetch and axios
const server = require("../server.js")
const db = require("../data/config.js")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    //close connection to the database
    await db.destroy()
})

describe("superheros integration tests", () => {
    it("gets all heros", async () => {
        const res = await supertest(server).get("/api")
        expect(res.statusCode).toBe(200)
        expect(res.type).toBe("application/json")
        expect(res.body.length).toEqual(3)
        expect(res.body[1].name).toBe("Black Panther")
        expect(res.body[1].superpower).toBe("Energy Dagger")
    })

    //Test 1: for New Hero
    it("check that a new hero is created with the provided data", async () => {
        const newHero = { name: 'Iron Man', superpower: 'Repulsor Rays' }
        const res = await supertest(server).post("/api").send(newHero)
        expect(res.statusCode).toBe(201)
        expect(res.type).toBe("application/json")
        expect(res.body.superpower).toBe("Repulsor Rays")
    })

    //Test 2: for New Hero
    it("check the database length after creating a new hero", async () => {
        const newHero = { name: 'Iron Man', superpower: 'Repulsor Rays' }
        await supertest(server).post("/api").send(newHero)
        const res = await supertest(server).get("/api")
        expect(res.statusCode).toBe(200)
        expect(res.body.length).toBe(4)
    })

    //Test 1: for deleting a Hero
    it("checks that the hero is successfully deleted", async () => {
        const fallenHero = await supertest(server).delete("/api/3")
        expect(fallenHero.statusCode).toBe(200)
        expect(fallenHero.body.id).toBe(3)
        expect(fallenHero.body.name).toBe('Wolverine')
    })

    //Test 2: for deleting a Hero
    it("returns an 404 if a hero selected for deletion does not exist", async () => {
        const fallenHero = await supertest(server).delete("/api/50")
        expect(fallenHero.statusCode).toBe(404)
    })
})