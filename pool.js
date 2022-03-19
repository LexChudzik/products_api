const pg = require('pg');
require('dotenv').config();

const Pool = pg.Pool;

const pool = new Pool({
    user: process.env.PG_USER || null,
    password: process.env.PG_PASSWORD || null,
    database: process.env.DATABSE_NAME || 'products',
    host: process.env.DATABASE_SERVER || 'localhost',
    port:  process.env.DATABASE_PORT || 5432,
    max: 10,
    idleTimeoutMillis: 30000 
});

// Listener setup on the pool isn't required, 
// but can be super handy for troubleshooting.
pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (error) => {
    console.log('Error with database pool', error);
});

module.exports = pool;