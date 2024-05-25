import React, { useState } from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {
    Backdrop,
    Box,
    CircularProgress,
  } from "@mui/material";

function SearchLocationResult({  item ,onSetSearchedValue,handleClickResult}) {

    const uniqueItems = [...new Set(item)]; 

    const [isLoading, setLoading] = useState(false);

  let apiEndpoint = "https://api.opencagedata.com/geocode/v1/json";
  let apiKey = "d5bca388393644a3ba4b12217a311c35";

  function handleUserLocation () {

   

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
            setLoading(true);
          const { latitude, longitude } = position.coords;
          console.log("longitude=", longitude, "   latitude=", latitude);
          getUsersCurrentAdress(latitude, longitude);
        },
        (error) => {
          console.log(error.message)
        }
      )
    }
  }

  const getUsersCurrentAdress = async (latitude, longitude) => {

    let query = `${latitude},${longitude}`;
    let apiUrl = `${apiEndpoint}?key=${apiKey}&q=${query}&pretty=1`;

    try {
      setLoading(true);
      const res = await fetch(apiUrl);
      const data = await res.json();
      setLoading(false);
      console.log(data.results[0].formatted);
      onSetSearchedValue(data.results[0].formatted); // Set the value in parent component state

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <div style={{ width: '45%', marginTop: '4rem', position: 'absolute', zIndex: '200', background: 'white', boxShadow: '0px 0px 3px #ddd', borderRadius: '10px', maxHeight: '300px', overflowY: 'scroll', padding: '15px', marginLeft: '-340px' }}>

        <Box onClick={
          ()=>{
            handleUserLocation();
            handleClickResult(true);
          }
          } sx={{ color: 'blue', display: 'flex', padding: '15px', cursor: 'pointer', ":hover": { background: '#edf6f9', } }}>
          <div><MyLocationIcon /></div><p style={{ marginLeft: '5px' }}>Use Your Location</p>
          </Box>
          
          
{uniqueItems.map((uniqueItem, id) => (
  <Box onClick={
    ()=>{
      onSetSearchedValue(uniqueItem.trim());
      handleClickResult(true);

    }
  } key={id} sx={{ display: 'flex', padding: '10px', cursor: 'pointer', ":hover": { background: '#edf6f9' } }}>
    <p style={{ marginLeft: '5px' }} >{uniqueItem.trim()}</p>
  </Box>
))}




       
      </div>
      <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}

          >
            <CircularProgress color="inherit" />
          </Backdrop>
    </div>
  )
}

export default SearchLocationResult;
