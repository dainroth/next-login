// this file is where the JWT token is stored and managed
// jose is a library for working with JWT tokens
import "server-only";
import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

type SessionPlayload = {
    userId: string;
    expiresAt: Date;
}

export async function encrpt (payload: SessionPlayload) {
    return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt (session: string | undefined = "" ) {
    try{
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    }catch (error){
        console.log("Failed to verify JWT");
    }
}




