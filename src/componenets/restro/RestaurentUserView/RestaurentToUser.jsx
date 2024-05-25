import ReviewsIcon from '@mui/icons-material/Reviews';
import React, { useEffect } from 'react'
import { Avatar, Box, Divider, Grid, Rating, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';


import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';
import { getUsersFoodAction } from '../../../Redux/restro/food/food.action';
import FoodCard from '../../posts/FoodCard';
import Specials from '../Specials';
import FrontImages from '../FrontImages';
import { createRestroCommentAction, createRestroRating, getRestroByRestroId } from '../../../Redux/restro/restro.action';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import QuickMenu from '../QuickMenu';
import LoginAlertModal from '../../LoginAlertModal';




// const food=[1,1,1,1,1,1,1,1,1,1,1];

function RestaurentToUser() {

    const { id } = useParams();

console.log(id)



  const dispatch=useDispatch();

  const food=useSelector(store=>store.food);
  const  restro  = useSelector((store) => store.restro); 

  useEffect(() => {
    if (id) {
      dispatch(getRestroByRestroId(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (restro?.restaurent && restro.restaurent?.user) {
      dispatch(getUsersFoodAction(restro.restaurent?.user.id));
    }
  }, [dispatch, restro?.restaurent,,food.newComment]);
  



  console.log("restroo -------",restro?.restaurent)

  
  // useEffect(() => {
  //   if (restro.restaurent && restro.restaurent.user) {
  //     dispatch(getUsersFoodAction(restro.restaurent.user.id));
  //   }
  // }, [dispatch, restro.restaurent]);
  
  

  console.log("food ------",food.userfood);


  const [showComments,setShowComments]=React.useState(false);

  const handleShowComment=()=>setShowComments(!showComments);


  const handleCreateComment=(content)=>{
    const reqData={
      restroId:restro.restaurent?.id,
      data:{
        content
      }
    }
    dispatch(createRestroCommentAction(reqData))
    .then(() => {
      
      dispatch(getRestroByRestroId(id));
    });
  }


  const calculateAverageRating = () => {
    if (restro.restaurent?.ratings && restro.restaurent?.ratings.length > 0) {
      const totalRating = restro.restaurent?.ratings.reduce(
        (acc, rating) => acc + rating.value,
        0
      );
      const averageRating = totalRating / restro.restaurent?.ratings.length;
      return averageRating.toFixed(1); // Round to one decimal place
    }
    return 0; // Default rating if no ratings available
  };

  const handleCreateRating=(value)=>{
    dispatch(createRestroRating(restro.restaurent?.id,value));
  }


  const width2= '340px';

  //models

  const [open2, setOpen2] = React.useState(false);
  const handleOpenQuickMenu = ()=> setOpen2(true);
  const handleClose =()=> setOpen2(false);


  const auth=useSelector(store=>store.auth);
  
  const [open7, setOpen7] = React.useState(false);
  const handleOpenloginalert = ()=> setOpen7(true);
  const handleClose7 =()=> setOpen7(false);
 
  return (


    <Box sx={{ marginTop: "80px" }}>
      {restro.restaurent ? (
     
      // Render content when restro.restaurent is available
<>
        <Box sx={{paddingX:30}}>

        <Grid  container spacing={9} sx={{display:'flex',paddingX:1}}>
        <Grid item xs={6} className='d-flex'>
        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
       {restro.restaurent?.restroName}
      </Typography>
      </Grid>
      <Grid item xs={3} className='d-flex' sx={{marginTop:1}}>
      <Rating
                value={
                  parseFloat(calculateAverageRating())
                }
                precision={0.5}
                size="medium"
                readOnly
              />
                </Grid>

                </Grid>

      

      <FrontImages item={restro?.restaurent} />
      <Box sx={{ display: 'flex' }}>
  {/* <Typography variant="body1" component="div" sx={{ mt: 1, marginLeft: 2, fontWeight: 'bold' }}>
    About:
  </Typography> */}

  <Typography variant="body1" component="div" sx={{ mt: 1, marginLeft: 1 }}>
   {restro.restaurent?.discription}
  </Typography>
</Box>
     
     <Box sx={{display:'flex',mt:2}}>
       <div style={{display:'flex',paddingLeft:15,color:'red'}}>
      <ReviewsIcon onClick={handleShowComment} sx={{cursor:'pointer'}}/>
      <Typography sx={{marginLeft:1,cursor:'pointer'}} onClick={handleShowComment}>Reviews</Typography>
      </div>

      <div style={{display:'flex',paddingLeft:15,color:'green'}}>
      <LocationOnIcon onClick={() => window.location.href = restro.restaurent?.location} sx={{cursor:"pointer"}}/>
         <Typography sx={{marginLeft:1,cursor:"pointer"}} onClick={() => window.location.href = restro.restaurent?.location}>Location</Typography>
      </div>

      <div style={{display:'flex',paddingLeft:15,color:'orange'}}>
        <MenuBookIcon sx={{marginLeft:1,cursor:"pointer"}} onClick={handleOpenQuickMenu}/>
         <Typography sx={{marginLeft:1,cursor:"pointer"}} onClick={handleOpenQuickMenu}>Quick Menu</Typography>
      </div>

      </Box>

      <Box sx={{display:'flex',mt:1}}>

 <Box sx={{display:'flex'}}>
   <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:2, fontWeight: 'bold'}}>
     City:
   </Typography>
   <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:1}}>
     {restro.restaurent?.city}
   </Typography>
 </Box>

 <Box sx={{display:'flex',marginLeft:2}}>
   <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:2, fontWeight: 'bold'}}>
     Address:
   </Typography>
   <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:1}}>
     {restro.restaurent?.adress}
   </Typography>
 </Box>


      </Box>




      </Box>

            

              <Box sx={{paddingX:30, marginTop:3,maxHeight:"600px",overflowY:'scroll',scrollbarWidth: 'thin',  
  scrollbarColor: '#fff #FFF',  
  msOverflowStyle: 'none',}}>
                    {showComments &&  <section style={{ marginTop: 12, marginLeft: 8 }}>


                    <Grid container>
             <Grid item xs={3} sx={{fontSize:'1.1rem',marginTop:'4px'}}>Share Your Experienece</Grid>
                                   <Grid item xs={4} sx={{marginTop:'4px'}}>
                                     <Rating
                                     name="value"
                                     onChange={(event, newValue) => {
                                      if(auth.user){
                                        setShowComments(true);
                                        handleCreateRating(newValue);
                                      }else{
                                        handleOpenloginalert()
                                      }
                                      
                                     
                                    }}
                                      precision={0.5}
                                      size="medium"
                                      /></Grid>
             </Grid>

              <div style={{marginTop:16}}>

          

                <input style={{width:'99%',borderColor:'#3b4054',outline:'none',paddingLeft:2}} onKeyPress={(e)=>{
                  if(e.key==="Enter" && e.target.value!==""){
                    if(auth.user){
                      handleCreateComment(e.target.value);
                      console.log("enter pressed...",e.target.value);
                    e.target.value="";
                    }else{
                      handleOpenloginalert()
                    }
                   

                  }
                }}
                placeholder='Write your comment...' type="text" />

              </div>

              <Divider/>

              <div style={{marginTop:"25px"}}>


                  
              { restro.restaurent?.restroComments?.map((comment)=> 

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

      
<Box sx={{paddingX:30, marginTop:10}}>

<Typography variant="h6" component="div" sx={{ mt: 1 ,marginLeft:1}}>
        Specials Today
      </Typography>
      {food.userfood && Array.isArray(food.userfood) && (
  <Specials sx={{ marginTop: 1 }} items={food.userfood} />
)}



</Box>

                    <Box sx={{paddingX:30, marginTop:10}}>
                      

                <Typography variant="h6" component="div" sx={{ mt: 1 ,marginLeft:1}}>
                    Menu
                  </Typography>

                  <Grid container spacing={2} sx={{marginTop:1}}>
                  {food.loading ? (
  <p>Loading...</p>
) : (
  food.userfood && Array.isArray(food.userfood) && (
    food.userfood.map((item) => (
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{marginLeft:{
        xl:0,
        lg:0,
        md:0,
        sm:0,
        xs:8,
      }}}  key={item.id}>
        
        <FoodCard item={item} widths={width2}/>
      </Grid>
    ))
  )
)}



              </Grid>

             
              </Box>
              </>

) : (
  <Typography variant="h5" component="div">
    Loading...
  </Typography>
)}


      <section>
        <QuickMenu open={open2} handleClose={handleClose} items={food.userfood} foodTypes={restro.restaurent?.foodType}/>
      </section>

      <section>
        <LoginAlertModal open={open7} handleClose={handleClose7}/>
      </section>
                
    </Box>


  )
}

export default RestaurentToUser
