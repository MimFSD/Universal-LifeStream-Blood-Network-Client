import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Main = () => {
    return (
        <div className="font-merienda">
            <Outlet></Outlet>
            <ToastContainer />
        </div>
    );
};

export default Main;