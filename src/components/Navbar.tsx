import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-primary">
            <Link to={"/"} className="m-2 btn btn-dark">
                Home
            </Link>
            <Link to={"/login"} className="m-2 btn btn-dark">
                Login
            </Link>
        </div>
    );
};

export default Navbar;
