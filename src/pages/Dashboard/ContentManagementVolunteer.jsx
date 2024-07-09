import { Link } from "react-router-dom";
import useContentBlogs from "../../hooks/useContentBlogs";
import { useEffect, useState } from "react";

const ContentManagementVolunteer = () => {
    const [contents] = useContentBlogs();
    const [allContents, setAllContents] = useState(contents);
    const [allContentsTo, setAllContentsTo] = useState(contents);
    console.log(allContentsTo);

    useEffect(() => {
        setAllContents(contents);
        setAllContentsTo(contents);
    }, [contents])

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

                            <div className="flex justify-end mt-2">
                                <Link to={`/dashboard/edit_blog/${content._id}`}>
                                    <button className="btn bg-[#ffd60a] text-black">Edit Blog</button>
                                </Link>
                            </div>
                        </div>
                    </div>))
                }
            </div>
        </div>
    );
};

export default ContentManagementVolunteer;