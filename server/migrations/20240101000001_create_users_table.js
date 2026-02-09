export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password', 255).notNullable();
    table.enum('role', ['user', 'admin']).defaultTo('user');
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users');
}