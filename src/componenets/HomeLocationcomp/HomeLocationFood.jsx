import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import { getFoodByCityAndAdress } from '../../Redux/restro/restro.action';
import FoodCard from '../posts/FoodCard';

function HomeLocationFood({ item }) {
  // Ensure that item is not null, provide an empty string as default value if it's null
  item = item || '';

  const dispatch = useDispatch();
  const restro = useSelector(store => store.restro);
  const [isLoading, setLoading] = useState(false);

  console.log("location in food comp", item.split(',')[0]);
  console.log("food in a location", restro.restroFood);

  const query = item.split(',')[0];

  const fetchData = async () => {
    try {
      console.log("Fetching location food data...");
      setLoading(true);
      await dispatch(getFoodByCityAndAdress(query));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching in location food data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [item]);

  const width2 = '370px';

  return (
    <div className=''>
      <Box sx={{ flexGrow: 2, paddingY: -2 }}>
        <Grid container spacing={2}>
          {restro.restroFood?.map((item, index) => (
            <Grid item xs={4} key={item?.id }>
              <FoodCard key={item?.id} item={item} widths={width2} />
            </Grid>
          ))}
        </Grid>
        <div style={{ width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center', marginTop: "8%" }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <CircularProgress color="inherit" />
            </div>
          )}
        </div>
      </Box>
    </div>
  );
}

export default HomeLocationFood;
