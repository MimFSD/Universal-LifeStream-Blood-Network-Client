
const Featured = () => {
    return (
        <div className="my-20">
            <h2 className="text-5xl font-bold mb-12 text-center text-[#bf0603]">Featured</h2>
            <div className="w-[90%] mx:w-max-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/bskCPbW/blood-donation-69.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#fdfcdc] font-bold text-2xl">Charitable Giving</h2>
                        <p>Refers to the act of donating money, goods, services, or time to support a cause or help those in need.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/wgbgkkw/blood-donation-15.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#fdfcdc] font-bold text-2xl">Fundraising Campaign</h2>
                        <p>Organized efforts to collect funds for a specific purpose, often involving events, online drives, and promotional activities.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/GxMNHYL/blood-donation-70.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#fdfcdc] font-bold text-2xl">Philanthropy</h2>
                        <p>The practice of giving money and time to help make life better for other people, typically through structured and strategic efforts by individuals or organizations.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/1J60PT3/blood-donation-74.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#fdfcdc] font-bold text-2xl">Nonprofit Donation</h2>
                        <p>Contributions made to nonprofit organizations that rely on donations to fund their operations and missions.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/CzSM92T/blood-donation-33.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#fdfcdc] font-bold text-2xl">Crowdfunding</h2>
                        <p>A method of raising small amounts of money from a large number of people, typically via the Internet, to fund a project or cause.</p>
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl image-full">
                    <figure><img src="https://i.ibb.co/0qG5Fwn/blood-donation-44.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title text-[#fdfcdc] font-bold text-2xl">In-Kind Donations</h2>
                        <p>Non-monetary contributions such as goods or services that are given to support an organization or cause.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Featured;