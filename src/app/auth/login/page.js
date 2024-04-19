'use client';
import React, { useEffect, useState } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const router = useRouter(); 
  
  const submitLogin = (e) => {
    e.preventDefault();
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      return res.json();
    }).then((data) => {
      if (data.success) {
        router.push("/shop");
      }
    }).catch((error) => {
      console.error('Error:', error);
      setError(error.message);
    });
  };
 
  return (
    <div className="container mx-auto bg-gray-100">
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96 xl:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Connexion</h2> 
                <form onSubmit={submitLogin}>
                    <Input label={'Email'} name={'email'} value={email} placeholder={'email'} type={'email'} onChange={(e) => setEmail(e.target.value)} />
                    <br/>
                    <Input label={'Mot de passe'} name={'password'} value={password} placeholder={'password'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                    <br/>
                    <p className="" >Pas encore de compte ?</p>
                    <a className="text-blue-500" href="register">Inscrivez-vous</a>
                    <br />
                    {
                      error && ( 
                        <div className="flex justify-center">
                          <p className="text-red-500 font-bold">{error}</p>
                        </div>
                      )
                    }
                    <br/>
                    <div className="flex justify-end">
                      <Button type={'submit'} title={'Connexion'}/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
