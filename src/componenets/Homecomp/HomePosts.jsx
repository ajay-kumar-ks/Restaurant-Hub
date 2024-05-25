import React, { useEffect, useState } from 'react'
import { getTrendingPostAction } from '../../Redux/post/post.action';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import PostCard from '../posts/PostCard';

function HomePosts() {

    const dispatch = useDispatch();
    const post = useSelector(store => store.post);

    const [isLoading, setLoading] = useState(false);

  console.log("trending postttttttsss",post.posts)

    const fetchData = async () => {
      try {
        console.log("Fetching best's food data...");
        setLoading(true);
        await dispatch(getTrendingPostAction());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching best's food data:", error);
     
      }
    };

    useEffect(() => {
        fetchData();
      }, [dispatch,post.newComment]);

  return (
    <div>
       <Grid container spacing={7} sx={{ justifyContent: 'center', display: 'flex' }}>
              {post.posts?.map((item) => (
                <Grid item xs={5} key={item}>
                  {/* Use a unique identifier for the key */}
                  <PostCard item={item}/>
                </Grid>
              ))}
            </Grid>
    </div>
  )
}

export default HomePosts
