export async function up(knex) {
  await knex.schema.createTable('subscriptions', (table) => {
    table.increments('id').primary();
    table.integer('user_id').unsigned().notNullable();
    table.integer('plan_id').unsigned().notNullable();
    table.date('start_date').notNullable();
    table.date('end_date').notNullable();
    table.enum('status', ['active', 'expired', 'cancelled']).defaultTo('active');
    table.timestamps(true, true);

    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('plan_id').references('id').inTable('plans').onDelete('CASCADE');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('subscriptions');
}