import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

//TODO: change url for production or development
export function middleware(request) {
    const token = request.cookies.get('token');
    
    if (!token) {
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`);
    }
    
    try {
        const decodedToken= jwt.decode(token.value);

        if (!decodedToken.admin){
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/me`);
        };
         
    } catch (error) {
        console.error("Token verification error:", error);
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`);
    }
};

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/backoffice/:path*" ]
};