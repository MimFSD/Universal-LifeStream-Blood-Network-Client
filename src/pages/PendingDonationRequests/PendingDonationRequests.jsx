import { useEffect, useState } from "react";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Navbar from "../../pages/Shared/Navbar/Navbar";
import { Link } from "react-router-dom";

const PendingDonationRequests = () => {
    const [donationRequests, setDonationRequests] = useState([]);

    useEffect(() => {
        axiosPublic('/donation_requests')
            .then(res => {
                setDonationRequests(res.data);
            })
    }, [])

    return (
        <div>
            <Navbar></Navbar>
            <div className="w-[90%] md:w-max-6xl mx-auto my-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th>#</th>
                                <th>Recipient Name</th>
                                <th>Division</th>
                                <th>District</th>
                                <th>Upazila</th>
                                <th>Donation Date</th>
                                <th>Donation Time</th>
                                <th>Status</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                donationRequests.map((request, index) => <tr
                                    key={index}
                                >
                                    <th>{index + 1}</th>
                                    <td>{request.recipient_name}</td>
                                    <td>{request.division}</td>
                                    <td>{request.district}</td>
                                    <td>{request.upazila}</td>
                                    <td>{request.donation_date}</td>
                                    <td>{request.donation_time}</td>
                                    <td><span className="bg-[#F8C3B9] text-red-700 py-2 px-4 rounded-2xl font-bold">{request.donation_status}</span></td>
                                    <td><Link to={`/requests_details/${request._id}`}><button className="btn bg-green-600 text-white">View Details</button></Link></td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PendingDonationRequests;