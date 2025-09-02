import pool from "@/lib/db";
// library to hash (encrypt) passwords,
import bcrypt from "bcryptjs"; 

export async function POST (req) {
    // data from the request body → expects email and password
    const { username, password } = await req.json();

    // Before saving the password, it hashes it with bcrypt.
    const hashedPassword = await bcrypt.hash(password, 10);


    // it tried to insert new user into the db
    // where $1 $2 are placeholders for the values
    try{
        await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2)",
            (username, hashedPassword) 
        );
        // JSON.stringify convert a js object into a json string
        return new Response (JSON.stringify({ message: "User created"})), { status: 201};
    }catch (error) {
        // if there is an error, it logs the error and returns a 500 status code
        return new Response (JSON.stringify({ errors: "User already exist"}), { status: 500});
    }

}