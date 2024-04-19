import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const {
            name,
            surname,
            email,
            password,
            confirmPassword,
            address,
            postalCode,
            town,
            phone,
        } = await request.json();
       
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                },
                body: JSON.stringify({
                    name: name,
                    surname: surname,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    address: address,
                    postalCode: postalCode,
                    town: town,
                    phone: phone,
                }),
            }
        );
        const data = await response.json();

        if(data && data.code===200){
            cookies().set("token", data.data);
            return NextResponse.json({
                success:true,
                message: "Register success",
            });
        }
        else{
            console.error(data.message);
        }
    } catch (e) {
        console.error("Unabled to register, an error occurred: ", e);
    }
};
