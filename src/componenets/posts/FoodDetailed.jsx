import * as React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Avatar, Divider, Grid, IconButton, ImageListItem,  Modal, Rating } from '@mui/material';
import ReviewsIcon from '@mui/icons-material/Reviews';
import { createFoodCommentAction, createFoodRating } from '../../Redux/restro/food/food.action';
import { useDispatch, useSelector } from 'react-redux';
import { isRatedByUser } from '../utils/isRatedByUser';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import CustomAlert from '../CustomAlert';
import LoginAlertModal from '../LoginAlertModal';





const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline:"none",
  overFlowY:"scroll",
  borderRadius: 3,
  scrollbarWidth: 'thin',  // Firefox
  scrollbarColor: '#fff #FFF',  // Webkit (Chrome, Safari)
  msOverflowStyle: 'none',

};

export default function FoodDetailed({open, handleClose ,item}) {

  const dispatch=useDispatch();
  

  const auth=useSelector(store=>store.auth);
  
  const [open7, setOpen7] = React.useState(false);
  const handleOpenloginalert = ()=> setOpen7(true);
  const handleClose7 =()=> setOpen7(false);


  

  const handleCreateRating=(value)=>{
    dispatch(createFoodRating(item.id,value));
  }

    const calculateAverageRating = () => {
        if (item.rating && item.rating.length > 0) {
          const totalRating = item.rating.reduce(
            (acc, rating) => acc + rating.value,
            0
          );
          const averageRating = totalRating / item.rating.length;
          return averageRating.toFixed(1); // Round to one decimal place
        }
        return 0; // Default rating if no ratings available
      };

      const [showComments,setShowComments]=React.useState(false);

      const handleShowComment=()=>setShowComments(!showComments);


      const handleCreateComment=(content)=>{
        const reqData={
          foodId:item.id,
          data:{
            content
          }
        }
        dispatch(createFoodCommentAction(reqData))
     
      }

      const userRatingInfo = isRatedByUser(auth.user?.id, item);

      //go to restaurent

      const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  useEffect(() => {
    if (shouldNavigate  && item.restaurent.id) {
      navigate(`/restaurent/${item.restaurent.id}`);
    }
  }, [shouldNavigate ,item.restaurent.id, navigate]);

  const handleClick = () => {
    setShouldNavigate(true);

  };



  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
     
          
        <div className='flex items-center space-x-3' style={{ overflowY: 'scroll', maxHeight: '670px' }}>
                <div className='flex items-center space-x-3'>
                  <Grid container>
                    <Grid item xs={1}>
                    <IconButton onClick={handleClose}>

                       <CloseIcon/>
                       </IconButton>
                    </Grid>
                   
                    <Grid item xs={8} sx={{fontSize:'.9rem',cursor:'pointer',marginTop:1,color:'#333399','&:hover': {
     color:'#000066',fontSize:'.91rem',
    },}}
    onClick={handleClick}
    >@{item.restaurent.restroName}</Grid>
                
                    </Grid>
         <ImageListItem>
          <img src={item.image} alt="" loading="lazy" />
        
        </ImageListItem>
                      <Box sx={{paddingTop:'5px',paddingLeft:1}}>

                          <Grid container >
                                <Grid item xs={3} sx={{fontSize:'1.3rem',}}>{item.name}</Grid>
                                <Grid item xs={3} sx={{marginTop:"6px"}}> 
                                 <Rating 
                                   value={parseFloat(calculateAverageRating())}
                                   precision={0.5}
                                   size="medium"
                                   readOnly
                                 /></Grid>
                            </Grid>
                          <Box sx={{marginTop:"3px"}}>
                            <Grid container sx={{fontSize:'1rem'}}>
                                <Grid item xs={1}>Price:</Grid>
                                <Grid item xs={1}><del>200</del></Grid>
                                <Grid item xs={2} sx={{color:'green'}} >{item.price}</Grid>
                            </Grid>
                          </Box>
                          <p style={{marginTop:'6px'}}>{item.caption}</p>
                      </Box>

                   <Box sx={{borderTop:1,marginTop:'10px', borderColor: 'rgb(194, 196, 198)'}}>

                          <Box sx={{marginTop:"6px"}}>
                             <Grid container >
                                  <Grid item xs={1} >  <IconButton onClick={handleShowComment} sx={{color:'red'}}>
                              {<ReviewsIcon/>}

                                </IconButton> 
                                </Grid>
                                
                                   <Grid item xs={4} sx={{fontSize:'1.1rem',marginTop:'4px'}}>Share Your Experienece</Grid>
                                   <Grid item xs={6} sx={{marginTop:'4px'}} onClick={handleShowComment}>

                                   {userRatingInfo.isRated ? (
        <Rating value={userRatingInfo.ratingValue}  precision={0.5} size="medium" readOnly />
      ) : (
        <Rating
          name="value"
          onChange={(event, newValue) => {
            if(auth.user){
            setShowComments(true);
            handleCreateRating(newValue);
            }else{
              handleOpenloginalert();
            }
          }}
          precision={0.5}
          size="medium"
        />
      )}
                                    
                                      </Grid>
                               </Grid>
                          </Box> 
                        

                          {showComments &&  <section style={{ marginTop: 12, marginLeft: 8 }}>


                                      <div   >

                                       

                                        <input style={{width:'99%',borderColor:'#3b4054',outline:'none',paddingLeft:2}} onKeyPress={(e)=>{
                                          if(e.key==="Enter" && e.target.value!=="" ){
                                            if(auth.user){
        
                                              handleCreateComment(e.target.value);
                                              console.log("enter pressed...",e.target.value);
                                            e.target.value="";
                                            }else{
                                              handleOpenloginalert();
                                            }
                                           

                                          }
                                        }}
                                        placeholder='Write your comment...' type="text" />

                                      </div>

                                      <Divider/>

                                      <div style={{marginTop:"10px"}}>


                                          
                                      { item.comments?.map((comment)=> 

                                          <div style={{marginTop:6,display:'flex'}}>

                              {comment.user?.image?  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}} src={comment.user?.image} /> :  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}}>
                                          {comment.user?.firstname[0].toUpperCase()}</Avatar>}

                                                 

                                                    
                                                    <div> <p style={{marginLeft:5,color:"rgb(98, 100, 102)",width:100}}>{comment.user.firstname}</p>
                                                    {comment.content}
                                                    </div>


                                                    </div>
                                          )} 


                                      </div>

                                      </section>}
                   </Box>
                   

                </div>
              

            </div>
               
             
      
        </Box>
        
      </Modal>
      <section>
        <LoginAlertModal open={open7} handleClose={handleClose7}/>
      </section>
    </div>
  );
}
