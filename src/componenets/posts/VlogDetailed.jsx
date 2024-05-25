import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { IconButton } from "@mui/joy";
import ShareIcon from '@mui/icons-material/Share';
import { IncrementVlogViewAction, createReelCommentAction, getVlogByIdAction, likeVlogAction } from "../../Redux/vlogs/vlog.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isLikedByReqUser } from "../utils/isLikedByReqUser";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

function VlogDetailed(item) {
    const comment = [1, 1, 1, 1, 1, 11, 1, 1, 1, 11, 1];
    const name = "ajaykumar";
  
    const dispatch = useDispatch();
    const auth = useSelector(store => store.auth);

    // console.log("vlogs detailed", item);
    // console.log("user detailed", auth?.user);

    // const [likedByUser, setLikedByUser] = useState(false);

    const handleLikePost = () => {
        dispatch(likeVlogAction(item.item.id));
        // Update likedByUser state here if needed
    }
//     const user1 = auth.user.id;
//    const likedByUser = () => {
//     console.log("item like",item.liked)
//     for (let user of item.liked) {
//         if (user1 === user.id) {
//           return true;
//         }
//       }
//       return false;
//     }

    // useEffect(() => {
    //     // Check if item contains the necessary properties before accessing them
    //     if (item.item && item.item.liked) {
    //         setLikedByUser(isLikedByReqUser(auth.user?.id, item.item.liked));
    //     }
    // }, [item, auth.user, dispatch]);


    
  //timimg

  const now = new Date();
  const timeDifference = now.getTime() - (new Date(item.item?.createdAt)).getTime();

  const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  const months = Math.floor(days / 30);

  const year = Math.floor(months/12);

  const secondsDifference = Math.floor(timeDifference / 1000); 
  const minutes = Math.floor(secondsDifference / 60);
  const seconds = secondsDifference % 60;

  let displayingTime ;
  let TimeBack;
      if(year===0){
        if(months===0){
            if(days===0){
                if(hours===0){
                    if(minutes===0){
                        displayingTime=seconds;
                        TimeBack="seconds";
                    }else{
                        displayingTime=minutes;
                        TimeBack="minutes";
                    }
                }else{
                    displayingTime=hours;
                    TimeBack="hours";
                }
            }else{
                displayingTime=days;
                TimeBack="days"
            }
        }else{
            displayingTime=months;
            TimeBack="months";
        }
      }else{
        displayingTime=year;
        TimeBack="years";
      }

      //comment

      const handleCreateComment=(content)=>{
        const reqData={
          reelId:item.item.id,
          data:{
            content
          }
        }
        dispatch(createReelCommentAction(reqData))
     
      }


      //video views

      const [duration, setDuration] = useState(0);

      const [currentTime, setCurrentTime] = useState(0);

      const incrementViewCount = async () => {
        try {
          if (currentTime >= duration / 2) {
            
            dispatch(IncrementVlogViewAction(item.item?.id));
           
            
          }
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      };

      const [viewCounted, setViewCounted] = useState(false);

      const onTimeUpdate = (event) => {
        setCurrentTime(event.target.currentTime);
        if (!viewCounted && event.target.currentTime >= event.target.duration / 2) {
          incrementViewCount();
          setViewCounted(true); // Set viewCounted to true to prevent further incrementation
        }
      };

      if(currentTime===duration/2){
        console.log("vew activated...............")
      }
      const onDurationChange = (event) => {
        setDuration(event.target.duration);
      };
    
      const onLoad = (event) => {
        setDuration(event.target.duration);
      };

      const onPlay = () => {
        incrementViewCount();
      };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1", paddingX:{
        
        xl:35,
        lg:20,
        md:1,
        sm:1,
        xs:1,
       

      } ,marginTop:'5%'}}>
        <Box sx={{ display:'flex',justifyContent:'center', height: "400px",background:'black',borderRadius:'10px' }}>
        <video
          controls
          src={item.item.video}
          alt=""
          style={{ width: '100%' }}
          onPlay={incrementViewCount}
          onLoadedMetadata={onDurationChange}
          onLoad={onLoad}
          onTimeUpdate={onTimeUpdate} // Call onTimeUpdate function when time updates
        />
        </Box>
        <Box sx={{paddingX:2}}>
                        <Typography
                            variant="body2"
                            sx={{color:"rgb(98, 100, 102)", marginTop: "8px", fontSize: ".9rem" }}
                        >
                            {item.item.views} view , {displayingTime} {TimeBack} ago
                        </Typography>
                      <Typography
                            variant="body2"
                            sx={{ marginTop: "8px", fontSize: "1rem" }}
                        >
                            {item.item.title}
                        </Typography>
                      <Box sx={{mt:2,display:'grid'}}>
                        
                      <Box sx={{display:'flex'}}>
                        <Grid container>
                            <Grid item xs={11}>
                            <IconButton
                             onClick={handleLikePost}
                            >
                            {/* {likedByUser() ? <ThumbUpAltIcon sx={{color:'red'}} /> : <ThumbUpOffAltIcon sx={{ color: 'rgb(68, 67, 67)'}}/>} */}
                            <ThumbUpAltIcon sx={{color:'blue'}} />
                              </IconButton>
                              <IconButton>
                              <ThumbDownOffAltIcon/>
                              </IconButton>
                            </Grid>
                            <Grid item xs={1}>
                              <IconButton>
                                  <ShareIcon/>
                              </IconButton>
                            </Grid>
                        </Grid>
                         
                        </Box>
                        <Grid container  sx={{mt:2}}>
                            <Grid item xs={0} >


 {item.item.user?.image?  <Avatar sx={{height:"1.9rem",width:"1.9rem",fontSize:".9rem",background:"green"}} src={item.itemuser?.image} /> :  <Avatar sx={{height:"1.9rem",width:"1.9rem",fontSize:".9rem",background:"green"}}>
                         {item.item.user?.firstname[0].toUpperCase()}</Avatar>}

                            </Grid>
                            <Grid item xs={9}>
                                <Typography sx={{  fontSize: "1rem",fontWeight:'bold' ,color:'black',marginLeft:'7px',marginTop:'3px'}} color="text.secondary">
                                    {item.item.user?.firstname}
                                </Typography>
                            </Grid>
                        </Grid>


                        </Box>
        </Box>

                            <Box style={{marginTop:"25px",marginLeft:'40px'}}>

                          <Typography>
                            Comments
                          </Typography>

                          <input style={{width:'99%',borderColor:'#3b4054',outline:'none',paddingLeft:2,marginTop:14,marginBottom:14}} onKeyPress={(e)=>{
                                          if(e.key==="Enter" && e.target.value!==""){
                                            handleCreateComment(e.target.value);
                                            console.log("enter pressed...",e.target.value);
                                          e.target.value="";

                                          }
                                        }}
                                        placeholder='Write your comment...' type="text" />
                                    
                            
                                    { item.item.comments?.map((comment)=> 

                                                <div style={{marginTop:6,display:'flex'}}>

                                                {comment.user?.image?  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}} src={comment.user?.image} /> :  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}}>
                                                {comment.user?.firstname[0].toUpperCase()}</Avatar>}

                                                    

                                                        
                                                        <div> <p style={{marginLeft:5,color:"rgb(98, 100, 102)",width:100}}>{comment.user.firstname}</p>
                                                        {comment.content}
                                                        </div>


                                                        </div>
                                                )} 


                            </Box>
      </Box>
    </div>
  );
}

export default VlogDetailed;
