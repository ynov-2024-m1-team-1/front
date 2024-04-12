'use client';
import React, { useState, useEffect } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import { useRouter } from 'next/navigation';
import { register } from "@/services/api/auth.api";
import { isValidForm } from "@/hooks/verifyForm";

const RegisterForm = () => {
  const [userForm, setUserForm] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    postalCode: "",
    town: "",
    phone: "",
  });
  const [formError, setFormError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value
    });
  }

  const fetchRegister = async () => {
    try {
      const response = await register(userForm); 
      if (response.code === 200) {
        setSuccess(response.message);

        setTimeout(() => {
          router.push("/user/me");
        }, 1500);

        return;
      }
      setError(response.message);
    } catch (error) {
      setError(error);
      console.error(error);
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    const errors = isValidForm(userForm);
    if (Object.keys(errors).length > 0) {
      setFormError(Object.values(errors)[0]);
    } else {
      setFormError(null);
      fetchRegister();
    }
  };

  return (
    <div className="container mx-auto bg-gray-100">
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
            <div className="bg-white p-8 rounded shadow-md w-96 xl:w-1/3 ">
                <h2 className="text-2xl font-bold mb-6">Register</h2> 
                <form onSubmit={submitRegister}>
                    <div className="flex">
                      <div className="justify-start mr-4">
                        <Input label={'Name'} name={'name'} value={userForm.name} placeholder={'name'} type={'text'} onChange={handleChange} />
                      </div>
                      <div className="justify-end">
                        <Input label={'Surname'} name={'surname'} value={userForm.surname} placeholder={'surname'} type={'text'} onChange={handleChange} />
                      </div>
                    </div>
                    <Input label={'Email'} name={'email'} value={userForm.email} placeholder={'email'} type={'email'} onChange={handleChange} />
                    <Input label={'Password'} name={'password'} value={userForm.password} placeholder={'password'} type={'password'} onChange={handleChange} />
                    <Input label={'Confirm Password'} name={'confirmPassword'} value={userForm.confirmPassword} placeholder={'confirmPassword'} type={'password'} onChange={handleChange} />
                    <Input label={'Address'} name={'address'} value={userForm.address} placeholder={'address'} type={'text'} onChange={handleChange} />
                    <div className="flex">
                      <div className="justify-start mr-4">
                        <Input label={'Town'} name={'town'} value={userForm.town} placeholder={'town'} type={'text'} onChange={handleChange} />
                      </div>
                      <div className="justify-end">
                        <Input label={'Postal Code'} name={'postalCode'} value={userForm.postalCode} placeholder={'postalCode'} type={'number'} onChange={handleChange} />
                      </div>
                    </div>
                    <Input label={'Phone'} name={'phone'} value={userForm.phone} placeholder={'phone'} type={'text'} onChange={handleChange} />
                    <p>Déjà un compte</p>
                    <a className="text-blue-500" href="./login">Connectez-vous</a>
                    <br />
                    {
                      error && ( 
                        <div className="flex justify-center">
                          <p className="text-red-500 font-bold">{error}</p>
                        </div>
                      ) || formError && (
                        <div className="flex justify-center">
                          <p className="text-red-500 font-bold">{formError}</p>
                        </div>
                      ) || success && (
                        <>
                          <div className="flex justify-center">
                            <p className="text-green-500 font-bold">{success}</p>
                            <br />
                          </div>
                          <br />
                          <p className="text-500 font-bold">Vous serez rediriger vers la page de profil dans ...</p>
                        </>
                      )
                    }
                    <br />
                    <div className="flex justify-end">
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded" type={'submit'} title={'Register'}/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default RegisterForm;
