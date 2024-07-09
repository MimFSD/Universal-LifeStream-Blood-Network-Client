import { useContext, useEffect, useState } from "react";
import Navbar from "../Shared/Navbar/Navbar";

// react hook form
import { useForm } from "react-hook-form"
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProviders";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

console.log(import.meta.env.VITE_Image_Hosting_Key);
const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);

    // showing Districts
    const [allDivision, setAllDivision] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState("Dhaka");
    const [allDistricts, setAllDistricts] = useState([]);
    // showing Upazilas
    const [allUpazilas, setAllUpazilas] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [expectedUpazilas, setExpectedUpazilas] = useState([]);

    //  sign up form 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const [registerError, setRegisterErr] = useState([]);

    const onSubmit = async (data) => {
        console.log(data);

        // password validation 
        if (data.password.length < 6) {
            setRegisterErr('Password should be at least 6 character or longer!');
            return;
        }
        else if (!/[A-Z]/.test(data.password)) {
            setRegisterErr('Password should have at least one Uppercase cahracter!');
            return;
        }
        else if (!/[a-z]/.test(data.password)) {
            setRegisterErr('Password should have at least one Lowercase character!');
            return;
        }
        else if (!/[0-9]/.test(data.password)) {
            setRegisterErr('Password should have at least one Number');
            return;
        }

        // check password === confirm password
        if (data.password != data.confirm_password) {
            setRegisterErr('Password not mached with confirmed password');
            return;
        }

        // reset error 
        setRegisterErr('');


        // image upload to imgbb and then get an url 
        const formData = new FormData();
        formData.append('image', data.profile[0])
        const res = await axios.post(image_hosting_api, formData);
        console.log(res.data);
        console.log(res?.data?.data?.display_url);

        // create user 
        const email = data.email;
        const password = data.password;
        const name = data.name;
        const photoURL = res?.data?.data?.display_url;
        createUser(email, password)
            .then(() => {
                updateUserProfile(name, photoURL);
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your registration successfull",
                    showConfirmButton: false,
                    timer: 2000
                })
                    .then(async () => {
                        // form.reset();
                        navigate('/');

                        // sending user info to database 
                        if (res.data.success) {
                            // now send the menu item data to the server with the image url
                            const userData = {
                                name: data.name,
                                email: data.email,
                                division: data.division,
                                district: data.district,
                                upazila: data.upazila,
                                blood: data.blood,
                                profile: res?.data?.data?.display_url,
                                role: "donor",
                                status: "active"
                            }
                            const userDataRes = await axiosSecure.post('/user_data', userData)
                            console.log(userDataRes.data);
                            if (userDataRes.data.insertedId) {
                                // show success popup

                            }
                        }
                    })
            })
    };


    // showing Districts based on Division
    useEffect(() => {
        fetch('/DivisionToDistrict.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setAllDivision(data[0].divisions);
            });
    }, []);

    useEffect(() => {
        const selectedDivisionObj = allDivision.find(div => div.name === selectedDivision);
        if (selectedDivisionObj) {
            setAllDistricts(selectedDivisionObj.districts);
        }
    }, [selectedDivision, allDivision]);


    const handleDivisionChange = (event) => {
        setSelectedDivision(event.target.value);
    };

    // showing Upazilas based on dristic
    useEffect(() => {
        fetch('/DistrictsToUpazila.json')
            .then(res => res.json())
            .then(data => setAllUpazilas(data))
    }, [])

    const handleDistrictChange = (event) => {
        setSelectedDistrict(event.target.value);
    };

    useEffect(() => {
        const selectedDistrictsObj = allUpazilas.find(upazila => upazila.district === selectedDistrict);
        if (selectedDistrictsObj) {
            setExpectedUpazilas(selectedDistrictsObj.upazilas);
        }

    }, [allUpazilas, selectedDistrict])

    // console.log(allDivision);

    return (
        <div>
            <Navbar />

            <div className="flex flex-col md:flex-row justify-between my-14 w-[94%] lg:max-w-6xl mx-auto">
                <img className="w-full md:w-[35%]" src="https://i.ibb.co/gw8szCN/humans-2.png" alt="" />
                <div className="w-full md:w-[65%]">
                    <h2 className="mb-8 text-center text-6xl text-[#ff0000] font-bold font-poetsen">Register Now!</h2>
                    <div className="card shrink-0 w-full lg:w-[80%] mx-auto shadow-2xl bg-[#ffd3cb]">
                        <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-black font-bold text-base">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your name" className="input input-bordered" {...register('name', { required: true })} />
                                    {errors.name && <span className="text-red-600">Name is required</span>}
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="label">
                                        <span className="label-text text-black font-bold text-base">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" {...register('email', { required: true })} />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="mb-2 font-bold text-base text-black" htmlFor="division">Division</label>
                                    <select
                                        {...register('division', { required: true })}
                                        value={selectedDivision}
                                        onChange={handleDivisionChange}
                                        id="division"
                                        className="p-2 rounded-lg"
                                    >
                                        {allDivision.map((item, index) => (
                                            <option key={index} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                    {errors.division && <span className="text-red-600">Division is required</span>}
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="mb-2 font-bold text-base text-black" htmlFor="district">District</label>
                                    <select
                                        {...register('district', { required: true })}
                                        onChange={handleDistrictChange}
                                        id="district"
                                        className="p-2 rounded-lg">
                                        <option value="" disabled>Select district</option>
                                        {allDistricts.map((district, index) => (
                                            <option key={index} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {errors.district && <span className="text-red-600">District is required</span>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="form-control w-full md:w-1/2">
                                    <label className="mb-2 font-bold text-base text-black" htmlFor="upazila">Upazila</label>
                                    <select

                                        {...register('upazila', { required: true })}
                                        id="upazila"
                                        className="p-2 rounded-lg">
                                        <option value="" disabled>Select district than upazila</option>
                                        {expectedUpazilas.map((upazila, index) => (
                                            <option key={index} value={upazila}>{upazila}</option>
                                        ))}
                                    </select>
                                    {errors.upazila && <span className="text-red-600">Upazila is required</span>}
                                </div>
                                <div className="form-control w-full md:w-1/2">
                                    <label className="mb-2 font-bold text-base text-black" htmlFor="district">Blood Group</label>
                                    <select
                                        {...register('blood', { required: true })}
                                        id="blood"
                                        className="p-2 rounded-lg">
                                        <option value="" disabled>select blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                    {errors.blood && <span className="text-red-600">Blood group is required</span>}
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row justify-between gap-4">
                                <div className="form-control w-full md:w-1/2 relative">
                                    <label className="label">
                                        <span className="label-text text-black font-bold text-base">Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"} placeholder="password"
                                        className="input input-bordered"
                                        {...register('password', { required: true })} />
                                    <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-4 bottom-4 text-xl">
                                        {
                                            showPassword ? <IoEyeOff /> : <IoEye />
                                        }
                                    </span>
                                    <button className="">{ }</button>
                                    {errors.password && <span className="text-red-600">Password is required</span>}
                                </div>
                                <div className="form-control w-full md:w-1/2 relative">
                                    <label className="label">
                                        <span className="label-text text-black font-bold text-base">Confirm Password</span>
                                    </label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="confirm password" className="input input-bordered"
                                        {...register('confirm_password', { required: true })} />
                                    <span onClick={() => setShowPassword(!showPassword)} className="cursor-pointer absolute right-4 bottom-4 text-xl">
                                        {
                                            showPassword ? <IoEyeOff /> : <IoEye />
                                        }
                                    </span>
                                    {errors.confirm_password && <span className="text-red-600">Confirm password is required</span>}
                                </div>
                            </div>
                            <div className="form-control">
                                <label className="mb-2 font-bold text-base text-black" htmlFor="">Your Profile</label>
                                <input type="file" className="file-input w-full max-w-xs" {...register('profile', { required: true })} />
                                {errors.profile && <span className="text-red-600">Profile picture is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-white font-bold text-black">Register</button>
                            </div>
                            {
                                registerError && <p className="text-red-500 font-semibold text-center">{registerError}</p>
                            }
                            <p className="mt-6">Already have an account? <Link className="text-green-500 font-bold" to='/login'>Login Now</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
