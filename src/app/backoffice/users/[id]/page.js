"use client";
import React from "react";
import { getUser } from "@/services/api/user.api";
import TitlePage from "@/components/UI/TitlePage";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { useParams } from "next/navigation";
import Input from "@/components/UI/Input";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const UserDetailPage = () => {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                let response = await getUser(params.id);

                if (response) {
                    setUser(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        if (params.id) {
            fetchUser();
        }
    }, []);

    useEffect(() => {
        console.log(user);
    },[user]);

    const handleUpdate = async (id) => {
        try {
            const token = getCookie("token");
            await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/update/${id}`,
                {
                    method: "PUT",
                    cache: "no-store",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        "name": user.name,
                        "surname": user.surname,
                        "email": user.email,
                        "address": user.address,
                        "postalCode": user.postalCode,
                        "town": user.town,
                        "active": user.phone,
                    })
                }
            );
        } catch (error) {
            console.error("Erreur lors de la modification de l'utilisateur", error);
        }
    };

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container mx-auto bg-gray-100">
            <TitlePage title="Modification de l'utilisateur" />
            <div className="min-h-screen">
                <div className="mb-8">
                    {loading && <p>Loading...</p>}
                    {user && (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <p>Identifiant du client : {user._id}</p>
                                <Input
                                    label={"Nom de l'utilisateur"}
                                    name={"surname"}
                                    value={user.surname}
                                    placeholder={user.surname}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Prenom"}
                                    name={"name"}
                                    value={user.name}
                                    placeholder={user.name}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Email"}
                                    name={"email"}
                                    value={user.email}
                                    placeholder={user.email}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Adresse"}
                                    name={"adresse"}
                                    value={user.address}
                                    placeholder={user.address}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Code Postal"}
                                    name={"postalCode"}
                                    value={user.postalCode}
                                    placeholder={user.postalCode}
                                    type={"number"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Commune"}
                                    name={"town"}
                                    value={user.town}
                                    placeholder={user.town}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />

                                <Input
                                    label={"Numéro de téléphone"}
                                    name={"town"}
                                    value={user.phone}
                                    placeholder={user.phone}
                                    type={"text"}
                                    onChange={(e) => handleChange(e)}
                                    isRequired={false}
                                    className={
                                        "w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg py-3 px-4 mb-3 focus:outline-none focus:border-blue-500"
                                    }
                                />
                            </div>
                            <br />
                            <div className="inline-flex space-x-4 content-around">
                                <Link href={`/backoffice/users`}>
                                    <Button
                                        title="Annuler"
                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                    />
                                </Link>
                                <Link href={`/backoffice/users`}>
                                    <Button
                                        type="submit"
                                        className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                        onClick={() =>
                                            handleUpdate(user._id)
                                        }
                                        title="Enregistrer"
                                    />
                                </Link>
                            </div>
                        </form>
                    )}
                    <br />
                </div>
            </div>
        </div>
    );
};

export default UserDetailPage;
