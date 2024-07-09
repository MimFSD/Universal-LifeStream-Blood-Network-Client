import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar/Navbar";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllBlogs = () => {
    const axiosPublic = useAxiosPublic();
    const [allContents, setAllContents] = useState([]);

    useEffect(() => {
        axiosPublic('/published_blogs')
        .then(res => {
            console.log(res.data);
            setAllContents(res.data);
        })
    })

    return (
        <div>
            <Navbar></Navbar>
            <div className="my-6 w-[90%] md:max-w-6xl mx-auto">
                <div className="w-[96%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                    {
                        allContents.map(content => (<div
                            key={content._id} className="card card-compact bg-base-100 shadow-xl flex flex-col">
                            <img className="w-full h-[220px] rounded-t-2xl object-cover" src={content.photo} alt="Shoes" />
                            <div className="card-body">
                                <h2 className="card-title font-bold text-black">{content.title}</h2>
                                {/* <div contentEditable='false' dangerouslySetInnerHTML={{ __html: content.detail_content }}></div> */}
                                
                                <div className="flex-grow">
                                    {content.detail_content.length > 170 ? <div contentEditable='false' dangerouslySetInnerHTML={{ __html: content.detail_content.slice(0, 170) }}></div> : <div contentEditable='false' dangerouslySetInnerHTML={{ __html: content.detail_content }}></div>}
                                </div>

                                {/* <div className="flex-grow">
                                {content.detail_content.length > 200 ?
                                    <p>{content.detail_content.slice(0, 200)}</p> :
                                    <p>{content.detail_content}</p>}
                            </div> */}

                                <div className="flex justify-end mt-2">
                                    <Link to={`/blog_details/${content._id}`}>
                                        <button className="btn bg-[#264653] text-white">View Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>))
                    }
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;