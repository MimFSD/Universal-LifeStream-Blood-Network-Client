import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/image/logo.png";
import useAuth from "../../../hooks/useAuth";

// react toastify 
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
    const { user, logOut } = useAuth();

    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/donation_requests'>Donation Requests</NavLink></li>
        <li><NavLink to='/all_blogs'>Published Blogs</NavLink></li>
    </>

    // logout 
    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.warning('User Logged out');
            })
            .catch()
    }

    return (
        <div className="bg-[#f8edeb] py-2">
            <div className="max-w-6xl mx-auto navbar">
                <div className="navbar-start">
                    <div className="dropdown z-50">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to='/' className="flex items-center gap-4">
                        <img className="w-16 h-16 rounded-full" src={logo} alt="" />
                        <h3 className="text-2xl md:text-4xl text-red-600 font-poetsen">Blood Chain</h3>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>

                <div className="navbar-end">
                    {user ? <div className="dropdown dropdown-end z-50">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="rounded-full">
                                <img className="" alt="Tailwind CSS Navbar component" src={user?.photoURL || "https://i.ibb.co/TmsrwQs/user.png"} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li onClick={handleLogout}><a>Logout</a></li>
                        </ul>
                    </div>
                        :
                        <div className="flex gap-2">
                            <Link to="/login"><button className="btn-sm bg-[#2b3440] md:bg-[#2b3440] md:btn text-white md:text-white md:px-8">Login</button></Link>
                            <Link to="/sign_up"><button className="btn-sm bg-[#2b3440] md:bg-[#2b3440] md:btn text-white md:text-white md:px-8">Register</button></Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;