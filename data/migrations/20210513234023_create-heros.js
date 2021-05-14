
exports.up = async function (knex) {
    await knex.schema.createTable("superheros", (table) => {
        table.increments()
        table.text("name").notNullable()
        table.text("superpower").notNullable()
    })
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists("superheros")

};
