import Navbar from "../../Shared/Navbar/Navbar";
import Banner from "../Banner/Banner";
import ContactUs from "../ContactUs/ContactUs";
import Featured from "../Featured/Featured";
import Footer from "../Footer/Footer";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <Featured></Featured>
            <ContactUs></ContactUs>
            <Footer></Footer>
        </div>
    );
};

export default Home;