
import React from 'react';
import './styles.css';
import FoodCard from '../posts/FoodCard';
import { Grid } from '@mui/material';


function Specials({items}) {

  if (!items) {
    return null; // or return a placeholder, throw an error, or handle the case accordingly
  }
  const width2= '340px';
  return (
    
    <div className="scroll-container">
    {items
      .filter(item => item.isSpecial !== null)
      .map((item,index) => (
        <Grid
        item
        xs={4}
        sx={{
          margin: index === 0 ? '0 8px 0 0' : '0 8px', // Apply margin to all items except the first
        }}
        key={item.id}
      >
        <FoodCard item={item} widths={width2} />
      </Grid>
      ))}
  </div>
  
 


  );
}

export default Specials;
