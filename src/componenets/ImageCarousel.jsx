import React, { useEffect } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRestroPostAction } from '../Redux/restro/post/restropost.action';

const ImageCarousel = (item) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log("items in carosle",item.item)

  // const dispatch = useDispatch();
  // const restropost = useSelector((store) => store.restropost);

  // useEffect(() => {
  //   if (item.item?.user?.id) {
  //     dispatch(getUsersRestroPostAction(item.item.user.id));
  //   }
  // }, [dispatch, item]);

  // console.log("post in carosle",)

  return (
    <Carousel
      showArrows={!isMobile}
      showThumbs={false}
      infiniteLoop
      autoPlay
      interval={5000}
    >
      {item.item.restroPost.map((post, index) => (
      <div key={post.id}>
        <Paper elevation={3} style={{  }}>
         <img src={post.image} alt={post.id} />
        </Paper>
      </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
