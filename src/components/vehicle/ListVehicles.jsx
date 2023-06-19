import React, { useState, useEffect, useRef } from 'react';
import RegisterVehicle from './RegisterVehicle'
import Owner from './Owner'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import jwtDecode from 'jwt-decode';

export default function ListVehicle() {
  const [showOwnerForm, setShowOwnerForm] = useState(false)
  const [showVehicleForm, setShowVehicleForm] = useState(false)
  const [vehicles, setVehicles] = useState([])
  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };
  const displayedItems = vehicles.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const navigate = useNavigate();

  const toggleOwnerForm = () => {
    setShowOwnerForm(!showOwnerForm)
  }
  const toggleVehicleForm = () => {
    console.log("Vehicle" + showVehicleForm)
    setShowVehicleForm(!showVehicleForm)

  }
  const token = localStorage.getItem('token')
  const decodeToken = () => {
    try {
      const decodedToken = jwtDecode(token);
      // console.log("decoded token "+decodedToken['role']);
      const role=decodedToken['role']
    } catch (error) {
      console.error('Failed to decode JWT token:', error);
    }
  };
  const config = {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  }
  useEffect(() => {
    decodeToken();
    axios.get('http://192.168.8.106:5000/api/vehicles', config)
      .then((response) => {
        setVehicles(response.data)
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


  const handleLogout=()=>{
    localStorage.removeItem('token');
  navigate('/');
  }
//to handle closing the form

const registerVehicleFormRef = useRef(null);

  
  return (
    <div className='bg-sub w-full fixed h-screen'>




      {/* <div className='mx-16 main'> */}
      <div className={`mx-16 ${showVehicleForm ? 'opacity-50' : ''}`}>
        <div className='mt-10'>

          <h1 className='text-black font-bold text-2xl inline'>Welcome Admin!</h1>


          <div className='inline float-right'>
            <input type="button" value="Register owner" className="h-10 w-48 rounded-md text-white font-bold bg-primary mx-5" onClick={toggleOwnerForm} />
            <input type="button" value="Register Vehicle" className="h-10 w-48 rounded-md text-white font-bold bg-secondary" onClick={toggleVehicleForm} />


          </div>
        </div>

        <h2 className='text-black font-light text-lg my-5'>List of Vehicles</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Chasis num.</th>
              <th className="px-4 py-2">Manufact.</th>
              <th className="px-4 py-2">Manufact.year</th>
              <th className="px-4 py-2">Price(M)</th>
              <th className="px-4 py-2">Plate</th>
              <th className="px-4 py-2">Model Name</th>
              <th className="px-4 py-2">Owner</th>
            </tr>
          </thead>
          <tbody>

            {displayedItems.map(vehicle => {
              return (
                <tr key={vehicle._id} className='my-5'>
                  <td className="bg-white px-4 py-2 rounded-l-md" >{vehicle.chasisNumber} </td>
                  <td className="bg-white px-4 py-2" >{vehicle.manufacturerCompany} </td>
                  <td className="bg-white px-4 py-2" >{vehicle.manufacturerYear} </td>
                  <td className="bg-white px-4 py-2" >{vehicle.price} </td>
                  <td className="bg-white px-4 py-2" >{vehicle.plateNumber} </td>
                  <td className="bg-white px-4 py-2" >{vehicle.modelName} </td>
                  <td className="bg-white px-4 py-2 rounded-r-md" >{vehicle.plateNumber} </td>


                </tr>
              )
            })}
            {/* <td className="bg-white px-4 py-2 rounded-l-md">12345</td>
          <td className="bg-white px-4 py-2">Toyota</td>
          <td className="bg-white px-4 py-2">2013</td>
          <td className="bg-white px-4 py-2">12</td>
          <td className="bg-white px-4 py-2">RAF 200Y</td>
          <td className="bg-white px-4 py-2">RAV4</td>
          <td className="bg-white px-4 py-2 rounded-r-md">Jean Jacques</td> */}


          </tbody>
        </table>
        <div className="flex float-right mt-5 mx-16">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          breakLabel="..."
          breakClassName="break-me"
          pageCount={Math.ceil(vehicles.length / itemsPerPage)}
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
      <button
        className='absolute bottom-5 float-left mx-16 px-4 py-2 rounded-md bg-primary text-white'
        onClick={handleLogout}
      >
        Logout
      </button>
      </div>
      {showVehicleForm && (
        <RegisterVehicle onClose={toggleVehicleForm} />
      )}
      {showOwnerForm && (
        <Owner onClose={toggleOwnerForm} />
      )}
      
    </div>
  )
}
