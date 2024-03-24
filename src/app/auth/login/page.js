'use client';
import React, { useEffect, useState } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { login } from "@/services/api/auth.api";
import { useRouter } from 'next/navigation'


const Login = () => {
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
      router.push("/shop");
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
        return;
      } 
      setError(response.message);
      
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };
  
  const submitLogin = (e) => {
    e.preventDefault();
    fetchUser();
  };
 
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }


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
