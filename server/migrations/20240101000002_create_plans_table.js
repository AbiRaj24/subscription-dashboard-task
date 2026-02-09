export async function up(knex) {
  await knex.schema.createTable('plans', (table) => {
    table.increments('id').primary();
    table.string('name', 100).notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.json('features').notNullable();
    table.integer('duration').notNullable().comment('Duration in days');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('plans');
}