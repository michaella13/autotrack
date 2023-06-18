import React from 'react'
import car from '../../assets/car.png'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Owner() {
  const[message, setMessage]=useState('')
  const navigate=useNavigate()


    const validationSchema = Yup.object().shape({
        names: Yup.string().required('Names are required'),
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Invalid phone number').required('Phone number is required'),
        nationalID: Yup.string().matches(/^\d{16}$/, 'Invalid ID').required('National Id is required number is required'),
        address: Yup.string().required('Address are required'),
        
      })

      const token=localStorage.getItem('token')
      const config={
        headers:{
          'Authorization': token,
        'Content-Type': 'application/json'
        }
      }

      
        const formik = useFormik({
          initialValues: {
            names: '',
            phoneNumber: '',
            nationalID: '',
            address: '',
          },
          validationSchema: validationSchema,
          onSubmit: (values) => {
            axios.post('http://192.168.8.106:5000/owners/owner',values,config)
            .then(response=>{
              setMessage(response.data.message)
              navigate('/vehicles');
  
            })
            .catch((err)=>{
              if(err.response.status==401){
                navigate('/');
              }
              else{
                console.log(err);
              }
            })
        }
        },[navigate])
  return (
    
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sub p-8 rounded-md shadow-md w-2/5'>
      <p className='bg-white text-center'>{message}</p>
      <h1 className='text-black font-bold text-lg text-center  '> Register Owner</h1>

        <form action="" onSubmit={formik.handleSubmit}>
        

          <div className=' mx-24 my-5'>
          <input
            className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5"
            type="text"
            placeholder="Names"
            name="names"
            value={formik.values.names}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.names && formik.errors.names && <div className='text-sm text-error'>{formik.errors.names}</div>}
          </div>

          <div className=' mx-24 my-5'>
          <input
            className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5"
            type="text"
            placeholder="NationalID"
            name="nationalID"
            value={formik.values.nationalID}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.nationalID && formik.errors.nationalID && <div className='text-sm text-error'>{formik.errors.nationalID}</div>}
          </div>


          <div className=' mx-24 my-5'>
          <input
            className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5 "
            type="text"
            placeholder="Phone"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && <div className='text-sm text-error'>{formik.errors.phoneNumber}</div>}
          </div>
         
         
          <div className=' mx-24 my-5'>
          <input
            className="w-11/12 border-b-2 border-green-900 focus:border-green-900 placeholder-gray-400  bg-sub outline-none my-2.5"
            type="text"
            placeholder="Address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address && <div className='text-sm text-error'>{formik.errors.address}</div>}

          </div>
          
          
        
          <button type="submit" className="h-12 w-4/6 rounded-md text-white font-bold bg-secondary mt-2 mx-24" >Register Owner</button>
        </form>
        
      </div>
    
  )
}
