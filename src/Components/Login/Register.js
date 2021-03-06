import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import bg from '../../assets/images/login-bg.jpg'
import auth from '../firebase/firebase.init';
import Loading from '../Loading/Loading';
const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const [createUserWithEmailAndPassword, user, loading, error,] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, uError] = useUpdateProfile(auth);
    const navigate = useNavigate()
    if( gLoading || loading || updating){
        return <Loading></Loading>
    }
    if(gUser || user){
        navigate('/')
    }
    const handeRegister = async (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({displayName:name});
        alert('Account Successfully Created')
    }
    return (
        <div>
            <div style={{
                background: `url(${bg})`,
                backgroundPosition: 'center'
            }} class="hero min-h-screen">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center lg:text-left">
                        <h1 class="text-5xl font-bold">Register now!</h1>
                        <p class="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div class="card-body">
                            <h2 class="text-2xl font-semibold text-center">Register</h2>
                            <form onSubmit={handeRegister}>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Name" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="email" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" class="input input-bordered" />
                                
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn">Register</button>
                                <p class="text-sm mt-2">Already have account ? <Link class="text-secondary"to="/login">Please login here</Link></p>
                            </div>
                            </form>
                            <div class="divider">OR</div>
                        <button onClick={()=>signInWithGoogle()} class="btn btn-outline">Continue with Google</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;