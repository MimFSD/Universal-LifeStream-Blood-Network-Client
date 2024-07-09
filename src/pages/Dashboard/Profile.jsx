import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Profile = () => {
    const { user } = useAuth();
    const [userData, setUserData] = useState({});
    const { profile, name, email, division, district, upazila, blood } = userData;
    const axiosSecure = useAxiosSecure();
    const [editable, setEditable] = useState(false);

    // showing division
    const [divisions, setDivisions] = useState([]);

    // default division
    const [defaultDivi, setDefaultDevi] = useState([]);

    // divitions with districts
    const [diviWithDistri, setDiviWithDistri] = useState([]);

    // district with upazila
    const [distWithUpazila, setDistiWithUpazila] = useState([]);

    // default district
    const [defaultDistri, setDefaultDistri] = useState([]);

    // default upazila
    const [defaultUpazila, setDefaultUpazila] = useState([]);

    // react hook form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        console.log(data);

        const updateProfile = await axiosSecure.put(`/update_my_profile/${user.email}`, data)
        if (updateProfile.data.modifiedCount > 0) {
            console.log(updateProfile.data);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your profile successfully updated",
                showConfirmButton: false,
                timer: 1500
            });
            setEditable(false)
        }
    }

    // fetching division names
    useEffect(() => {
        fetch('/DivisionToDistrict.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data[0].divisions);
                // all divisions name only
                const allDivisions = data[0].divisions;
                const findDivisions = allDivisions.map(division => division.name);
                setDivisions(findDivisions);

                // divisions name and districts name in an object
                const divisionsObject = data[0].divisions;
                const expectedObject = divisionsObject.find(object => object.name === defaultDivi);
                setDiviWithDistri(expectedObject.districts);
            })
    }, [defaultDivi])

    // fetching district names
    useEffect(() => {
        fetch('/DistrictsToUpazila.json')
            .then(res => res.json())
            .then(data => {
                const findDistricts = data.find(district => district.district === defaultDistri);
                setDistiWithUpazila(findDistricts.upazilas);
            })
    }, [defaultDistri])
    console.log(distWithUpazila);

    // fetching user data
    useEffect(() => {
        if(user?.email){
            axiosSecure(`/user_data/${user.email}`)
            .then(res => {
                setDefaultDevi(res.data.division);
                setDefaultDistri(res.data.district);
                setDefaultUpazila(res.data.upazila);
                setUserData(res.data);

            })
        }
    }, [axiosSecure, user?.email]);
    console.log(userData);

    // change division 
    const changeDivision = (event) => {
        setDefaultDevi(event.target.value);
        console.log(event.target.value);
    }

    // change district
    const changeDistrict = (event) => {
        setDefaultDistri(event.target.value);
        console.log(event.target.value);
    }

    // change upazila
    const changeUpazila = (event) => {
        setDefaultUpazila(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div>
            <h2 className="text-center text-5xl text-[#ff0000] font-bold font-poetsen mt-12">Profile</h2>
            <img src={profile} className="w-[170px] h-[170px] object-cover rounded-full mx-auto my-8" alt="" />
            {editable ? <></>
                : <div className="flex justify-center">
                    <button onClick={() => setEditable(true)} className="btn bg-[#ffea00] text-base font-bold">Edit Profile</button>
                </div>
            }
            <div className="card shrink-0 w-[92%] lg:w-[70%] mt-4 mb-12 mx-auto shadow-2xl bg-[#ffd3cb]">
                <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Name</span>
                            </label>
                            <input type="text" placeholder="Your name" className="input input-bordered" {...register('name', { required: true })} defaultValue={user?.displayName} readOnly={!editable} />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register('email', { required: true })} defaultValue={user?.email} readOnly />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="mb-2 font-bold text-base text-black" htmlFor="division">Division</label>
                            <select
                                {...register('division', { required: true })}
                                onChange={editable ? changeDivision : undefined}
                                value={defaultDivi}
                                id="division"
                                className="p-2 rounded-lg"
                            >
                                {
                                    divisions.map((division, index) => <option key={index}>{division}</option>)
                                }
                            </select>
                            {errors.division && <span className="text-red-600">Division is required</span>}
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="mb-2 font-bold text-base text-black" htmlFor="district">District</label>
                            <select
                                {...register('district', { required: true })}
                                onChange={editable ? changeDistrict : undefined}
                                value={defaultDistri}
                                id="district"
                                className="p-2 rounded-lg">
                                {diviWithDistri.map((district, index) => <option key={index}>{district}</option>)}
                            </select>
                            {errors.district && <span className="text-red-600">District is required</span>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="mb-2 font-bold text-base text-black" htmlFor="district">Upazila</label>
                            <select
                                {...register('upazila', { required: true })}
                                onChange={editable ? changeUpazila : undefined}
                                value={defaultUpazila}
                                id="upazila"
                                className="p-2 rounded-lg">
                                {distWithUpazila.map((upazila, index) => <option key={index}>{upazila}</option>)}
                            </select>
                            {errors.upazila && <span className="text-red-600">District is required</span>}
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="mb-2 font-bold text-base text-black" htmlFor="blood">Blood Group</label>
                            <select
                                {...register('blood', { required: true })}
                                id="blood"
                                className="p-2 rounded-lg"
                                disabled={!editable} // Conditionally disable the select
                            >
                                <option value="" disabled>Select blood group</option>
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
                    {editable && <div className="form-control mt-6">
                        <button className="btn bg-green-600 font-bold text-white text-base">Save</button>
                    </div>}
                </form>
            </div>
        </div>
    );
};

export default Profile;
