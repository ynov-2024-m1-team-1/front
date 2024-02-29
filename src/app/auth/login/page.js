'use client'
import React, { useState } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

const Login = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://team-api.faldin.xyz/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail,
          password
        })
      });

      if (!response.ok) {
        console.error('Identifiants invalides');
      } else {
        setIsLoggedIn(true);
      }
    } catch (error) {
      setError(error.message);
      console.error("Erreur lors de la connexion:", error);
    }
  };
  
  if (isLoggedIn) {
    window.location.href = "/";
    return null;
  }

  return (
    <div className="container mx-auto bg-gray-100">
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96 xl:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Connexion</h2> 
                <form onSubmit={handleSubmit}>
                    <Input label={'Email'} name={'email'} value={mail} placeholder={'email'} type={'email'} onChange={(e) => setMail(e.target.value)} />
                    <br/>
                    <Input label={'Mot de passe'} name={'password'} value={password} placeholder={'password'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                    <br/>
                    {error && <p className="text-red-500">{error}</p>}
                    <Button type={'submit'} title={'Connexion'}/>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Login;
