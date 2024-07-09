import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateRequest = () => {
    const { user } = useAuth();
    const requestData = useLoaderData();
    console.log(requestData.data);
    const {blood, district, division, donation_date, donation_status, donation_time, full_address, hospital_name, recipient_name, request_message, requester_email, requester_name, upazila, _id} = requestData.data;
    const navigate = useNavigate();

        // //  sign up form 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        // Add the extra property inside the data
        data.donation_status = "pending";
        console.log(data);

        // send data to backend
        const updateRequest = await axiosSecure.put(`/update_request/${_id}`, data);
        console.log(updateRequest.data);
        if(updateRequest.data.modifiedCount > 0){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your request Successfully Updated",
                showConfirmButton: false,
                timer: 1500
              });
              // redirect to Request Details page
              navigate(`/requests_details/${_id}`)
        }
    }

    // ===========================================

    // showing division
    const [divisions, setDivisions] = useState([]);

    // default division
    const [defaultDivi, setDefaultDevi] = useState(division);

    // divitions with districts
    const [diviWithDistri, setDiviWithDistri] = useState([]);

    // district with upazila
    const [distWithUpazila, setDistiWithUpazila] = useState([]);

    // default district
    const [defaultDistri, setDefaultDistri] = useState(district);

    // default upazila
    const [defaultUpazila, setDefaultUpazila] = useState(upazila);

    // default blood group
    const [defaultBlood, setDefaultBlood] = useState(blood);

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
    // console.log(distWithUpazila);

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

    // change blood group 
    const changeBlood = (event) => {
        setDefaultBlood(event.target.value);
        console.log(event.target.value);
    }

    return (
        <div className="mx-auto my-12">
            <h2 className="mb-8 text-center text-4xl text-[#ff0000] font-bold font-poetsen">Update Donation Request</h2>
            <div className="card shrink-0 w-[92%] lg:w-[70%] mx-auto shadow-2xl bg-[#ffd3cb]">
                <form className="card-body space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Requester Name</span>
                            </label>
                            <input type="text" placeholder="Your name" className="input input-bordered" {...register('requester_name', { required: true })} defaultValue={user?.displayName} readOnly />
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Requester Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register('requester_email', { required: true })} defaultValue={user?.email} readOnly />
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Recipient Name</span>
                        </label>
                        <input type="text" placeholder="Recipient name" className="input input-bordered" {...register('recipient_name', { required: true })} defaultValue={recipient_name} />
                        {errors.recipient_name && <span className="text-red-600">Recipient is required</span>}
                    </div>
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="form-control w-full md:w-1/2">
                            <label className="mb-2 font-bold text-base text-black" htmlFor="division">Division</label>
                            <select
                                {...register('division', { required: true })}
                                onChange={changeDivision}
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
                                onChange={changeDistrict}
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
                                onChange={changeUpazila}
                                value={defaultUpazila}
                                id="upazila"
                                className="p-2 rounded-lg">
                                {distWithUpazila.map((upazila, index) => <option key={index}>{upazila}</option>)}
                            </select>
                            {errors.upazila && <span className="text-red-600">Upazila is required</span>}
                        </div>
                        <div className="form-control w-full md:w-1/2">
                            <label className="mb-2 font-bold text-base text-black" htmlFor="blood">Blood Group</label>
                            <select
                                {...register('blood', { required: true })}
                                value={defaultBlood}
                                onChange={changeBlood}
                                id="blood"
                                className="p-2 rounded-lg"
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
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Donation Date</span>
                            </label>
                            <input type="date" className="px-4 py-2 rounded-lg" id="" {...register('donation_date', { required: true })} defaultValue={donation_date}/>
                            {errors.donation_date && <span className="text-red-600">Donation date is required</span>}
                        </div>
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Donation Time</span>
                            </label>
                            <input className="p-2 rounded-md" type="time" id="appt" {...register('donation_time', { required: true })} defaultValue={donation_time}></input>
                            {errors.donation_time && <span className="text-red-600">Donation time is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Hospital Name</span>
                        </label>
                        <input type="text" placeholder="Hospital name" className="input input-bordered" {...register('hospital_name', { required: true })} defaultValue={hospital_name}/>
                        {errors.hospital_name && <span className="text-red-600">Hospital name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Full Address</span>
                        </label>
                        <input type="text" placeholder="Full Address" className="input input-bordered" {...register('full_address', { required: true })} defaultValue={full_address}/>
                        {errors.full_address && <span className="text-red-600">Full address is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Request Message</span>
                        </label>
                        <textarea {...register('request_message', { required: true })} id="" cols="30" rows="10" placeholder="Write a request message" className="p-4 rounded-lg" defaultValue={request_message}></textarea>
                        {errors.request_message && <span className="text-red-600">Request message is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#ffef00] font-bold text-black text-base">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateRequest;