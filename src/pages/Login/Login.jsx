import { useForm } from "react-hook-form";
import Navbar from "../Shared/Navbar/Navbar";
import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const [loginError, setLoginError] = useState([]);
    const [showPassword, setShowPassword] = useState(true);
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);

        // reset error
        setLoginError('');

        // login
        const email = data.email;
        const password = data.password;

        login(email, password)
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Logged in successfully",
                    showConfirmButton: false,
                    timer: 2000
                })
                navigate('/');
                    // .then(() => {
                    //     navigate('/');
                    //     // reset form
                    //     // form.reset();
                    //     // Navigate after login
                    //     // navigate(location?.state ? location.state : '/');
                    // })
            })
            .catch(() => {
                setLoginError('Your email or password incorrect, try again');
            })
    }


    return (
        <div className="">
            <Navbar></Navbar>

            <div className="flex flex-col md:flex-row justify-between my-14 w-[94%] lg:max-w-6xl mx-auto">
                <img className="w-full md:w-1/2" src="https://i.ibb.co/r48DJMB/humans-1.png" alt="" />
                <div className="w-full md:w-1/2">
                    <h2 className="mb-8 text-center text-5xl text-[#ff0000] font-bold font-poetsen">Please Login</h2>
                    <div className="card shrink-0 w-full lg:w-[80%] mx-auto shadow-2xl bg-[#ffd3cb]">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black font-bold">Email</span>
                                </label>
                                <input {...register('email', { required: true })} type="email" placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">Name is required</span>}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text text-black font-bold">Password</span>
                                </label>
                                <input 
                                {...register('password', { required: true })} 
                                type={showPassword ? "text" : "password"} 
                                placeholder="password" 
                                className="input input-bordered" />
                                <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-4 bottom-4 text-xl">
                                    {
                                        showPassword ? <IoEyeOff /> : <IoEye />
                                    }
                                </span>
                                {errors.password && <span className="text-red-500">Name is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-white font-bold">Login</button>
                            </div>
                            {
                                loginError && <p className="text-red-500 font-semibold text-center">{loginError}</p>
                            }
                            <p className="mt-6">Dont have an account? <Link className="text-green-500 font-bold" to='/sign_up'>Register Now!</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;