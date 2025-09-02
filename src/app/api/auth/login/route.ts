import pool from "../../../../lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";  //creates a JWT token for authentication

const JWT_SECRET = process.env.JWT_SECRET; // jwt secret is a key used to sign and verify jwt tokens

// handle login requests
export async function POST (req: Request){


if (!pool) {
  throw new Error("No pool ");
}

   let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { username, password } = body;
// look up for user in the db, if not match it will store the user
    const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );

    const user = result.rows[0];
    if(!user){
        return new Response (JSON.stringify({ error: "Invalid username or password"}), { status: 401});
    }
    // compare the provided password with the stored hashed password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return new Response (JSON.stringify({ error: "Invalid username or password"}), { status: 401});
    }

     if (!JWT_SECRET) {
        return new Response(JSON.stringify({ error: "Server misconfiguration" }), { status: 500 });
    }

    // generates a JWT token 
    const token = jwt.sign(
        {userId: user.id, username: user.username},
        JWT_SECRET,
        {expiresIn: "1h"}
    );
    
    return new Response(JSON.stringify({ token }), { status: 200 });
    // Sends the token back to the client.
// The frontend can now save it (e.g., in localStorage or cookies) and use it for protected requests.
}