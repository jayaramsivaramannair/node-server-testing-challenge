exports.seed = async function (knex) {
  await knex("superheros").truncate()
  await knex("superheros").insert([
    { name: "Captain America", superpower: "Vibranium Shield" },
    { name: "Black Panther", superpower: "Energy Dagger" },
    { name: "Wolverine", superpower: "Adamantium Claws" },
  ])
};

//npx knex migrate:rollback - undoes any changes made to the database
//npx knex migrate:latest - initializes an empty table inside the database
//npx knex seed:run - Runs the seed files (if existing) and populates database with sample data
