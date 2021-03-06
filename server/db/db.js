import dotenv from "dotenv";
import pg from "pg-promise";
import { Pool } from "pg";

dotenv.config();


const connectionString = process.env.DATABASE_URL;

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
            name TEXT UNIQUE NOT NULL,
            price TEXT NOT NULL,
            image TEXT,
            user_id INT REFERENCES users(id),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS drinks(
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            price TEXT NOT NULL,
            image TEXT,
            user_id INT REFERENCES users(id),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS orders(
            id SERIAL PRIMARY KEY,
            food_items TEXT,
            food_quantities TEXT,
            drink_items TEXT,
            drink_quantities TEXT,
            subtotal TEXT NOT NULL,
            delivery TEXT NOT NULL,
            discount TEXT NOT NULL,
            total TEXT NOT NULL,
            status TEXT NOT NULL,
            user_id INT REFERENCES users(id),
            created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          );

        CREATE TABLE IF NOT EXISTS admins(
            id SERIAL PRIMARY KEY,
            fullname TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            logged_in TEXT,
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

console.log("Database Connected"); /**For testing */
console.log(connectionString);



