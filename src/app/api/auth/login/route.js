import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {email, password} = await request.json();
       
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            }
        );
        const data = await response.json();

        if(data && data.code===200){
            cookies().set("token", data.data);
            return NextResponse.json({
                success:true,
                message: "Login success",
            });
        }
        else{
            console.error(data.message);
        }
    } catch (e) {
        console.error("Unabled to login, an error occurred: ", e);
    }
};
