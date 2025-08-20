import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch ,} from 'react-redux';
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
  const [password,setPassword] = useState(true);
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
      setPassword(false)
      console.log('Prev state is:',password);
    }
  };

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      {!password? <>
          <p className='text-red-500'>****Invalid Email or Password****</p>
      </>:''}
      <form onSubmit={handleSubmit(SubmitLogin)} className='rounded-2xl shadow-2xl flex flex-col gap-4 m-8 items-center p-8 w-[80%] justify-center'>
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
        <button type="submit" className="mt-4 p-4 md:w-[40%] w-[35%] bg-pink-600 text-white rounded-lg hover:bg-pink-500 hover:cursor-pointer duration-500" >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
