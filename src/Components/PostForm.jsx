import React from "react";
import { useForm } from "react-hook-form";

function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="border-gray-400 border-2 shadow-2xl rounded-2xl flex flex-col p-6 space-y-4 w-96">
          <h1 className="text-3xl font-semibold text-center mb-4 pb-5">
            Add Post
          </h1>

          <form className="flex flex-col space-y-4 gap-2">
            {/* Styled Upload Button */}
            {/* Hidden File Input */}
            <input
              id="file"
              type="file"
              {...register("file", { required: true })}
              placeholder={errors.file ? "Upload Image" : "File is Required"}
              className={`block w-full text-sm text-gray-700 
    file:mr-4 file:py-2 file:px-4
    file:rounded-lg file:border-0
    file:text-sm file:font-semibold
    file:bg-indigo-50 file:text-indigo-700
    hover:file:bg-indigo-100
    ${errors.file ? "border border-red-500" : "border border-gray-300"} 
    rounded-lg cursor-pointer`}
            />
            <input
              type="text"
              {...register("caption", { required: false })}
              placeholder="Enter your Caption"
              className="border-2 rounded-xl p-2 border-gray-300"
            />
            <button
              type="submit"
              className=" rounded-2xl p-1 w-[50%] bg-indigo-50 hover:bg-indigo-100 text-indigo-700"
            >
              Upload
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PostForm;
