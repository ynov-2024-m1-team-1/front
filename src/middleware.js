import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

//TODO: change url for production
export function middleware(request) {
    const token = request.cookies.get('token');
    
    if (!token) {
        // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`);
        return NextResponse.redirect(`http://localhost:3000/auth/login`);
    }
    
    try {
        const decodedToken= jwt.decode(token.value)

        if (decodedToken.admin) {
            // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/backoffice/home`);
            return NextResponse.redirect(`http://localhost:3000/backoffice`);
        } else if (!decodedToken.admin){
            // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`);
            return NextResponse.redirect(`http://localhost:3000/user/me`);
        } else {
            return NextResponse.next();
        }
    } catch (error) {
        console.error("Token verification error:", error);
        // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`);
        return NextResponse.redirect(`http://localhost:3000/auth/login`);
    }
};

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/backoffice/users", "/backoffice/products", "/backoffice/home"]
};