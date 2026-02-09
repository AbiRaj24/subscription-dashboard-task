import knex from 'knex';
import knexConfigModule from './knexfile.js';

const knexConfig = knexConfigModule.default || knexConfigModule;


const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

const db = knex(config);

export default db;