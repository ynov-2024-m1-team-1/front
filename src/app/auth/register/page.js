'use client'
import React, { useState } from "react";
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

const RegisterForm = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
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
                    <div className="flex items-left">
                        <div >
                            <Input label={'FirstName'} name={'firstname'} value={firstname} placeholder={'firstname'} type={'text'} onChange={(e) => setFirstname(e.target.value)} />
                            <br/>
                            <Input label={'Email'} name={'email'} value={mail} placeholder={'email'} type={'email'} onChange={(e) => setMail(e.target.value)} />
                            <br/>
                            <Input label={'Address'} name={'Address'} value={adress} placeholder={'address'} type={'text'} onChange={(e) => setAddress(e.target.value)} />
                            <br/>
                            <Input label={'Phone'} name={'Phone'} value={phone} placeholder={'phone'} type={'text'} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div>
                            <Input label={'LastName'} name={'lastname'} value={lastname} placeholder={'lastname'} type={'text'} onChange={(e) => setLastname(e.target.value)} />
                            <br/>
                            <Input label={'Password'} name={'Password'} value={password} placeholder={'password'} type={'password'} onChange={(e) => setPassword(e.target.value)} />
                            <br/>
                            <Input label={'Postal Code'} name={'Postal Code'} value={postalCode} placeholder={'postalCode'} type={'number'} onChange={(e) => setPostalCode(e.target.value)} />
                            <br/>
                            <Input label={'Town'} name={'Town'} value={town} placeholder={'town'} type={'text'} onChange={(e) => setTown(e.target.value)} />
                            <br/>
                        </div>
                        
                    </div>
                    <Button type={'submit'} title={'Register'}/>
                </form>
            </div>
        </div>
    </div>
  );
};

export default RegisterForm;