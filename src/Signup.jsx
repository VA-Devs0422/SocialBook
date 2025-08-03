import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authService from "./Appwrite/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
function Signup() {
    const navigate = useNavigate();
    const [status, setStatus] = useState(false);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm();

    const password = watch("password"); // Watch the password field
    const dispatch = useDispatch();

    const submit = (data) => {
        console.log(data);
        authService.createAccount(data);
        reset();
        setStatus((prev) => !prev);
        dispatch(login());
        navigate("/");
    };

    return (
        <>
            <div
                className={`backdrop-opacity-65 rounded-2xl shadow-blue-800 bg-blue-950 shadow-2xl md:w-[60%] md:h-[70%] w-[85%] h-auto flex flex-col text-white p-6 duration-700 transition-all ease-in-out transform ${
                    status
                        ? "opacity-0 invisible scale-95 hidden"
                        : "opacity-100 visible scale-100"
                } `}
            >
                <div className="flex items-center justify-center">
                    <h1 className="text-center text-4xl font-bold mt-3">
                        Let's Signup
                    </h1>
                </div>

                <form
                    onSubmit={handleSubmit(submit)}
                    className="flex flex-col w-[100%] mt-6 p-10 items-center justify-center gap-8"
                >
                    <input
                        {...register("Fullname", { required: true })}
                        placeholder={
                            errors.Fullname
                                ? "Full name is required"
                                : "Fullname"
                        }
                        className={`p-2  pl-3  text-white md:w-[50%] sm:w-[80%] w-[95%] border-white border-2 rounded-2xl ${
                            errors.Fullname ? "placeholder:text-red-500" : ""
                        }`}
                    />

                    <input
                        {...register("email", { required: true })}
                        placeholder={
                            errors.email ? "Email is required" : "Email"
                        }
                        className={`p-2 pl-3 text-white md:w-[50%] sm:w-[80%] w-[95%] border-white border-2 rounded-2xl ${
                            errors.Fullname ? "placeholder:text-red-500" : ""
                        }`}
                    />

                    <input
                        {...register("password", { required: true })}
                        placeholder={
                            errors.password
                                ? "Password is required"
                                : "Password"
                        }
                        type="password"
                        className={`p-2 pl-3 text-white md:w-[50%] sm:w-[80%] w-[95%] border-white border-2 rounded-2xl ${
                            errors.Fullname ? "placeholder:text-red-500" : ""
                        }`}
                    />

                    <input
                        {...register("Confirm", {
                            required: "Last field is required",
                            validate: (value) =>
                                value === password || "Passwords do not match",
                        })}
                        placeholder="Confirm Password"
                        type="password"
                        className={`p-2 pl-3 text-white md:w-[50%] sm:w-[80%] w-[95%] border-white border-2 rounded-2xl ${
                            errors.Fullname ? "placeholder:text-red-500" : ""
                        }`}
                    />

                    {errors.Confirm && (
                        <p className="text-red-500">{errors.Confirm.message}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-500 duration-500 cursor-pointer text-white p-2 rounded mb-4"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
            {status && (
                <p className="text-green-500">Account Created successfully</p>
            )}
        </>
    );
}

export default Signup;
