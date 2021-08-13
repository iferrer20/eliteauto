import { Pool } from 'pg';

const pool = new Pool({
    user: 'eliteauto',
    host: 'eliteauto_db',
    database: 'eliteauto',
    password: 'eliteauto',
    port: 5432
});


export default pool;