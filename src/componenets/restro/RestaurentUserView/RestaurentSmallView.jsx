import { Card, CardContent, Grid, IconButton, Menu, MenuItem, Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useDispatch, useSelector } from 'react-redux';

import { getUsersRestroPostAction } from '../../../Redux/restro/post/restropost.action';
import ImageCarousel from '../../ImageCarousel';
import { useNavigate } from 'react-router-dom';

function RestaurentSmallView({ item }) {


  const calculateAverageRating = () => {
    if (item.ratings && item.ratings.length > 0) {
      const totalRating = item.ratings.reduce(
        (acc, rating) => acc + rating.value,
        0
      );
      const averageRating = totalRating / item.ratings.length;
      return averageRating.toFixed(1); // Round to one decimal place
    }
    return 0; 
  };


      //go to restaurent

      const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  useEffect(() => {
    if (shouldNavigate  && item.id) {
      navigate(`/restaurent/${item.id}`);
    }
  }, [shouldNavigate ,item.id, navigate]);

  const handleClick = () => {
    setShouldNavigate(true);

  };

  // menu

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <Card sx={{ display: 'flex', width: '60vw', height: '200px', mt: 6 }}>
        <Box sx={{ height: "200px", width: '350px' }}>
          <ImageCarousel item={item} />
        </Box>
        <Box 
        onClick={handleClick} 
        sx={{ display: 'flex', flexDirection: 'column' ,width:'550px'}}>
          <CardContent sx={{ flex: '1 0 auto' }}>

          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Typography component="div" variant="h5" style={{ flexGrow: 1 }}>
              {item.restroName}
            </Typography>
          </div>

            <Typography variant="subtitle1" color="text.secondary" component="div">
              {item.city}
            </Typography>
            <Rating
              sx={{ mt: 1 }}
              value={calculateAverageRating()}
              precision={0.5}
              size="small"
              readOnly
            />
            <Typography component="div" variant="p">
              {item.discription}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {/* Additional content if needed */}
          </Box>
        </Box>
        <Box>
          <IconButton onClick={(e) => { e.stopPropagation(); handleClick2(e); }}>
           <MoreHorizIcon />
          </IconButton>
          <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Share</MenuItem>
              <MenuItem onClick={handleClose}>Copy Link</MenuItem>
              <MenuItem onClick={handleClose}>Report</MenuItem>
              <MenuItem onClick={handleClose}>Cancel</MenuItem>
      </Menu>
        </Box>
      </Card>
    </div>
  );
}

export default RestaurentSmallView;
