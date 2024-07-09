import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useMyRequests from "../../hooks/useMyRequests";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";

const MyDonationRequests = () => {
    const [requests, refetch] = useMyRequests();
    const [requestList, setRequestList] = useState(requests);
    const axiosSecure = useAxiosSecure();
    // const [sortingData, setSortingData] = useState([]);
    console.log(requests);

    useEffect(() => {
        setRequestList(requests);
    }, [requests])

    // let's update donor status to done
    const changeStatusDone = id => {
        console.log(id);
        axiosSecure.patch(`/change_status_done/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Status Changes to Done",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // refetch request data
                    refetch();
                }
            })
    }
    // let's update donor status to cancel
    const changeStatusCancel = id => {
        console.log(id);
        axiosSecure.patch(`/change_status_cancel/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Status Changes to Cancel",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // refetch requests data
                    refetch();
                }
            })
    }

    // delete request 
    const handleDelete = id => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/request_delete/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                        // refetch 
                        refetch();
                    })
            }
        });
    }

    const sortStatus = (status) => {
        if (status !== 'all') {
            const filteredRequests = requests.filter(request => request.donation_status === status);
            setRequestList(filteredRequests);
        }
        else {
            setRequestList(requests);
        }
    };
    console.log(requestList);

    return (
        <div className="my-12">
            <h1 className="text-4xl text-green-700 font-bold text-center">My Donation Requests</h1>
            <div className="dropdown dropdown-bottom dropdown-end w-[90%] flex justify-end">
                <div tabIndex={0} role="button" className="btn m-1 text-white bg-[#ff0000]">Select Status</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#ff0000] text-white font-semibold rounded-box w-52">
                    <li onClick={() => sortStatus('all')}><a>All</a></li>
                    <li onClick={() => sortStatus('pending')}><a>Pending</a></li>
                    <li onClick={() => sortStatus('inprogress')}><a>Inprogress</a></li>
                    <li onClick={() => sortStatus('done')}><a>Done</a></li>
                    <li onClick={() => sortStatus('cancel')}><a>Canceled</a></li>
                </ul>
            </div>
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
                                <th className="text-center">Status</th>
                                <th>Details</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requestList.map((request, index) => <tr
                                    key={index}
                                >
                                    <th>{index + 1}</th>
                                    <td>{request.recipient_name}</td>
                                    <td>{request.division}</td>
                                    <td>{request.district}</td>
                                    <td>{request.upazila}</td>
                                    <td>{request.donation_date}</td>
                                    <td>{request.donation_time}</td>
                                    <td className="text-center">
                                        {request.donation_status === 'inprogress' ? (
                                            <> {/* Wrap elements in a fragment */}
                                                <div className="flex gap-1">
                                                    <Link key="done-button">
                                                        <button
                                                            onClick={() => changeStatusDone(request._id)}
                                                            className="btn btn-sm bg-green-600 text-white"
                                                        >
                                                            Done
                                                        </button>
                                                    </Link>
                                                    <Link key="cancel-button">
                                                        <button
                                                            onClick={() => changeStatusCancel(request._id)}
                                                            className="btn btn-sm bg-yellow-400 text-black"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </Link>
                                                </div>
                                            </>
                                        ) : (
                                            <span
                                                className={`bg-[#F8C3B9] ${request.donation_status === 'done' ? 'bg-green-600' : ''} ${request.donation_status === 'cancel' ? 'bg-yellow-400' : ''} ${request.donation_status === 'done' ? 'text-white' : ''} ${request.donation_status === 'pending' ? 'text-red-600' : ''} ${request.donation_status === 'inprogress' ? 'text-white' : ''} ${request.donation_status === 'cancel' ? 'text-black' : ''} py-2 px-4 rounded-2xl font-bold`}
                                            >
                                                {request.donation_status}
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <Link to={`/requests_details/${request._id}`}><button className="btn bg-green-600 text-white w-28">View Details</button></Link>
                                    </td>
                                    <td>
                                        <Link to={`/update_request/${request._id}`}><button className="btn bg-[#006ee9] text-white w-28">Edit</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(request._id)} className="btn bg-[#ff0000] text-white w-28">Delete</button>
                                    </td>
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyDonationRequests;