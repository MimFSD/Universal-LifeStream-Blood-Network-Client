import { useLoaderData } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";

const BlogDetails = () => {
    const blogDetails = useLoaderData();
    console.log(blogDetails.data);
    const { title, photo, detail_content, status } = blogDetails.data;

    return (
        <div>
            <Navbar></Navbar>
            <div className="my-6">
                <div className="w-[90%] max-w-6xl mx-auto">
                    <div className="bg-[#ced4da] mt-8 mb-20 p-6 md:p-8 rounded-lg">
                        <div className="mb-8">
                            {/* <div contentEditable='false' dangerouslySetInnerHTML={{ __html: 'hello' }}></div> */}
                            <h2 className=" md:w-[70%] lg:w-[60%] text-4xl font-bold mb-4">
                                <div contentEditable='false' dangerouslySetInnerHTML={{ __html: title }}></div>
                                
                            </h2>
                            <span className="bg-green-700 text-white p-2 rounded-lg text-sm">{status}</span>
                        </div>

                        <img className="w-full h-[380px] md:h-[580px] object-cover" src={photo} alt="" />
                        <div className="space-y-4 mt-8">
                            <p>
                                <div contentEditable='false' dangerouslySetInnerHTML={{ __html: detail_content }}></div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;