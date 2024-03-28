"use client";

import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/UI/Button';


const Index = ({ product }) => {

    const addItemToCart = (product) => {
        try {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            localStorage.setItem("cart", JSON.stringify([...cart, product._id]));
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };


    return (
        <div className="group/card max-w-sm bg-white rounded-lg">
            <Link className="group/thumbnail thumbnail" href={`/shop/${product._id}`}>
                <div className="overflow-hidden w-[300px] h-[300px] relative">
                    {/* <Image
                        className="group-hover/thumbnail:opacity-100 group-hover/thumbnail:scale-105 transition ease-in-out delay-150"
                        alt={product.name}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.thumbnail}`}
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                    />
                    <Image
                        className="opacity-100 group-hover/thumbnail:scale-105 group-hover/thumbnail:opacity-0 transition ease-in-out delay-150"
                        alt={product.name}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.packshot}`}
                        fill
                        sizes="100%"
                        style={{ objectFit: "cover" }}
                    /> */}
                </div>
            </Link>
            <div className="py-5">
                <h2 className="text-md mb-3">{product.name}</h2>
                <p className="font-semibold font-s">{product.price} €</p>
                <div className="opacity-0 group-hover/card:opacity-100 transition ease-in-out delay-150">
                    <Link className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white" href={`/shop/${product._id}`}>
                        Voir le produit
                    </Link>
                </div>
                <Button className='bg-black text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black hover:border-black transition ease-in-out delay-150' onClick={() => addItemToCart(product)} title="Ajouter au panier" />
            </div>
        </div>
    );
}

export default Index;
