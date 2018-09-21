import dotenv from "dotenv";
import pg from "pg-promise";
import { Pool } from "pg";

dotenv.config();

// let connectionString;

// if (process.env.NODE_ENV === "test") {
// 	connectionString = process.env.PGTEST_URL;
// } else if ( process.NODE_ENV === "development") {
// 	connectionString = process.env.PGADMIN_URL;
// } else {
// 	connectionString = process.env.ELEPHANT_DB_URL;
// }
const connectionString = process.env.PGTEST_URL || process.env.PGADMIN_URL || process.env.ELEPHANT_DB_URL;

const createTable = () => {
  const pool = new Pool({ connectionString });
	pool.connect();

	const query =
        `
        DROP TABLE IF EXISTS users CASCADE;
        DROP TABLE IF EXISTS admins CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS drinks CASCADE;
        DROP TABLE IF EXISTS foods CASCADE;

        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            fullname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            address TEXT,
            lga TEXT,
            state TEXT,
            logged_in TEXT,
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS foods(
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            price INT NOT NULL,
            image VARCHAR(255),
            user_id INT REFERENCES users(id),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS drinks(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            image VARCHAR(255),
            user_id INT REFERENCES users(id),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS orders(
            id SERIAL PRIMARY KEY,
            food_items TEXT,
            drink_items TEXT,
            subtotal INT NOT NULL,
            delivery INT NOT NULL,
            discount INT NOT NULL,
            total INT NOT NULL,
            user_id INT REFERENCES users(id),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS admins(
            id SERIAL PRIMARY KEY,
            fullname VARCHAR(225),
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            phone INT UNIQUE,
            password TEXT NOT NULL,
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        `;

	pool.query(query)
		.then(() => pool.end())
		.catch(() => pool.end());
};
createTable();


const pgp = pg();
export const db = pgp(connectionString);

if (db) {
	console.log("Database Connected");
	console.log(connectionString);
}
