import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Divider, Grid, IconButton, ImageListItem,  Modal, Rating, TextField, Typography } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { createFoodCommentAction, createFoodRating } from '../../Redux/restro/food/food.action';
import { useDispatch, useSelector } from 'react-redux';
import { isRatedByUser } from '../utils/isRatedByUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isLikedByReqUser } from '../utils/isLikedByReqUser';

import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { createCommentAction, likePostAction } from '../../Redux/post/post.action';
import LoginAlertModal from '../LoginAlertModal';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
 minHeight:450,
  maxHeight:700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline:"none",
  overFlowY:"scroll",
  borderRadius: 3,
  scrollbarWidth: 'thin',  // Firefox
  scrollbarColor: '#fff #FFF',  // Webkit (Chrome, Safari)
  msOverflowStyle: 'none',
  display:'flex'

};

export default function PostDetailed({open, handleClose ,item}) {
    

  const dispatch=useDispatch();

  const auth=useSelector(store=>store.auth);

  const [likedByUser, setLikedByUser] = useState(isLikedByReqUser(auth.user?.id, item));

  const handleLikePost = () => {
    dispatch(likePostAction(item.id));
   
    setLikedByUser(!likedByUser);
  }



      const [showComments,setShowComments]=React.useState(false);

      


      const handleCreateComment=(content)=>{
        const reqData={
          postId:item.id,
          data:{
            content
          }
        }
        dispatch(createCommentAction(reqData))
      }

      //go to restaurent

      const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

//   useEffect(() => {
//     if (shouldNavigate  && item.restaurent.id) {
//       navigate(`/restaurent/${item.restaurent.id}`);
//     }
//   }, [shouldNavigate ,item.restaurent.id, navigate]);

  const handleClick = () => {
    setShouldNavigate(true);
  };

  const [open7, setOpen7] = React.useState(false);
  const handleOpenloginalert = ()=> setOpen7(true);
  const handleClose7 =()=> setOpen7(false);


  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

          <Grid container spacing={2} sx={{overFlowY:'scroll'}}>

            <Grid item  xs={6}>
       
                    <IconButton onClick={handleClose}>

                       <CloseIcon/>
                       </IconButton>
                 

         <ImageListItem sx={{}}>
          <img src={item.image} alt="" loading="lazy" />
        
        </ImageListItem>

      <Grid container spacing={1} sx={{marginTop:'4px'}}>
         <Grid item xs={2}>
        <IconButton onClick={ ()=>{
          if(auth.user){
            handleLikePost()
          }else{
            handleOpenloginalert()
          }
          }}>
      {isLikedByReqUser(auth.user?.id, item, likedByUser) ? <FavoriteIcon sx={{color:'red'}} /> : <FavoriteBorderIcon sx={{ color: 'rgb(68, 67, 67)'}}/>}
     </IconButton>
     </Grid>
     <Grid item xs={6} sx={{marginTop:'5px'}}>     {item.tag && item.tagRestro ? <Typography variant="body2" color="text.secondary" sx={{color:'#333399','&:hover': {
            color:'#000066',fontSize:'.88rem',},cursor:'pointer'}}
            onClick={handleClick}
            >
             @{item.tag }
            </Typography> : ""}</Grid>
     </Grid>
       
       <Grid item sx={12}>
        {item.caption}
       </Grid>
            </Grid>
     
          
        <Grid item xs={6}  sx={{minWidth:'300px',marginTop:'4%'}}>
               
        <Box sx={{ marginLeft: '10px', marginTop: '3px', overflowY: 'auto', maxHeight: '450px' }}>
                                

                                          
              { item.comments?.map((comment)=> 

       <div style={{marginTop:6,display:'flex'}}>
       

            {comment.user?.image?  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}} src={comment.user?.image} /> :  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}}>
                                          {comment.user?.firstname[0].toUpperCase()}</Avatar>}

        
          <div> <p style={{marginLeft:5,color:"rgb(98, 100, 102)",width:100}}>{comment.user.firstname}</p>
          {comment.content}
          </div>


         </div>








 )} 

                              
                               
                            
     
           </Box>
                    
                    
                   

        </Grid>
              
              <Grid item xs={6}>
                
              </Grid>

              <Grid item xs={6}>
              <TextField label="Comment..."  sx={{width:'100%'}}onKeyPress={(e)=>{
                  if(e.key==="Enter" && e.target.value!==""){
                    if(auth.user){
                      handleCreateComment(e.target.value);
                      console.log("enter pressed...",e.target.value);
                      e.target.value="";
                    }else{
                      handleOpenloginalert()
                    }
                   

                  } }}/>
              </Grid>

       


                </Grid>
               
             
      
        </Box>
      </Modal>
   
      <section>
        <LoginAlertModal open={open7} handleClose={handleClose7}/>
      </section>
    </div>
  );
}
