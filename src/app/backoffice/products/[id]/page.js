"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/api/product.api";
import Link from "next/link";
import TitlePage from "@/components/UI/TitlePage";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";

const Product = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [productForm, setProductForm] = useState ({
        id: '',
        name: '',
        description: '',
        image: '',
        active: false,
        packshot: '',
        price: 0,
    });

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                let response = await getProduct(params.id);
                if (response) {
                    setProduct(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) {
            fetchProduct();
        }
    }, []);

    const handleChange = (e) => {
        setProductForm({...productForm, [e.target.name]: e.target.value})
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(productForm);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productForm);
    };

    return (
        <div className="container mx-auto">
            <TitlePage title="Liste des produits" />
            <div className="min-h-screen">
                <div className="mb-8">
                    {loading && <p>Loading...</p>}
                    <p>Product</p>
                    {product && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <Input label={'Nom produit'} name={'name'} value={productForm.name} placeholder={product.name} type={'text'} onChange={(e) => handleChange(e)} isRequired={true} />
                                <br />
                                <Input label={'Description'} name={'description'} value={productForm.description} placeholder={product.description} type={'text'} onChange={(e) => handleChange(e)} isRequired={true} />
                                <br />
                                <Input label={'Image'} name={'image'} value={productForm.image} placeholder={product.image} type={'image'} onChange={(e) => handleChange(e)} isRequired={true} />
                                <br />
                                {
                                    product.active === true ? <Input label={'Masquer le produit'} name={'active'} type={'checkbox'} onChange={(e) => handleChange(e)} isRequired={true} /> : <Input label={'Masquer le produit'} name={'active'} value={productForm.active} type={'checkbox'} onChange={(e) => handleChange(e)} isRequired={true}/>
                                }
                                <br />
                                <Input label={'Packshot'} name={'packshot'} value={productForm.packshot} placeholder={product.packshot} type={'image'} onChange={(e) => handleChange(e)} isRequired={true} />
                                <br />
                                <Input label={'Prix'} name={'price'} value={productForm.price} placeholder={product.price} type={'number'} onChange={(e) => handleChange(e)} isRequired={true} />
                                <br />
                            </div>
                            <Button type="submit" title="Enregistrer" />
                            <br />
                        </form>
                    )}
                    <br />
                    <Link href={`/backoffice/products` }>
                        <Button title="Annuler" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
