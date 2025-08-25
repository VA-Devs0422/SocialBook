import { useEffect } from "react";
import authService from "./Appwrite/auth";
import Navbar from "./Components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const checkAuth = async () => {
            console.log('Location changed')
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(login());
                } else {
                    dispatch(logout());
                     if (location.pathname !== "/signup") {
          navigate("/signup");
        }
                }
            } catch (error) {
                console.error("Auth error:", error);
                
                dispatch(logout());
            }
        };
        checkAuth();
    }, [location]);
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




// If user is logged in and he tries to go to /Signup or /Login either don't let him redirect back to current url