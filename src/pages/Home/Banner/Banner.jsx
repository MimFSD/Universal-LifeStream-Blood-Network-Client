// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Keyboard, Pagination, Navigation } from 'swiper/modules';

// custom css
import './Banner.css';

const Banner = () => {
    return (
        <>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                keyboard={{
                    enabled: true,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Keyboard, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div style={{
                        position: 'relative',
                        backgroundImage: `linear-gradient(to right, #151515, rgba(21, 21, 21, 0)), url('https://i.ibb.co/MhWH01Y/blood-donation-47.jpg')`,
                        backgroundSize: 'cover',
                        height: '100vh'
                    }}>
                        {/* Dark overlay */}

                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>

                        <div className='w-[90%] md:w-[70%] lg:w-[40%] mx-auto text-center pt-28'>
                            <h1 className='text-[#ff0000] text-5xl md:text-6xl mb-6 font-poetsen'>Be a Lifesaver, Give Blood</h1>
                            <div className='text-white'>
                                <p>Your blood donation can make a significant difference for those in need. Each pint donated helps multiple patients recover from surgeries and emergencies. The need for blood is constant, and your donation ensures healthcare providers can save lives. The process is simple and takes less than an hour. Become a lifesaver—donate blood and help build a healthier community.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        position: 'relative',
                        backgroundImage: `linear-gradient(to right, #151515, rgba(21, 21, 21, 0)), url('https://i.ibb.co/ZKzrwgY/blood-donation-18.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh'
                    }}>
                        {/* Dark overlay */}
                        
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>

                        <div className='w-[90%] md:w-[70%] lg:w-[40%] mx-auto text-center pt-28'>
                            <h1 className='text-[#ff0000] font-poetsen text-5xl md:text-6xl mb-6'>Save Lives, Donate Blood</h1>
                            <div className='text-white'>
                                <p>Donating blood is a crucial act of kindness that saves lives. Each donation supports patients in surgeries and treatments for serious illnesses. By donating, you help ensure a steady blood supply for emergencies. The process is quick, safe, and rewarding. Join us in our mission to save lives—donate blood today and make a significant impact on your community.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div style={{
                        position: 'relative',
                        backgroundImage: `linear-gradient(to right, #151515, rgba(21, 21, 21, 0)), url('https://i.ibb.co/FbnZRtV/blood-donation-17.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '100vh'
                    }}>
                        {/* Dark overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0)'
                        }}></div>

                        <div className='w-[90%] md:w-[70%] lg:w-[40%] mx-auto text-center pt-28'>
                            <h1 className='text-[#ff0000] font-poetsen text-5xl md:text-6xl mb-6'>Give the Gift of Life</h1>
                            <div className='text-white'>
                                <p>Donating blood is an easy yet powerful way to make a difference. Each donation you make can save up to three lives, providing essential support for accident victims, surgery patients, and those battling severe illnesses. The process is straightforward and takes only a short amount of your time, but its impact is immeasurable. Join us in sharing the gift of life—donate blood and help ensure a healthy, strong community.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                {/* <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide> */}
            </Swiper>
        </>
    );
};

export default Banner;