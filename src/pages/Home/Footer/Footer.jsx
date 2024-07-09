import { Link } from 'react-router-dom';
import logo from '../../../assets/image/logo.png';

const Footer = () => {
    return (
        <div className="bg-[#f8edeb] pt-16">
            <footer className="footer p-10 w-[90%] md:w-max-7xl mx-auto text-black">
                <nav>
                    <Link to='/'>
                        <img className="w-28 h-28 rounded-full" src={logo} alt="" />
                        <h3 className="text-5xl text-red-600 font-poetsen">Blood Chain</h3>
                    </Link>
                    {/* <h1 className="text-5xl font-bold mb-2">Blood Chain</h1> */}
                    <p className='text-black font-bold'>Voluntary Organization.<br /> Trusted and Reliable commitment to help as always.</p>
                </nav>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <footer className="footer footer-center p-4 bg-[#8d0801] text-base-content mt-24">
                <aside>
                    <p className='text-white'>Copyright © 2024 - All right reserved by Blood Chain Organization</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;