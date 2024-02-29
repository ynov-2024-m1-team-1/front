'use strict';

import React from "react";
import Link from "next/link";
import NavMenu from "@/components/UI/NavMenu";
import menu from "@/data/menu.json";
import menuAdmin from "@/data/menuAdmin.json";

const Index = () => {
    const userAgent = {
        admin: true,
    }

    // vérifier si dans le local storage il y a un token dans la page login stocker le token
    
    // si token connecter alors vérification si admin ou pas
    // sinon pas connecter alors pas le menu admin
    
    return (
        <header className="bg-white border-b border-color-black">
            {userAgent.admin ? (
                <ul className="flex pl-6 pr-6 items-center justify-between">
                    <li className="flex lg:flex-1">
                        <Link href="/backoffice">
                            <span className="font-semibold text-2xl font-bold">
                                BackOffice - mystore.
                            </span>
                        </Link>
                    </li>
                    <li>
                        <NavMenu menu={menuAdmin} color="grey" />
                    </li>
                </ul>
            ) : 
            (
                <ul className="flex pl-6 pr-6 items-center justify-between">
                    <li className="flex lg:flex-1">
                        <Link href="/">
                            <span className="font-semibold text-2xl font-bold">
                                mystore.
                            </span>
                        </Link>
                    </li>
                    <li>
                        <NavMenu menu={menu} color="grey" />
                    </li>
                </ul>
            )
            }
        </header>
    );
};

export default Index;
