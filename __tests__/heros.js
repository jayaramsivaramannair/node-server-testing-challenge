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
})