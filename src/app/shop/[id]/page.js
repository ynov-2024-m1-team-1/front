"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/api/product.api.js";
import { addItemToCart } from "@/services/cart/cart.js";
import BreadCrumb from "@/components/UI/Breadcrumb";
import TitlePage from "@/components/UI/TitlePage";
import ProductFancyBox from "@/components/products/ProductFancyBox";
import Loader from "@/components/UI/Loader";
import Alert from "@/components/UI/Alert";
import Button from "@/components/UI/Button";

export default function Page() {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(null);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [slideIndex, setSlideIndex] = useState(0);
    const [showFancyBox, setShowFancyBox] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let product = await getProduct(id);
                if (product) {
                    setProduct(product.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id]);

    if (loading) return <Loader />;

    const goToNextSlide = () => {
        setSelectedImage(
            slideIndex === 0 ? product.packshot : product.jpg
        );
        setSlideIndex(slideIndex === 0 ? 1 : 0);
    };

    const goToPrevSlide = () => {
        setSelectedImage(
            slideIndex === 0 ? product.packshot : product.jpg
        );
        setSlideIndex(slideIndex === 0 ? 1 : 0);
    };  

    return (
        <div className="container mx-auto py-12">
            {error && <Alert message={error.message} type="error" />}
            {!product && <Alert message="No products found" type="error" />}
            {showFancyBox && (
                <ProductFancyBox
                    img={selectedImage}
                    prevSlide={() => goToPrevSlide()}
                    nextSlide={() => goToNextSlide()}
                    close={() => {
                        setShowFancyBox(false);
                    }}
                />
            )}
            <BreadCrumb current_page={product?.name} />
            <div className="flex">
                <div className="thumbnail lg:flex-1">
                    <div className="group/show w-4/5 h-[550px] overflow-hidden cursor-pointer"
                        onClick={() => setShowFancyBox(true)}
                    >
                        <Image
                            className="object-cover h-full w-full group-hover/show:scale-105 transition ease-in-out delay-150 z-1"
                            alt={product.name}
                            src={product.packshot}
                            width={550}
                            height={550}
                        />
                    </div>
                    <div className="carousel flex mt-4 overflow-hidden">
                        <div className="item w-[100px] h-[100px] mr-2">
                            <Image
                                className="cursor-pointer object-cover h-full w-full"
                                alt={product.name}
                                src={product.jpg}
                                width={100}
                                height={100}
                                onMouseOver={() => {
                                    setSelectedImage(product.thumbnail);
                                    setSlideIndex(0);
                                }}
                                onClick={() => {
                                    setSelectedImage(product.thumbnail);
                                    setSlideIndex(0);
                                }}
                            />
                        </div>
                        <div className="item w-[100px] h-[100px]">
                            <Image
                                className="cursor-pointer object-cover h-full w-full"
                                alt={product.name}
                                src={product.jpg}
                                width={100}
                                height={100}
                                onMouseOver={() => {
                                    setSelectedImage(product.packshot);
                                    setSlideIndex(1);
                                }}
                                onClick={() => {
                                    setSelectedImage(product.packshot);
                                    setSlideIndex(1);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="content lg:flex-1 p-6">
                    <TitlePage title={product.data} />
                    <p className="mb-3 font-semibold text-lg">
                        {product.price} €
                    </p>
                    <br />
                    <p className="leading-7">{product.description}</p>
                    <br />
                    <Button
                        className="bg-black text-white px-4 py-2 border border-white rounded-full hover:bg-white hover:text-black hover:border-black transition ease-in-out delay-150"
                        onClick={(e) => addItemToCart(id)}
                        title="Ajouter au panier"
                    />
                </div>
            </div>
        </div>
    );
}
