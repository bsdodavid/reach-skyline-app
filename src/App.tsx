import './App.css';
import UserForm from './pages/userForm';
import NotifyUsers from './pages/overlays/snackbar';
import UserDetails from './pages/userDetails';
import { Box, Button } from '@mui/material';
import { Link, Routes, Route } from 'react-router-dom';

function App() {
  

  return (
    <>
      <div 
        style={{border:1, padding:0,
            backgroundColor:'blueviolet', height:70, display:'flex'}}>
              <div style={{ display: "flex", gap: "20px", flexDirection:'row' }}>
                <Button sx={{color:'black'}} href='/user-form' variant='text'>Form</Button>
                <Button sx={{color:'black'}} href='/user-details' variant='text'>User Details</Button>
              </div>
            </div>
      
      {/* routes */}
      <div style={{padding:'10px'}}>
          <Routes>
            <Route path='/' element={<UserForm/>}/>
            <Route path="/user-form" element={<UserForm />} />
            <Route path="/user-details" element={<UserDetails />} />
          </Routes>
      </div>
      

    </>
  )
}

export default App
