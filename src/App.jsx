import { useEffect } from "react";
import authService from "./Appwrite/auth";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login());
                } else {
                    dispatch(logout());
                    navigate("/signup");
                }
            } catch (error) {
                console.error("Auth error:", error);
                dispatch(logout());
            }
        };
        checkAuth();
    }, []);
    return (
        <>
            {isLoggedIn ? (
                <div className="w-full h-screen flex">
                    <Navbar />
                    <Outlet />
                </div>
            ) : (
                <div className=" bg-gradient-to-br from-[#775db6] via-teal-200 to-[#793f69] w-full h-screen flex items-center justify-center">
                    <Outlet />
                </div>
            )}
        </>
    );
}

export default App;
