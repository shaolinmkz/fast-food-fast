import dotenv from "dotenv";
import pg from "pg-promise";
import { Pool } from "pg";

dotenv.config();

const connectionString = process.env.DB_URL || process.env.PGAMIN_URL;

const createTable = () => {
	const pool = new Pool({ connectionString });
	pool.connect();
	const query =
        `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS admins CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS menus CASCADE;

        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(225) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone INT UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            addressNo INT,
            address VARCHAR(225),
            lga VARCHAR(225),
            state VARCHAR(225),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS admins(
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(225),
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone INT UNIQUE,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );`;

	pool.query(query)
		.then(() => pool.end())
		.catch(() => pool.end());
};
createTable();


const pgp = pg();
export const db = pgp(connectionString);

if (db) {
	console.log("Accessing Database");
}
