import { useEffect, useState } from "react";
import authService from "./Appwrite/auth";
import Navbar from "./Components/Navbar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isWrongPath, setIsWrongPath] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      console.log("wrong: ", isWrongPath);
      console.log("iskiffef", isLoggedIn);

      if (
        isLoggedIn &&
        (location.pathname == "/signup" || location.pathname == "/Login")
      ) {
        console.log("tmkischu");

        setIsWrongPath(true);
        navigate("/");
        console.log("come here");
      } else {
        setIsWrongPath(false);
        console.log("setIsWrong is:", isWrongPath);
      }
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login());
          console.log("Await isloggedin is:", isLoggedIn);
        } else {
          dispatch(logout());
          //              if (location.pathname !== "/signup") {
          //   navigate("/signup");
          // }
        }
      } catch (error) {
        console.error("Auth error:", error);

        dispatch(logout());
      }
    };
    checkAuth();
  }, [location, isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <div className="w-full h-screen flex">
          <Navbar />
          <Outlet />
        </div>
      ) : (
        <div className=" bg-gradient-to-br from-[#775db6] via-teal-200 to-[#793f69] w-full h-screen flex items-center justify-center">
          {/* <Outlet /> */}
          {!isWrongPath ? (
            <>
              <Outlet />
            </>
          ) : (
            <div>Wrong path</div>
          )}
        </div>
      )}
    </>
  );
}

export default App;

// If user is logged in and he tries to go to /Signup or /Login either don't let him redirect back to current url
