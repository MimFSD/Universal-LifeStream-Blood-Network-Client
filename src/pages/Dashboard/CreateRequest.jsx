import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateRequest = () => {
    const { user } = useAuth();

        // //  sign up form 
    const { register, handleSubmit, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
           // Add the extra property inside the data
        data.donation_status = "pending";
        console.log(data);

           // send data to backend
        const createRequest = await axiosSecure.post('/create_all_requests', data);
        console.log(createRequest.data);
        if(createRequest.data.insertedId){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Request Successfully Done",
                showConfirmButton: false,
                timer: 1500
              });
        }
    }

             // ===========================================

        // showing division
    const [divisions, setDivisions] = useState([]);

    // default division
    const [defaultDivi, setDefaultDevi] = useState("Chattogram");

    // divitions with districts
    const [diviWithDistri, setDiviWithDistri] = useState([]);

    // district with upazila
    const [distWithUpazila, setDistiWithUpazila] = useState([]);

    // default district
    const [defaultDistri, setDefaultDistri] = useState("Bandarban");

    // default upazila
    const [defaultUpazila, setDefaultUpazila] = useState("Thanchi");

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
        <div className="mx-auto my-12">
            <h2 className="mb-8 text-center text-4xl text-[#ff0000] font-bold font-poetsen">Create Donation Request</h2>
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
                        <input type="text" placeholder="Recipient name" className="input input-bordered" {...register('recipient_name', { required: true })} />
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
                            <input type="date" className="px-4 py-2 rounded-lg" id="" {...register('donation_date', { required: true })} />
                            {errors.donation_date && <span className="text-red-600">Donation date is required</span>}
                        </div>
                        <div className="form-control md:w-1/2">
                            <label className="label">
                                <span className="label-text text-black font-bold text-base">Donation Time</span>
                            </label>
                            <input className="p-2 rounded-md" type="time" id="appt" {...register('donation_time', { required: true })}></input>
                            {errors.donation_time && <span className="text-red-600">Donation time is required</span>}
                        </div>
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Hospital Name</span>
                        </label>
                        <input type="text" placeholder="Hospital name" className="input input-bordered" {...register('hospital_name', { required: true })} />
                        {errors.hospital_name && <span className="text-red-600">Hospital name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Full Address</span>
                        </label>
                        <input type="text" placeholder="Full Address" className="input input-bordered" {...register('full_address', { required: true })} />
                        {errors.full_address && <span className="text-red-600">Full address is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-black font-bold text-base">Request Message</span>
                        </label>
                        <textarea {...register('request_message', { required: true })} id="" cols="30" rows="10" placeholder="Write a request message" className="p-4 rounded-lg"></textarea>
                        {errors.request_message && <span className="text-red-600">Request message is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn bg-white font-bold text-black text-base">Request Submition</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRequest;