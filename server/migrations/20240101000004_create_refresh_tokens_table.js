export async function up(knex) {
  await knex.schema.createTable('refresh_tokens', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.string('token', 500).notNullable();
    table.timestamp('expires_at').notNullable();
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('refresh_tokens');
}