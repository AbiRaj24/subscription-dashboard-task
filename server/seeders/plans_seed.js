exports.seed = async function (knex) {

  await knex('plans').del();

  await knex('plans').insert([
    {
      name: 'Basic',
      price: 10,
      features: JSON.stringify(['Feature 1', 'Feature 2']),
      duration: 30
    },
    {
      name: 'Pro',
      price: 20,
      features: JSON.stringify(['Feature A', 'Feature B']),
      duration: 90
    }
  ]);

};
