import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loginImg from '../../assets/others/authentication2.png'

const SignUp = () => {
    const [isClicked, setIsClicked] = useState(true);

    const handleSignUp = (e) => {
        e.preventDefault();
    }

    const handleSignInWithGoogle = () => {

    }

    return (
        <div className='min-h-screen bg-bgImg flex items-center '>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className='w-4/5 mx-auto flex flex-row-reverse justify-center gap-0 items-center border-2 shadow-lg '>
                <div className='w-1/2 rounded-xl flex items-stretch'>
                    <img src={loginImg} className='rounded-xl rounded-tr-none rounded-br-none flex-grow' alt="" />
                </div>
                <div className={`card w-1/2  mx-auto p-6 rounded-xl rounded-tl-none rounded-bl-none`}>
                    <form onSubmit={handleSignUp} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name='name' placeholder="your name" className="input rounded-xl input-bordered" required />
                            <label className="label">
                                <span className="label-text">Photo-URL</span>
                            </label>
                            <input type="text" name='photo' placeholder="your photo-url" className="input rounded-xl input-bordered" required />
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input rounded-xl input-bordered" required />
                        </div>
                        <div className="form-control relative">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type={isClicked ? 'password' : 'text'} name='password' placeholder="password" className="input rounded-xl input-bordered" required />
                            <button type="button" onClick={() => setIsClicked(!isClicked)} className="absolute right-5 top-[3rem] text-2xl text-gray-700">
                                {
                                    isClicked ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                }
                            </button>
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary bg-btn_bg rounded-xl text-white">Sign Up</button>
                        </div>
                    </form>
                    <div className="text-center mt-6">
                        <span className="label-text">Already have an account? </span>
                        <Link to='/login' className="link link-hover">Log In</Link>
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

export default SignUp;