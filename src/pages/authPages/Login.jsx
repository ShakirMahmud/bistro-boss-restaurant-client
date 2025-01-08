import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import loginImg from '../../assets/others/authentication2.png'
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
    const [isClicked, setIsClicked] = useState(true);
    const captchaRef = useRef(null);
    const { userLogin, setUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    const postToDB = (user) => {
        axiosPublic.post('/users', user)
            .then(data => {
                if (data.data.insertedId) {
                    console.log('User added to DB');
                }
            })
    }

    const sweetAlert = () => {
        Swal.fire({
            title: "Sign-Up Successful!",
            text: "You have successfully signed in. You will be redirected shortly, or click OK to proceed immediately.",
            icon: "success",
            confirmButtonText: "OK",
            timer: 2000,
            timerProgressBar: true,
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                navigate(location.state?.from ? location.state.from : '/');
            }
        });
    };

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleSignIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const captcha = captchaRef.current.value;
        //TODO: required captcha validation
        // if (!validateCaptcha(captcha)) {
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Invalid Captcha',
        //         toast: true,
        //         position: 'top-end',
        //         timer: 3000,
        //         timerProgressBar: true,
        //         showConfirmButton: false,
        //     })
        //     return;
        // }
        userLogin(email, password)
            .then((result) => {
                setUser(result.user);
                sweetAlert();
            })
            .catch(() => {
                Swal.fire({
                    title: "Sign-In Failed!",
                    text: 'Wrong email or password',
                    icon: "error",
                    confirmButtonText: "Try Again",
                })
            })
    };


    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then((result) => {
                setUser(result.user);
                const user = { name: result.user.displayName, photo: result.user.photoURL, email: result.user.email };
                postToDB(user);
                sweetAlert();
            })
            .catch((error) => {
                Swal.fire({
                    title: "Sign-In Failed!",
                    text: 'An error occurred while signing in with Google',
                    icon: "error",
                    confirmButtonText: "Try Again",
                })
            })
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
                        <div className="form-control">
                            <label className="label">
                                <LoadCanvasTemplate />
                            </label>
                            {/* TODO: required captcha validation */}
                            <input ref={captchaRef} type='text' name='captcha' placeholder="Type the captcha here" className="input rounded-xl input-bordered"  />
                        </div>
                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-primary bg-[#BB8506] border-none rounded-xl text-white">Login</button>
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