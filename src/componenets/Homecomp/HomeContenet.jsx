import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FoodCard from '../posts/FoodCard';
import { getBestFoodAction } from '../../Redux/restro/food/food.action';
import { useDispatch, useSelector } from 'react-redux';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Backdrop, CircularProgress } from '@mui/material';

// ... (other imports)

function HomeContenet() {
  const dispatch = useDispatch();
  const food = useSelector(store => store.food);

  const [currentPage, setCurrentPage] = useState(0);
  const [allFoods, setAllFoods] = useState([]);

  const [isLoading, setLoading] = useState(false);



  const fetchData = async () => {
    try {
      console.log("Fetching best's food data...");
      setLoading(true);
      await dispatch(getBestFoodAction(currentPage));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching best's food data:", error);
      // Handle error as needed
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [dispatch, currentPage,food.newComment]);

  useEffect(() => {
    if (food.userfood && food.userfood.content) {
      // Combine the existing foods with the new ones without duplicates
      setAllFoods(prevFoods => {
        const newFoods = food.userfood.content.filter(
          newFood => !prevFoods.some(existingFood => existingFood[0].id === newFood[0].id)
        );
        return [...prevFoods, ...newFoods];
      });
    }
  }, [food, currentPage,food.newComment]);

  const loadNextItems = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const width2= '370px';

  return (
    <div className=''>
      <Box sx={{ flexGrow: 2, paddingY: -2 }}>
        <Grid container spacing={2}>
          {console.log("foddssss arreee", allFoods)}
          {allFoods.map((item, index) => (
            <Grid item xs={4} key={item[0].id || index}>
              <FoodCard key={item[0].id || index} item={item[0]} widths={width2}/>
            </Grid>
          ))}
        </Grid>
        <div style={{ width: '100%', display: 'grid', alignItems: 'center', justifyContent: 'center', marginTop: "8%" }}>
  {!isLoading && (
    <button onClick={loadNextItems}>
      <AddCircleOutlineIcon style={{ fontSize: '2.5rem', opacity: 0.75 }} />
    </button>
  )}
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

export default HomeContenet;
