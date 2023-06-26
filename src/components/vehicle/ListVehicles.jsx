import React, { useState, useEffect } from 'react';
import RegisterStudent from './RegisterStudent';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
// import jwtDecode from 'jwt-decode';

export default function ListVehicle() {
  const [showStudentForm, setShowStudentForm] = useState(false)
  const [products, setProducts] = useState([])
  const [productName, setProductName] = useState('')
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const displayedItems = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // const navigate = useNavigate();

  
  const toggleStudentForm = (productName) => {
    setShowStudentForm(!showStudentForm)
    setProductName(productName)

  }
  // const token = localStorage.getItem('token')
  // const decodeToken = () => {
  //   try {
  //     const decodedToken = jwtDecode(token);
  //     // console.log("decoded token "+decodedToken['role']);
  //     const role=decodedToken['role']
  //   } catch (error) {
  //     console.error('Failed to decode JWT token:', error);
  //   }
  // };
  // const config = {
  //   headers: {
  //     'Authorization': token,
  //     'Content-Type': 'application/json'
  //   }
  // }
  useEffect(() => {
    // decodeToken();
    // axios.get('http://localhost:8000/students', config)
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data)
      })
      .catch((err) => {
        // if (err.response.status == 401) {
        //   navigate('/');
        // }
        // else {
        //   console.log(err);
        // }
        console.log(err);
      })
  })
  


  // const handleLogout=()=>{
  //   localStorage.removeItem('token');
  // navigate('/');
  // }


const handleBuy=(id)=>{
  console.log(id)
}




  return (
    <div className='bg-sub w-full fixed h-screen'>




      {/* <div className='mx-16 main'> */}
      <div className={`mx-16 ${showStudentForm ? 'opacity-50' : ''}`}>
        <div className='mt-10'>

          <h1 className='text-black font-bold text-2xl inline'>Welcome!</h1>


          <div className='inline float-right'>
            <input type="button" value="Purchased Report" className="h-10 w-48 rounded-md text-white font-bold bg-primary mx-5" />
            


          </div>
        </div>

        <h2 className='text-black font-light text-lg my-5 overflow-x-auto'>List of Products</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
          
              <th className="px-4 py-2 text-left">ProductCode</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Buy</th>
            </tr>
          </thead>
          <tbody>

            {displayedItems.map(product => {
              return (
                <tr key={product.id} className='my-5'>
                  <td className="bg-white px-4 py-2 rounded-l-md" >{product.productCode} </td>
                  <td className="bg-white px-4 py-2" >{product.productName} </td>
                  <td className="bg-white px-4 py-2" >{product.productType} </td>
                  <td className="bg-white px-4 py-2" >{product.price} </td>
                 
                  <td className="bg-white px-4 py-2 rounded-r-md">
                  <ShoppingCartIcon
                    onClick={() => toggleStudentForm(product.productName)}
                    style={{ color: 'red', cursor: 'pointer' }}
                  />
                </td>


                </tr>
              )
            })}
            

          </tbody>
        </table>
        <div className="flex float-right mt-5 mx-16">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={Math.ceil(products.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          pageClassName="inline-block mx-1"
          pageLinkClassName="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
          previousClassName="inline-block mx-1"
          previousLinkClassName="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
          nextClassName="inline-block mx-1"
          nextLinkClassName="px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300"
          activeClassName="bg-primary text-white"
          disabledClassName="opacity-50 cursor-not-allowed"
        />
      </div>
      {/* <button
        className='absolute bottom-5 float-left mx-16 px-4 py-2 rounded-md bg-primary text-white'
        onClick={handleLogout}
      >
        Logout
      </button> */}
      </div>
      
      {showStudentForm && (
        <RegisterStudent onClose={toggleStudentForm} name={productName}/>
      )}
      
    </div>
  )
}
