  import React from 'react'
  import car from '../../assets/car.png'
  import * as Yup from 'yup'
  import { useFormik } from 'formik'
  import { Link } from 'react-router-dom'
  import axios from 'axios'
  import { useState } from 'react'
  import { useNavigate } from 'react-router-dom';
  

  export default function Signup() {
    const[message, setMessage]=useState('')
    
  const navigate = useNavigate();

  // useEffect(()=>{

  // },message)
      
    const validationSchema = Yup.object().shape({
      firstName: Yup.string().required('Names are required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().matches(/^\d{10}$/, 'Phone number must be 10 characters').required('Phone number is required'),
      password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    })
    
      const formik = useFormik({
        initialValues: {
          firstName: '',
          email: '',
          phone: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
          axios.post('http://localhost:5000/api/auth/register',values)
          .then(response=>{
            setMessage(response.data)
            navigate('/');

          })
          .catch(err=>{
            console.log(err);
          })
      }
    })
    console.log()
    

    return (
      <div className='flex  bg-sub h-screen'>
        
        <div className='bg-primary  flex flex-col items-center w-1/2  rounded-r-3xl'>
        <h1 className='text-white font-bold text-3xl text-center mt-20  '>Binary Supermarket</h1>
        <p className='text-white font-thin text-base text-center mt-5  '>Get the products you need at an instant</p>
          <img src={car} alt="car" className='w-2/3 h-2/3' />
        </div>
        <div className='flex flex-col w-1/2 ' >
          <div className=' items-center'>
          <p className='bg-white text-center'>{message}</p>
            <h1 className='text-black font-bold text-3xl text-center mt-20  '>Welcome!</h1>
            <p className='text-black   font-thin text-base text-center mt-5  '>Create account to start shopping!</p>
          </div>

          <form action="" onSubmit={formik.handleSubmit}>
          
            <div className=' mx-24 my-5'>
            <input
              className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5"
              type="text"
              placeholder="Names"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && <div className='text-sm text-error'>{formik.errors.firstName}</div>}
            </div>

            <div className=' mx-24 my-5'>
            <input
              className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5 "
              type="text"
              placeholder="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && <div className='text-sm text-error'>{formik.errors.phone}</div>}
            </div>
          

            <div className=' mx-24 my-5'>
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

           
            

            <div className=' mx-24 my-5'>
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
            
            
          
            <button type="submit" className="h-12 w-4/6 rounded-md text-white font-bold bg-secondary mt-2 mx-24" >Signup</button>
          </form>
          <p className='text-black font-thin text-base  mt-6 ml-24 '>Already have an account?
          <Link to='/' className='underline underline-offset-1'>Login</Link>
          </p>
        </div>
      </div>
    )
  }

