'use client';

import React from 'react';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import NavMenu from "@/components/UI/NavMenu";
import menu from "@/data/menu.json";
import menuAdmin from "@/data/menuAdmin.json";
import Button from "@/components/UI/Button";
import { jwtDecode } from "jwt-decode";

const Index = () => {
    const [userToken, setUserToken] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        
        if (token) {
            setUserToken(token);
            const decodedToken = jwtDecode(token);

            if (decodedToken && decodedToken.admin) {
                setIsAdmin(true);
            } 
        }
    }, []);
    
    const logout = () => {
        localStorage.removeItem("token");
        setUserToken(null);
        router.push("/shop");
    };

    return (
        <header className="bg-white border-b border-color-black">
            <ul className="flex pl-6 pr-6 items-center justify-between">
                <li className="flex lg:flex-1">
                    <Link href="/backoffice">
                        <span className="font-semibold text-2xl font-bold">
                            {
                                isAdmin ? "BackOffice - Admin" : 
                                "mystore"
                            }
                        </span>
                    </Link>
                </li>
                <li>
                    <div className='flex items-center'>
                        <NavMenu menu={isAdmin ? menuAdmin : menu} color="grey" />
                        {userToken ? (
                            <div className='justify-center'>
                                <Link href="/user/me" className='text-md font-normal leading-6 text-base hover:text-slate-500'>  
                                    Account
                                </Link>
                                <span className='mx-4'>|</span>
                                <Button className='bg-black text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black hover:border-black transition ease-in-out delay-150' onClick={logout} title={'Logout'}/>
                                    
                            </div> 
                        ) : (
                            <Link href="auth/login" className='text-md font-normal leading-6 text-base hover:text-slate-500'>
                                Login
                            </Link>
                            
                        )}
                    </div>
                </li>
            </ul>
        </header>
    );
};

export default Index;
