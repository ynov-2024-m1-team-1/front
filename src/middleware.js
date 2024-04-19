import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export function middleware(request) {
    const token = request.cookies.get('token');
    console.log("token", token);

    // If the token is not present, redirect to the login page
    // if decriped token is not valid, redirect to the login page
    // if decriped token is valid, and is admin, redirect to the backoffice page 
    // if not admin, redirect to the user page



    // if (token && ) {}


    // if (!token) {
    //     return NextResponse.redirect(new URL('/backoffice', request.url).toString());
    // }
    // else {
    //     return NextResponse.next();
    // }
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/backoffice/users", "/backoffice/products", "/backoffice/home"]
};