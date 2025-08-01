import React from 'react'
import { useForm } from 'react-hook-form'
import authService from './Appwrite/auth'
function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm()

  const password = watch('password') // Watch the password field

  const submit = (data) => {
    console.log(data)
    authService.createAccount(data)
    reset()
  }

  return (
    <>
      <div className='  backdrop-opacity-50 rounded-2xl shadow-cyan-800 shadow-2xl w-[60%] h-[70%] flex flex-col text-white p-6'>
        <div className='flex items-center justify-center'>
          <h1 className='text-center text-2xl font-bold mt-3'>Let's Signup</h1>
        </div>

        <form onSubmit={handleSubmit(submit)} className='flex flex-col  mt-6 p-10 items-center justify-center gap-8'>

          <input
            {...register('Fullname', { required: true })}
            placeholder='Fullname'
            className='p-2  text-white w-[50%] border-white border-2 rounded-2xl'
          />
          {errors.Fullname && <p className='text-red-500'>Fullname is required</p>}

          <input
            {...register('email', { required: true })}
            placeholder='Email'
            className='p-2  text-white w-[50%] border-2 border-white rounded-2xl' 
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <input
            {...register('password', { required: true })}
            placeholder='Password'
            type='password'
            className='p-2  text-white w-[50%] border-2 border-white rounded-2xl'
          />
          {errors.password && <p className='text-red-500'>Password is required</p>}

          <input
            {...register('Confirm', {
              required: true,
              validate: (value) => value === password || 'Passwords do not match',
            })}
            placeholder='Confirm Password'
            type='password'
            className='p-2  text-white w-[50%] border-2 border-white rounded-2xl'
          />
          {errors.Confirm && <p className='text-red-500'>{errors.Confirm.message}</p>}

          <button type='submit' className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mt-2'>
            Sign Up
          </button>
        </form>
      </div>
    </>
  )
}

export default Signup
