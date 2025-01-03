import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loginImg from '../../assets/others/authentication2.png'

const Login = () => {
    const [isClicked, setIsClicked] = useState(true);

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    }

    const handleSignInWithGoogle = () => {

    }

    return (
        <div className='min-h-screen bg-bgImg flex items-center '>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className='w-4/5  mx-auto flex justify-center gap-0 items-center border-2 shadow-2xl'>
                <div className='w-1/2 rounded-xl'>
                    <img src={loginImg} className='rounded-xl rounded-tr-none rounded-br-none' alt="" />
                </div>
                <div className={`card w-1/2  mx-auto p-6 rounded-xl rounded-tl-none rounded-bl-none`}>
                    <form onSubmit={handleSignIn} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={isClicked ? 'password' : 'text'} name='password' placeholder="password" className="input rounded-xl input-bordered" required />
                            <button type='button' onClick={() => setIsClicked(!isClicked)} className="absolute right-5 top-[3rem] text-2xl text-gray-700">
                                {isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </button>
                            <label>
                                <Link to='/auth/forgetPassword' className="label-text-alt link link-hover">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary bg-btn_bg rounded-xl text-white">Login</button>
                        </div>
                    </form>
                    <div className="text-center mt-6">
                        <span className="label-text">Don't have an account yet? </span>
                        <Link to='/signup' className="link link-hover">Sign Up</Link>
                    </div>
                    <div className="w-full flex justify-center py-6">
                        <button
                            onClick={handleSignInWithGoogle}
                            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-600 rounded-lg shadow hover:shadow-md transition-all duration-300 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <FcGoogle size={24} />
                            <span className="text-lg font-medium">Log In with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;