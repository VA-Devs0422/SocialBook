import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from './store/authSlice';
import authService from './Appwrite/auth';

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SubmitLogin = async (data) => {
    try {
      console.log("Form Data:", data);

      // Call your Appwrite login service
      const userData = await authService.login(data);

      if (userData) {
        // Only toggle login status — no payload needed
        dispatch(login());

        // Navigate to home after successful login
        navigate("/");
      } else {
        console.error("Invalid login credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(SubmitLogin)}>
        {/* Email */}
        <input
          {...register("email", { required: true })}
          placeholder={errors.email ? "Email is required" : "Email"}
          className={`p-2 pl-3 md:w-[50%] sm:w-[80%] w-[95%] border-2 rounded-2xl ${
            errors.email ? "placeholder:text-red-500" : ""
          }`}
        />

        {/* Password */}
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder={errors.password ? "Password is required" : "Password"}
          className={`p-2 pl-3 md:w-[50%] sm:w-[80%] w-[95%] border-2 rounded-2xl ${
            errors.password ? "placeholder:text-red-500" : ""
          }`}
        />

        {/* Submit */}
        <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded-lg">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
