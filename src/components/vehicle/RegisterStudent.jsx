import React, { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import ClearIcon from '@mui/icons-material/Clear';


export default function RegisterStudent({ onClose, name }) {
  const [grades, setGrades] = useState([])
  const [message, setMessage] = useState('')
  const navigate = useNavigate()


  const validationSchema = Yup.object().shape({
    
    product: Yup.string().required('Product is required'),
    quantity: Yup.string().required('Quantity is required'),
    
   
  })

  // const cart={}
  // function addItemToCart(itemName,quantity){
  //   if(cart.hasOwnProperty(itemName)){

  //   }
  // }

  const formik = useFormik({
    initialValues: {
      product:'',
      quantity:''

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values)


      // axios.post('http://192.168.8.106:5000/api/vehicle', values, config)
      // axios.post('http://192.168.0.141:8000/students', values)
      //   .then(response => {
      //     setMessage(response.data)
      //     navigate('/');
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  })
  
  // const token = localStorage.getItem('token')
  // const config = {
  //   headers: {
  //     'Authorization': token,
  //     'Content-Type': 'application/json'
  //   }
  // }
  useEffect(() => {
    // axios.get('http://192.168.0.141:8000/grades', config)
    axios.get('http://192.168.0.141:8000/grades')
      .then((response) => {
        setGrades(response.data)
      })
      .catch((err) => {
        // if (err.response.status === 401) {
        //   navigate('/');
        // }
        // else {
          console.log(err);
        // }
      })
  }, )
  
  return (
    <div className='w-full h-full bg-[rgb(0,0,0,0.5)] absolute top-0 left-0' >


      <div
        className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sub p-8 rounded-md shadow-md w-2/5'>
        <p className='bg-white text-center'>{message}</p>
        <div>
          <ClearIcon onClick={onClose} />
        </div>
        <h1 className='text-black font-bold text-lg text-center  '> Add to cart</h1>



        <form action="" onSubmit={formik.handleSubmit}>

          <div className='my-5 mx-5'>
            <input
              className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5"
              type="text"
              placeholder="Product Name"
              name="product"
              value={name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* {formik.touched.product && formik.errors.product && <div className='text-sm text-error'>{formik.errors.product}</div>} */}
          </div>

          

        

          <div className='my-5 mx-5'>
            <input
              className="w-11/12 border-b-2 border-secondary focus:border-secondary placeholder-gray-400  bg-sub outline-none my-2.5 "
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.quantity && formik.errors.quantity && <div className='text-sm text-error'>{formik.errors.quantity}</div>}
          </div>
          

         
        
         
         



          <button type="submit" className="h-12 w-10/12 rounded-md text-white font-bold bg-secondary mt-2 mx-5"  onClick={formik.handleSubmit}>Add to cart</button>



        </form>

      </div>
    </div>

  )
}
