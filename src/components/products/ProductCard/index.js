"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SuccessPopup from "@/components/UI/Popup";
import { addToWishlist } from "@/services/api/wishlist.api";
import Alert from "@/components/UI/Alert";
import { FaHeart } from "react-icons/fa";

const Index = ({ product }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState(null);

    // const [placehodlerImage, setPlaceholderImage] = useState(null);

    // useEffect(() => {
    //     const fetchPlaceholderImage = async () => {
    //         const placeholder = await getBase64(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${product.thumbnail}`);
    //         setPlaceholderImage(placeholder);
    //     }
    //     if (product) {
    //         setSelectedImage(product.thumbnail);
    //         fetchPlaceholderImage();
    //     }
    // }, [product]);
    const handleAddToWishlist = async () => {
        try {
            const result = await addToWishlist(product.id);
            setShowSuccess(true);
        } catch (error) {
            setError(err);
        }
    };

    return (
        <div className="group/card max-w-sm bg-white rounded-lg">
            <Link
                className="group/thumbnail thumbnail"
                href={`/shop/${product.id}`}
            >
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
                    <Link
                        className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                        href={`/shop/${product.id}`}
                    >
                        Voir le produit
                    </Link>
                    <button
                        className="transition ease-in-out delay-150 mt-4 inline-flex items-center px-4 py-3 text-sm border border-slate-500 font-medium text-center text-slate-500 bg-white hover:bg-slate-500 hover:text-white"
                        onClick={handleAddToWishlist}
                    >
                        <FaHeart />
                    </button>
                    <div className="fixed top-40 left-1/2 transform -translate-x-1/2 h-100 w-900">
                        {showSuccess && (
                            <SuccessPopup
                                message="Produit ajouté à la wishlist avec succès!"
                                onClose={() => setShowSuccess(false)}
                                duration={3000}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;
