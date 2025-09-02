
// pool is a libary from node-postgres
// pool help you set of a connection and reuse them. this help make thing faster.
import { Pool } from "pg";

const pool = new Pool ({
    connectionString: process.env.Database_URL,
}) 

export default pool;
