import { NextResponse } from "next/server"; //lets you send responses in Next.js middleware.
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export function middleware(req) {
  //  check for the tokne if it exist or authorized
  const token = req.headers.get("authorization")?.split(" ")[1]; //  split (" ") takes the token part after "Bearer".

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // if there is no token → immediately return 401 Unauthorized.
  }
// check if the token is vaild or exprired 
// If valid → let the request continue with NextResponse.next().
  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/protected/:path*", "/dashboard/:path*", "/"], // protect these routes
};
