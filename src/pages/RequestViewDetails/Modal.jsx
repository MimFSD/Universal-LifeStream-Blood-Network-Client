import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import './style.css';
import { useForm } from 'react-hook-form';
import useCart from '../../hooks/useCart';


const Modal = ({ closeModal, id }) => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useCart();
    console.log(cart);

    // useEffect(() => {
    //     axiosSecure('/store_donor_info')
    //         .then(res => {
    //             console.log(res.data);
    //             setAlreadyExist(res.data);
    //         })
    // }, [axiosSecure])

    // hook form 
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        data.id = id;
        console.log(data);

        console.log(id);
        axiosSecure.patch(`/change_request_status/${id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Request status form pending to inprogress successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })


        const checkDuplicate = cart.find(info => info.id === id);
        console.log(checkDuplicate);
        if (!checkDuplicate) {
            axiosSecure.post('/store_donar_info', data)
                .then(res => {
                    console.log(res.data);
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-right",
                            icon: "success",
                            title: "Donor Info also stored to Database",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                    // refetch cart
                    refetch();
                })
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Already someone donated before !"
            });
        }
    }


    return (
        <>
            <div className="modal_wrapper"></div>
            <div className="modal_container">
                <div className="card shrink-0 w-full md:w-[350px] shadow-2xl bg-[#ffd3cb]">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-green-700">Donor Name</span>
                            </label>
                            <input {...register('donor_name', { required: true })} type="text" value={user.displayName} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-green-700">Donor Email</span>
                            </label>
                            <input {...register('donor_email', { required: true })} type="email" value={user.email} className="input input-bordered" readOnly />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-green-600 text-white text-base" type="submit">Confirm</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Modal;


// tutorial I followd to make this custom modal
// link: https://www.youtube.com/watch?v=GMaQPv5ZsR0
