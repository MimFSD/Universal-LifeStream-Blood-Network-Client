import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAllUsers from "../../hooks/useAllUsers";

const AllUsers = () => {
    const [allUsers, refetch] = useAllUsers();
    const [allUsersData, setAllUsersData] = useState(allUsers);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setAllUsersData(allUsers);
    }, [allUsers])

    const handleBlock = id => {
        axiosSecure.patch(`/update_status_by_admin/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch data
                    refetch();
                }
            })
    }
    const handleActive = id => {
        axiosSecure.patch(`/update_status_by_admin_active/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch data
                    refetch();
                }
            })
    }

    const handleVolanteer = id => {
        axiosSecure.patch(`/make_role_volunteer/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch data
                    refetch();
                }
            })
    }
    const handleAdmin = id => {
        axiosSecure.patch(`/make_role_admin/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    // refetch data
                    refetch();
                }
            })
    }

    return (
        <div className="my-12">
            <h1 className="text-4xl text-green-700 font-bold text-center">All Users</h1>
            <div className="w-[90%] md:w-max-6xl mx-auto my-8">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr className="">
                                <th>#</th>
                                <th>Profile</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Unblock</th>
                                <th>Block</th>
                                <th>Role</th>
                                <th>Make Volunteer</th>
                                <th>Make Admin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsersData.map((request, index) => <tr
                                    key={index}
                                >
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={request.profile} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-24">{request.name}</td>
                                    <td>{request.email}</td>
                                    <td className="font-semibold text-black">{request.status}</td>
                                    <td>
                                        <button onClick={() => handleActive(request._id)} className="btn btn-sm bg-green-600 text-white" disabled={request.status === 'active'}>Unblock</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleBlock(request._id)} className="btn btn-sm bg-red-600 text-white" disabled={request.status === 'blocked'}>Block</button>
                                    </td>
                                    <td className="font-semibold text-black">{request.role}</td>
                                    <td>
                                        <button onClick={() => handleVolanteer(request._id)} className="btn btn-sm bg-[#023047] text-white" disabled={request.role === 'volunteer'}>Volunteer</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleAdmin(request._id)} className="btn btn-sm bg-red-600 text-white" disabled={request.role === 'admin'}>Admin</button>
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

export default AllUsers;