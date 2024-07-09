import { Link } from "react-router-dom";
import useContentBlogs from "../../hooks/useContentBlogs";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContentManagement = () => {
    const [contents, refetch] = useContentBlogs();
    const [allContents, setAllContents] = useState(contents);
    const [allContentsTo, setAllContentsTo] = useState(contents);
    const axiosSecure = useAxiosSecure();
    console.log(allContentsTo);

    useEffect(() => {
        setAllContents(contents);
        setAllContentsTo(contents);
    }, [contents])

    const handlePublish = id => {
        axiosSecure.patch(`/update_blog_status/${id}`)
            .then(res => {
                console.log(res.data);
                // refetch data
                refetch();
            })
    }

    const handleUnpublish = id => {
        axiosSecure.patch(`/update_blog_status_publish/${id}`)
            .then(res => {
                console.log(res.data);
                // refetch data 
                refetch();
            })
    }

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
                axiosSecure.delete(`/delete_blog/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The blog successfully deleted",
                                icon: "success"
                            });
                            // refetch
                            refetch();
                        }
                    })
            }
        });
    }

    const sortStatus = (status) => {
        // console.log(status);
        if (status != 'all') {
            console.log('hello')
            console.log(allContentsTo);
            const filtereStatus = allContentsTo.filter(content => content.status === status);
            console.log(filtereStatus);
            setAllContents(filtereStatus);
        }
        else {
            setAllContents(allContentsTo);
        }
    };
    // console.log(requestList);

    return (
        <div className="my-6">
            {/* <h2 className="text-4xl font-bold text-[#ff0054] text-center">Content Management</h2> */}
            <div className="w-[90%] mx-auto mt-10 flex justify-end">
                <Link to='/dashboard/add_blog'>
                    <button className="btn bg-[#ff0054] text-white px-12 ">Add Blog</button>
                </Link>
            </div>
            <div className="dropdown dropdown-bottom dropdown-end w-[94%] flex justify-end">
                <div tabIndex={0} role="button" className="btn m-1 text-white bg-[#2f3e46]">Filter</div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#2f3e46] text-white font-semibold rounded-box w-52 mt-4">
                    <li onClick={() => sortStatus('all')}><a>All</a></li>
                    <li onClick={() => sortStatus('draft')}><a>Draft</a></li>
                    <li onClick={() => sortStatus('published')}><a>Published</a></li>
                </ul>
            </div>
            <div className="w-[96%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                {
                    allContents.map(content => (<div
                        key={content._id} className="card card-compact bg-base-100 shadow-xl flex flex-col">
                        <img className="w-full h-[220px] rounded-t-2xl object-cover" src={content.photo} alt="Shoes" />
                        <div className="card-body">
                            <h2 className="card-title font-bold">{content.title}</h2>
                            {/* <div contentEditable='false' dangerouslySetInnerHTML={{ __html: content.detail_content }}></div> */}
                            <div className="flex-grow">
                                {content.detail_content.length > 170 ? <div contentEditable='false' dangerouslySetInnerHTML={{ __html: content.detail_content.slice(0, 170) }}></div> : <div contentEditable='false' dangerouslySetInnerHTML={{ __html: content.detail_content }}></div>}
                            </div>
                            {/* <div className="flex-grow">
                                {content.detail_content.length > 200 ?
                                    <p>{content.detail_content.slice(0, 200)}</p> :
                                    <p>{content.detail_content}</p>}
                            </div> */}
                            <div className="flex justify-end gap-2 mt-2">
                                {content.status === 'draft' ? <button onClick={() => handlePublish(content._id)} className="btn bg-green-700 text-white">Publish</button> : content.status === 'published' ? <button onClick={() => handleUnpublish(content._id)} className="btn bg-[#0d1b2a] text-white">Unpublish</button> : ''}
                                <Link to={`/dashboard/edit_blog/${content._id}`}>
                                    <button className="btn bg-[#ffd60a] text-black">Edit Blog</button>
                                </Link>
                                <button onClick={() => handleDelete(content._id)} className="btn bg-[#d90429] text-white">Delete</button>
                            </div>
                        </div>
                    </div>))
                }
            </div>
        </div>
    );
};

export default ContentManagement;