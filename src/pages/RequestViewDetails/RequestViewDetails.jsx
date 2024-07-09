import { useLoaderData } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import { useState } from "react";
import Modal from "./Modal";

const RequestViewDetails = () => {
    const requestsDetail = useLoaderData();
    const { _id, requester_name, requester_email, recipient_name, division, district, upazila, blood, donation_date, donation_time, donation_status, hospital_name, full_address, request_message } = requestsDetail.data;
    // console.log(requestsDetail.data);
    const [showModal, setShowModal] = useState(false);

    

    // new component for modal 
    const closeModal = () => setShowModal(false);

    return (
        <div>
            <Navbar></Navbar>
            <h2 className="text-center text-5xl text-[#ff0000] font-bold font-poetsen mt-12">Request Details</h2>
            <div className="w-[92%] md:w-[85%] lg:w-[70%] mx-auto bg-[#ffd3cb] my-8 px-8 py-12 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Requester Name :</h3>
                        <h3>{requester_name}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Requester Email :</h3>
                        <h3>{requester_email}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Recipient Name :</h3>
                        <h3>{recipient_name}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Division :</h3>
                        <h3>{division}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">District :</h3>
                        <h3>{district}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Upazila :</h3>
                        <h3>{upazila}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Blood Group :</h3>
                        <h3 className="text-[#ff0000] text-xl font-bold">{blood}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Donation Date :</h3>
                        <h3>{donation_date}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Donation Time :</h3>
                        <h3>{donation_time}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Donation Status :</h3>
                        <h3>{donation_status}</h3>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white py-4 px-6 rounded-lg flex flex-col lg:flex-row gap-2">
                        <h3 className="text-black text-lg font-bold">Hospital Name :</h3>
                        <h3>{hospital_name}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg ">
                        <h3 className="text-black text-lg font-bold">Full Address :</h3>
                        <h3>{full_address}</h3>
                    </div>
                    <div className="bg-white py-4 px-6 rounded-lg space-y-1">
                        <h3 className="text-black text-lg font-bold">Request Message :</h3>
                        <h3>{request_message}</h3>
                    </div>
                    <button onClick={() => setShowModal(true)} className="btn bg-[#ff0000] text-white font-bold w-full text-base" aria-label="Donate blood">Donate</button>
                </div>
            </div>

            {/* show modal here */}
            { showModal && <Modal closeModal={closeModal} id={_id}></Modal> }

        </div>
    );
};

export default RequestViewDetails;