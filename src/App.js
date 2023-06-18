import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import ListVehicle from './components/vehicle/ListVehicles';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      {/* <Route path="/registerVehicle" element={<RegisterVehicle/>}/>
      <Route path="/owner" element={<Owner/>}/> */}
      <Route path="/vehicles" element={<ListVehicle/>}/>
    </Routes>
   </Router>
  );
}

export default App;
