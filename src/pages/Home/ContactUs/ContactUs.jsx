const ContactUs = () => {
    return (
        <div className="my-20">
            <h2 className="text-5xl font-bold mb-6 text-center text-[#bf0603]">Contact Us</h2>
            <div className="w-[90%] md:max-w-7xl mx-auto hero min-h-screen bg-[#e5e5e5] rounded-xl">
                <div className="hero-content flex-col lg:flex-row-reverse md:px-16">
                    <div className="text-center lg:text-left md:ml-24 text-black">
                        <h1 className="text-5xl font-bold">Volunteer Support</h1>
                        <p className="py-6">Assistance and guidance provided to individuals who want to volunteer for blood donation drives, including answering queries and providing necessary information.</p>
                    </div>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body space-y-2">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black font-bold">Name</span>
                                </label>
                                <input type="text" placeholder="Enter your name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-black font-bold">Phone Number</span>
                                </label>
                                <input type="text" placeholder="Enter your phone number" className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-black text-white text-base">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;