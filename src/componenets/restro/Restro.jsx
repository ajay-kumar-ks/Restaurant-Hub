// HomePage.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Restaurent from './Restaurent';
import CreateRestro from './CreateRestro';
import { getUsersRestroAction } from '../../Redux/restro/restro.action';
import { getProfileAction } from '../../Redux/Auth/auth.action';

const Restro = () => {

    // const {auth}=useSelector(store=>store);
    const dispatch=useDispatch();
    const jwt= localStorage.getItem("jwt");
    
    useEffect(()=>{
      dispatch(getProfileAction(jwt))
    },[jwt])


  const restro  = useSelector((store) => store.restro); // Assuming user restaurant data is stored in Redux state
//   const dispatch = useDispatch();

//   const jwt = localStorage.getItem('jwt');

  useEffect(() => {
    dispatch(getUsersRestroAction(jwt));
  }, [dispatch, jwt]);

  
  // console.log("userrestro--------", restro.user);


  // console.log("auth --------",auth.user);

  const item = restro.user;

  return (
    <div>
      {restro.user ? (
        <Restaurent item={item}/>
      ) : (
        <CreateRestro />
      )}
    </div>
  );
};

export default Restro;
