import { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';

// image key 
const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditBlog = () => {
    const expectedData = useLoaderData();
    const axiosSecure = useAxiosSecure();
    const { _id, title, photo, detail_content } = expectedData.data;    
    console.log(expectedData.data);
    const navigate = useNavigate();

    const editor = useRef(null);
    const [content, setContent] = useState(detail_content || '');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: title || '',
            photo: photo || null,
            detail_content: detail_content || ''
        }
    });

    useEffect(() => {
        // Register the detail_content field manually
        register('detail_content', { required: true });
    }, [register]);

    useEffect(() => {
        // Set the initial value of the editor content
        setValue('detail_content', detail_content);
    }, [detail_content, setValue]);

    const onSubmit = async (data) => {
        // Add the editor content to the form data
        data.detail_content = content;
        console.log(data.detail_content);

        // image upload to imgbb and then get an URL
        if (data.photo[0]) {
            const formData = new FormData();
            formData.append('image', data.photo[0]);
            const res = await axios.post(image_hosting_api, formData);
            console.log(res.data);
            console.log(res?.data?.data?.display_url);

            // Update the photo URL in the form data
            data.photo = res?.data?.data?.display_url;
        } else {
            data.photo = photo; // Keep the existing photo if no new photo is uploaded
        }

        data.status = 'draft';
        console.log(data);

        axiosSecure.put(`/update_blog/${_id}`, data)
        .then(res => {
            console.log(res.data);
            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "The post has been updated successfully",
                    showConfirmButton: false,
                    timer: 1500
                });
                // navigate
                navigate('/dashboard/content_management');
            }
        });
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-black text-center mt-8 mb-6">Edit Blog</h1>
            <div className="card shrink-0 w-full md:w-[60%] mx-auto shadow-2xl bg-[#2f4858]">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-white font-semibold text-base">Blog Title</span>
                        </label>
                        <input
                            {...register('title', { required: true })}
                            type="text" placeholder="Blog Title" className="input input-bordered" />
                        {errors.title && <span className="text-red-500">Title is required</span>}
                    </div>
                    <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text text-white font-semibold text-base">Select a photo</span>
                        </label>
                        <input
                            {...register('photo', { required: true })}
                            type="file" className="file-input w-full max-w-xs" />
                        {errors.photo && <span className="text-red-500">Photo is required</span>}
                    </div>
                    <div className="form-control mb-8">
                        <label className="label">
                            <span className="label-text text-white font-semibold text-base">Content</span>
                        </label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            tabIndex={1}
                            onChange={newContent => {
                                setContent(newContent);
                                setValue('detail_content', newContent);
                            }}
                        />
                        {errors.detail_content && <span className="text-red-500">Content is required</span>}
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn bg-white">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlog;
