'use client'
import TitlePage from "@/components/UI/TitlePage";
import { useEffect } from 'react';

const BackOfficeHome = () => {

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = parseJwt(token);
            console.log('Informations de l\'utilisateur:', user);
        }
    }, []);

    const parseJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    };

    return (
        <div className="container mx-auto">
            <TitlePage title="MyStore - BackOffice" />
            <div className="min-h-screen">
                <h2 className="text-2xl mb-4">BackOffice</h2>
                <div className="mb-8">
                   
                </div>
            </div>
        </div>
    );
}

export default BackOfficeHome;
