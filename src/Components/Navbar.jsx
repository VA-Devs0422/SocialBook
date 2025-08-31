import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../Appwrite/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        console.log("Your current user is:", currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (isLoggedIn) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/signup");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="w-3/12 flex flex-col border-r-2 h-full border-gray-300 bg-gray-50 p-4 bg-gradient-to-r from-blue-500 to-pink-400">
      <div className="flex flex-col items-center gap-6 flex-1 w-full">
        <div className="profile p-3 rounded-lg shadow-sm  w-full text-center hover:bg-blue-500 cursor-pointer transition-colors flex flex-row gap-6 bg-blue-600 text-white">
        <img src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" alt=""  className="h-8 w-8"/>
          {isLoggedIn ? `Welcome ${user?.name || "User"}` : "Welcome Guest"}
        </div>

        <div
          onClick={() => navigate("/posts")}
          className="profile bg-blue-600 text-white p-3 rounded-lg  w-full text-center hover:bg-blue-500 cursor-pointer transition-colors "
        >
          Profile
        </div>

        <div
          onClick={() => navigate("/add-post")}
          className="profile bg-blue-600 text-white p-3 rounded-lg shadow-sm  w-full text-center hover:bg-blue-500 cursor-pointer transition-colors  font-medium"
        >
          Add Post
        </div>
      </div>

      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors font-medium"
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
