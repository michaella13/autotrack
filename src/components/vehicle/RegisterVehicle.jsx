import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function RegisterVehicle() {
  const [owners, setOwners] = useState([])
  const navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    chasisNumber: Yup.string().matches(/^\d{5}$/, 'Invalid chasis number').required('Chasis Number is required'),
    manufacturerCompany: Yup.string().required('manufacturer is required are required'),
    manufacturerYear: Yup.string().matches(/^\d{4}$/, 'Invalid manufacturer year').required('manufacturer year is required'),
    price: Yup.string().matches(/^\d{5}$/, 'Invalid price').required('Price is required'),
    plateNumber: Yup.string().matches(/^\d{10}$/, 'Invalid plateNumber').required('PlateNumber is required'),
    modelName: Yup.string().required('modelName is required are required'),
  })

  const formik = useFormik({
    initialValues: {
      chasisNumber: '',
      manufacturerCompany: '',
      manufacturerYear: '',
      price: '',
      plateNumber: '',
      modelName: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  })
  const token = localStorage.getItem('token')
  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }
  useEffect(() => {
    axios.get('http://192.168.8.106:5000/owners', config)
      .then((response) => {
        setOwners(response.data)
      })
      .catch((err) => {
        if (err.response.status == 401) {
          navigate('/');
        }
        else {
          console.log(err);
        }
      })
  }, [navigate])
  return (
    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sub p-8 rounded-md shadow-md w-2/5'>

      <h1 className='text-black font-bold text-lg text-center  '> Register Vehice</h1>



      <form action="" onSubmit={formik.handleSubmit}>

        <div className='my-5 mx-5'>
          <input
            className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5"
            type="number"
            placeholder="Chasis Number"
            name="chasisNumber"
            value={formik.values.chasisNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.chasisNumber && formik.errors.chasisNumber && <div className='text-sm text-error'>{formik.errors.chasisNumber}</div>}
        </div>

        <div className='my-5 mx-5'>
          <input
            className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5 "
            type="text"
            placeholder="Manufacturer Company"
            name="manufacturerCompany"
            value={formik.values.manufacturerCompany}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.manufacturerCompany && formik.errors.manufacturerCompany && <div className='text-sm text-error'>{formik.errors.manufacturerCompany}</div>}
        </div>

        <div className='my-5 mx-5'>
          <input
            className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5 "
            type="number"
            placeholder="Manufacture Year"
            name="manufacturerYear"
            value={formik.values.manufacturerYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.manufacturerYear && formik.errors.manufacturerYear && <div className='text-sm text-error'>{formik.errors.manufacturerYear}</div>}
        </div>

        <div className='my-5 mx-5'>
          <input
            className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5"
            type="number"
            placeholder="Price"
            name="Price(Million)"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && <div className='text-sm text-error'>{formik.errors.price}</div>}
        </div>

        <div className='my-5 mx-5'>
          <input
            className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5"
            type="text"
            placeholder="Plate Number"
            name="plateNumber"
            value={formik.values.plateNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.plateNumber && formik.errors.plateNumber && <div className='text-sm text-error'>{formik.errors.plateNumber}</div>}

        </div>
        <div className='my-5 mx-5'>
          <input
            className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5"
            type="text"
            placeholder="Model Name"
            name="modelName"
            value={formik.values.modelName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.modelName && formik.errors.modelName && <div className='text-sm text-error'>{formik.errors.modelName}</div>}

        </div>
        <div className='my-5 mx-5'>
          <select name="" id="" className='w-11/12 border-b-2 border-secondary focus:border-secondary bg-sub outline-none my-2.5 text-black'>
            {owners.map(owner => {

              return (
                <option key={owner.id} value={owner.id} style={{ color: 'black' }}>
                  {owner.name}
                </option>
              )
            })}
          </select>
        </div>



        <button type="submit" className="h-12 w-10/12 rounded-md text-white font-bold bg-secondary mt-2 mx-5" >Register</button>



      </form>

    </div>

  )
}
