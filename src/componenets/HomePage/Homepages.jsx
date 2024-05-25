import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Vlogs from '../posts/Vlogs';
import Help from '../../helporg/Help';

import Register from '../authentication/Register';

import LoginForm from '../authentication/LoginForm';
import CreateRestro from '../restro/CreateRestro';
import Restro from '../restro/Restro';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../Redux/Auth/auth.action';
import RestaurentToUser from '../restro/RestaurentUserView/RestaurentToUser';
import Profile from '../UserProfile/Profile';
import VlogDetailed from '../posts/VlogDetailed';
import VlogDetailed2 from '../posts/VlogDetailed2';


function Homepages() {

  const auth=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const jwt= localStorage.getItem("jwt");
  
  useEffect(()=>{
    dispatch(getProfileAction(jwt))
  },[jwt])


  return (
    <div className=''>
      
        <Routes>
          <Route path='/*' element={<Home />} />
          <Route path='/vlogs' element={<Vlogs />} />
          <Route path='/restaurent' element={auth.user?<Restro/>:<LoginForm />} />
          <Route path='/help' element={<Help />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<Register />} />
          <Route path='/restaurent/:id' element={<RestaurentToUser/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/vlog/:id' element={<VlogDetailed2/>} />
          
         
        </Routes>
    
    </div>
  );
}

export default Homepages;
