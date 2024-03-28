'use client'
import React, { useState, useEffect } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { login } from "@/services/api/auth.api";
import { useRouter } from 'next/navigation';

const LoginFormAdmin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (token) {
            setLoggedIn(true);
            localStorage.setItem("token", token);
            router.push("/backoffice/home");
        } else {
            setLoggedIn(false);
            localStorage.removeItem("token");
        }
    }, [token, router]);

    const fetchUser = async () => {
        try {
            const response = await login({ email, password });
            if (response.code === 200) {
                setToken(response.data);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    const submitLogin = (e) => {
        e.preventDefault();
        fetchUser();
    };

    return (
        <div className="container mx-auto bg-gray-100">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96 xl:w-1/3">
                    <h2 className="text-2xl font-bold mb-6">Login Administrateur</h2> 
                    <form onSubmit={submitLogin}>
                        <Input label={'Adresse email'} name={'email'} value={email} placeholder={'email'} type={'email'} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <Input label={'Mot de passe'} name={'password'} value={password} placeholder={'mot de passe'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                        <br />
                        <Button type={'submit'} title={'Se connecter'}/>
                        {error && <p className="text-red-500">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );  
};

export default LoginFormAdmin;
