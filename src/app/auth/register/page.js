'use client';
import React, { useState } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [town, setTown] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://team-api.faldin.xyz/api/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstname,
          lastname,
          mail,
          password,
          adress,
          postalCode,
          town,
          phone
        })
      });


      if (!response.ok) {
        console.error('Une erreur s\'est produite lors de l\'inscription');
      }
      window.location.href = "/login";
    } catch (error) {
      setError(error.message);
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container mx-auto bg-gray-100">
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96 xl:w-1/3">
                <h2 className="text-2xl font-bold mb-6">Register</h2> 
                <form onSubmit={handleSubmit}>
                    <div className="flex">
                      <div className="justify-start">
                        <Input label={'FirstName'} name={'Firstname'} value={firstname} placeholder={'firstname'} type={'text'} onChange={(e) => setFirstname(e.target.value)} />
                      </div>
                      <div className="justify-end">
                        <Input label={'LastName'} name={'Lastname'} value={lastname} placeholder={'lastname'} type={'text'} onChange={(e) => setLastname(e.target.value)} />
                      </div>
                    </div>
                    <Input label={'Email'} name={'Email'} value={mail} placeholder={'email'} type={'email'} onChange={(e) => setMail(e.target.value)} />
                    <Input label={'Password'} name={'Password'} value={password} placeholder={'password'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                    <Input label={'Confirm Password'} name={'confirmPassword'} value={confirmPassword} placeholder={'confirmPassword'} type={'password'} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <Input label={'Address'} name={'Address'} value={adress} placeholder={'address'} type={'text'} onChange={(e) => setAddress(e.target.value)} />
                    <div className="flex">
                      <div className="justify-start">
                        <Input label={'Town'} name={'Town'} value={town} placeholder={'town'} type={'text'} onChange={(e) => setTown(e.target.value)} />
                      </div>
                      <div className="justify-end">
                        <Input label={'Postal Code'} name={'Postal Code'} value={postalCode} placeholder={'postalCode'} type={'number'} onChange={(e) => setPostalCode(e.target.value)} />
                      </div>
                    </div>
                    <Input label={'Phone'} name={'Phone'} value={phone} placeholder={'phone'} type={'text'} onChange={(e) => setPhone(e.target.value)} />
                    <p>Déjà un compte</p>
                    <a className="text-blue-500" href="./login">Connectez-vous</a>
                    <br />
                    <br />
                    <div className="flex justify-end">
                      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-40 rounded" type={'submit'} title={'Register'}/>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default RegisterForm;