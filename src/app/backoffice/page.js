'use client';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useState } from 'react';

const LoginFormAdmin = () => {
    const [userForm, setUserForm] = useState ({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    const submit = async (e) => {
        e.preventDefault();
        if (userForm.email === 'your.email@example.com' && userForm.password === 'your_password') {
            window.location.href = '/backoffice/home';
        } else {
            window.location.href = '/';
        }
    }

    return (
        <div className="container mx-auto bg-gray-100">
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded shadow-md w-96 xl:w-1/3">
                    <h2 className="text-2xl font-bold mb-6">Login Administrateur</h2> 
                    <form onSubmit={(e)=> submit(e)}>
                        <Input label={'Adresse email'} name={'email'} value={userForm.email} placeholder={'email'} type={'email'} onChange={(e) => handleChange(e)} isRequired={true} />
                        <br />
                        <Input label={'Mot de passe'} name={'password'} value={userForm.password} placeholder={'mot de passe'} type={'password'} onChange={(e) => handleChange(e)} isRequired={true} />
                        <br />
                        <Button type={'submit'} title={'Se connecter'}/>
                    </form>
                </div>
            </div>
        </div>
    );  
};

export default LoginFormAdmin;
