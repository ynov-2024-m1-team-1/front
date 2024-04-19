import React from "react";
import Link from "next/link";

const Index = () => {
    return (
        <header className="w-1/6 border-b-2 border-black">
            <ul className="flex flex-col h-full">
                <Link href="/backoffice/home">
                    <li className="pt-5 pr-5 pl-5">
                        <span className="text-2xl font-bold">BackOffice</span>
                    </li>
                </Link>
                <div className="p-5">
                    <Link
                        href="/backoffice/users"
                        className="text-md font-normal leading-6 text-base hover:text-slate-500"
                    >
                        <li className="flex mb-4">
                            <div className="flex items-center mr-2">
                                <img
                                    src="/user.svg"
                                    alt="User Icon"
                                    className="h-6 w-6"
                                />
                            </div>
                            Users
                        </li>
                    </Link>
                    <Link
                        href="/backoffice/products"
                        className="text-md font-normal leading-6 text-base hover:text-slate-500"
                    >
                        <li className="flex items-center">
                            <div className="flex items-center mr-2">
                                <img
                                    src="/shirt.svg"
                                    alt="Product Icon"
                                    className="h-6 w-6"
                                />
                            </div>
                            Products
                        </li>
                    </Link>
                </div>
                <div className="flex items-end h-full">
                    <Link
                        href="/backoffice"
                        className="text-md font-normal leading-6 text-base hover:text-slate-500"
                    >
                        <li className="flex items-center p-5">
                            <div className="flex items-center mr-2">
                                <img
                                    src="/log-out.svg"
                                    alt="Product Icon"
                                    className="h-6 w-6"
                                />
                            </div>
                            Logout
                        </li>
                    </Link>
                </div>
                <div className="mt-auto bg-black text-white transition-colors duration-300 hover:bg-white hover:text-black hover:border-t-4 border-black hover:border-t-4 border-black">
                    <Link href="/" className="text-2xl font-semibold">
                        <li className="p-5">My Store</li>
                    </Link>
                </div>
            </ul>
        </header>
    );
};

export default Index;
