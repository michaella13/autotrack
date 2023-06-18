import React from 'react'
import car from '../../assets/car.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export default function Login() {

  const[message, setMessage]=useState('')
  const navigate=useNavigate()


  const token=localStorage.getItem('token');
  // useEffect(()=>{
  //   if(token!=null){
  //     navigate('/vehicles')
  //   }
  // },[])

  const config={
    headers:{
      'Authorization':token,
      'Content-Type':'application/json'
    }
  }
 

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  })
  

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post('http://192.168.8.106:5000/login', values,config)
        .then(response => {
         localStorage.setItem("token",response.data.token)
          setMessage(response.data.message)
          navigate('/vehicles')

        })
        .catch(err => {
          console.log(err);
        })
    }
  })

  return (
    <div className='flex  bg-sub h-screen'>
      <div className='bg-primary  flex flex-col items-center w-1/2  rounded-r-3xl'>
        <h1 className='text-white font-bold text-3xl text-center mt-20  '> AutoTrack</h1>
        <p className='text-white font-thin text-base text-center mt-5  '>Map all your vehicles to users at an instant!</p>
        <img src={car} alt="car" className='mt-24' />
      </div>
      <div className='flex flex-col w-1/2' >
        <div className=' items-center'>
        <p className='bg-white text-center'>{message}</p>
          <h1 className='text-black font-bold text-3xl text-center mt-20  '>Welcome back!</h1>
          <p className='text-black   font-thin text-base text-center mt-5  '>Login to see vehicles and their users!</p>
        </div>

        <form action="" onSubmit={formik.handleSubmit} className='mt-7'>



          <div className=' mx-24 my-8'>
            <input
              className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5 "
              type="email"
              placeholder="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && <div className='text-sm text-error'>{formik.errors.email}</div>}
          </div>







          <div className=' mx-24 my-8'>
            <input
              className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5"
              type="password"
              placeholder="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && <div className='text-sm text-error'>{formik.errors.password}</div>}

          </div>


          <button type="submit" className="h-12 w-4/6 rounded-md text-white font-bold bg-secondary mt-2 mx-24" >Login</button>
        </form>
        <p className='text-black font-thin text-base  mt-10 ml-24 '>Don't have an account? <Link to='/signup' className='underline underline-offset-1'>Signup</Link></p>
      </div>
    </div>
  )
}
