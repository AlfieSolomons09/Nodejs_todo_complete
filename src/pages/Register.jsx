import React, { useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios"
import { Context, server } from '../main';
import toast from "react-hot-toast"

const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(name, email, password);
            const { data } = await axios.post(`${server}/users/new`, {
                name,
                email,
                password
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            }
            );
            toast.success(data.message);
            setIsAuthenticated(true);
            setLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            setIsAuthenticated(false);
            setLoading(false);
        }
    }

    if(isAuthenticated) return <Navigate to={"/"} />
    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        value={name}
                        type='text'
                        placeholder='Name'
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        value={email}
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        value={password}
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button disabled={loading} type='submit'>Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Login</Link>
                </form>
            </section>
        </div>
    )
};

export default Register