import { useRef, useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

// image key 
const image_hosting_key = import.meta.env.VITE_Image_Hosting_Key;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddBlog = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const editor = useRef(null);
    const [content, setContent] = useState('');

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
                // Register the detail_content field manually
        register('detail_content', { required: true });
    }, [register]);

    const onSubmit = async (data) => {
        // Add the editor content to the form data
        data.detail_content = content;
        console.log(data.detail_content);


        // image upload to imgbb and then get an URL
        const formData = new FormData();
        formData.append('image', data.photo[0]);
        const res = await axios.post(image_hosting_api, formData);
        console.log(res.data);
        console.log(res?.data?.data?.display_url);

         // ======
        data.photo = res?.data?.data?.display_url;
        data.status = 'draft';
        console.log(data);

        axiosSecure.post('/all_blogs', data)
        .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "New post has been created successfully",
                    showConfirmButton: false,
                    timer: 1500
                  });
                //   navigate 
                navigate('/dashboard/content_management');
            }
        })
    };

    return (
        <div>
            <h1 className="text-4xl font-bold text-black text-center mt-8 mb-6">Add Blog</h1>
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

export default AddBlog;
