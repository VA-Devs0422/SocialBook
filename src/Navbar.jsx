import React from "react";
import authService from "./Appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./store/authSlice";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = async () => {
        await authService.logout();
        dispatch(logout());
        navigate("/signup");
    };
    return (
        <div className="w-3/12 flex flex-col border-r-2 h-full border-gray-300 bg-gray-50 p-4">
            <div className="flex flex-col items-center gap-6 flex-1">
                <div className="profile bg-white p-3 rounded-lg shadow-sm border w-full text-center hover:bg-gray-100 cursor-pointer transition-colors">
                    Username
                </div>
                <div className="profile bg-white p-3 rounded-lg shadow-sm border w-full text-center hover:bg-gray-100 cursor-pointer transition-colors">
                    Posts
                </div>
                <div className="profile bg-white p-3 rounded-lg shadow-sm border w-full text-center hover:bg-blue-50 cursor-pointer transition-colors text-blue-600 font-medium">
                    Add Post
                </div>
            </div>
            <button
                onClick={handleLogout}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar;
