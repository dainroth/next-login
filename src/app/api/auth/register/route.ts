import pool from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  let body;
  try {
    body = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), { status: 400 });
  }

  const { username, password } = body;

  if (!username || !password) {
    return new Response(
      JSON.stringify({ error: "Username and password are required" }),
      { status: 400 }
    );
  }

  try {
    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (existingUser.rows.length > 0) {
      return new Response(
        JSON.stringify({ error: "Username already exists" }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id, username",
      [username, hashedPassword]
    );

    const newUser = result.rows[0];

    return new Response(
      JSON.stringify({ message: "User registered successfully", user: newUser }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Register error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500 }
    );
  }
}
