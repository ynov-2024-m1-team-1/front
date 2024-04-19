import React from "react";
import Link from "next/link";

const Index = () => {
    return (
        <header className="w-1/5 border-b-2 border-black">
            <ul className="flex flex-col justify-between p-10">
                <li className="flex lg:flex-1 mb-9">
                    <Link href="/backoffice/home">
                        <span className="font-semibold text-2xl font-bold">
                            BackOffice
                        </span>
                    </Link>
                </li>
                <li className="flex items-center mb-4">
                    <div className="flex items-center mr-2">
                        <img
                            src="/user.svg"
                            alt="User Icon"
                            className="h-6 w-6"
                        />
                    </div>
                    <Link
                        href="/backoffice/users"
                        className="text-md font-normal leading-6 text-base hover:text-slate-500"
                    >
                        Users
                    </Link>
                </li>
                <li className="flex items-center">
                    <div className="flex items-center mr-2">
                        <img
                            src="/shirt.svg"
                            alt="Product Icon"
                            className="h-6 w-6"
                        />
                    </div>
                    <Link
                        href="/backoffice/products"
                        className="text-md font-normal leading-6 text-base hover:text-slate-500"
                    >
                        Products
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Index;
