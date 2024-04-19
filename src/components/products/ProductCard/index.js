"use client";

import Link from "next/link";
import Image from "next/image";
import { addItemToCart } from "@/services/cart/cart";
import CartImage from "@/assets/images/panier.png";
import WhislistImage from "@/assets/images/whislist.png";

const Index = ({ product }) => {
    return (
        <div className="group/card max-w-sm bg-white rounded-lg">
            <Link
                className="group/thumbnail thumbnail"
                href={`/shop/${product._id}`}
            >
                <div className="overflow-hidden w-[300px] h-[300px] relative">
                    <Image
                        className="group-hover/thumbnail:opacity-100 group-hover/thumbnail:scale-105 transition ease-in-out delay-150 rounded-2xl"
                        alt={product.name}
                        src={product.jpg}
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                    />
                    <Image
                        className="opacity-100 group-hover/thumbnail:scale-105 group-hover/thumbnail:opacity-0 transition ease-in-out delay-150 rounded-2xl"
                        alt={product.name}
                        src={product.packshot}
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </Link>
            <div className="py-5">
                <h2 className="text-md mb-3">{product.name}</h2>
                <p className="font-semibold font-s">{product.price} €</p>
                <div className="opacity-0 group-hover/card:opacity-100 transition ease-in-out delay-150 flex justify-center space-x-4">
                    <button
                        className="mt-4 inline-flex items-center px-4 py-3 bg-white transform transition-transform hover:scale-90 active:scale-85"
                        onClick={(e) => {}}
                    >
                        <Image
                            src={WhislistImage}
                            alt="whislist"
                            className="w-6 h-6"
                        />
                    </button>

                    <Link
                        className="transition ease-in-out delay-150 mt-5 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white rounded-lg"
                        href={`/shop/${product._id}`}
                    >
                        Voir le produit
                    </Link>

                    <button
                        className="mt-4 inline-flex items-center px-4 py-3 bg-white transform transition-transform hover:scale-90 active:scale-85"
                        onClick={(e) => {
                            addItemToCart(product._id);
                        }}
                    >
                        <Image
                            src={CartImage}
                            alt="panier"
                            className="w-7 h-7"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;
