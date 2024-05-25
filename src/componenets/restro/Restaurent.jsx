

import StarRateIcon from '@mui/icons-material/StarRate';
import ReviewsIcon from '@mui/icons-material/Reviews';
import React, { useEffect } from 'react'
import FrontImages from './FrontImages'
import { Avatar, Box, Button, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FoodCard from '../posts/FoodCard';
import Specials from './Specials';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import StarsIcon from '@mui/icons-material/Stars';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import EditRestautrent from './UsersRestro/EditRestaurent';
import AddCoverPic from './UsersRestro/AddCoverPic';
import AddFood from './UsersRestro/AddFood';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFoodAction } from '../../Redux/restro/food/food.action';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import SetSpecialFoodModel from './UsersRestro/SetSpecialFoodModel';
import SetFoodAvailable from './UsersRestro/SetFoodAvailable';
import { createRestroCommentAction } from '../../Redux/restro/restro.action';




// const food=[1,1,1,1,1,1,1,1,1,1,1];

function Restaurent({item}) {

  console.log("Restaurent component rendering...");

  const dispatch=useDispatch();
  const food=useSelector(store=>store.food);

  const [open2, setOpen2] = React.useState(false);
  const handleOpenRestroEditModal = ()=> setOpen2(true);
  const handleClose =()=> setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpenAddCoverPic = ()=> setOpen3(true);
  const handleClose2 =()=> setOpen3(false);

  const [open4, setOpen4] = React.useState(false);
  const handleOpenAddFood = ()=> setOpen4(true);
  const handleClose3 =()=> setOpen4(false);

  const [open5, setOpen5] = React.useState(false);
  const handleOpenSpecialFood = ()=>  setOpen5(true);
  const handleClose4 =()=> setOpen5(false);

  const [open6, setOpen6] = React.useState(false);
  const handleOpenSetAvailablity = ()=>  setOpen6(true);
  const handleClose5 =()=> setOpen6(false);



  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const auth=useSelector(store=>store.auth);
  // console.log("auth --------",auth); 

  
  useEffect(() => {
    console.log("Fetching user's food data...");
    dispatch(getUsersFoodAction(auth.user.id));
  }, [dispatch, auth.user.id,food.newComment]);
  
  

  console.log("food ------",food.userfood);


  const [showComments,setShowComments]=React.useState(false);

  const handleShowComment=()=>setShowComments(!showComments);
  

  const DrawerList = (

    <Box sx={{ width: 250 ,marginTop:3}} role="presentation" onClick={toggleDrawer(false)}>
      {console.log("open value:", open)}

      <List sx={{marginTop:6}}>
        {['Edit Restaurent', 'Add Cover Photos', 'Add Food', 'Special Foods'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => index === 0 ? handleOpenRestroEditModal() : index === 1 ? handleOpenAddCoverPic() : index === 2 ? handleOpenAddFood() : index === 3 ? handleOpenSpecialFood() : ""}>
             
              <ListItemIcon>
                {index === 0 ? <EditIcon /> : index === 1 ? <AddPhotoAlternateIcon/> : index === 2 ? <FoodBankIcon/> : <StarsIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Food Availability','Table Bookings', 'Tags', 'More'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton  onClick={() => index === 0 ? handleOpenSetAvailablity() :""}>
              <ListItemIcon>
              {index === 0 ? <FileDownloadDoneIcon/> :index === 1 ? <TableRestaurantIcon/> : index === 2 ? <LocalOfferIcon/> : <MoreHorizIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );




  const handleCreateComment=(content)=>{
    const reqData={
      restroId:item.id,
      data:{
        content
      }
    }
    dispatch(createRestroCommentAction(reqData))
 

  }


  
   const width2= '340px';
  
 



  return (
    // <div style={{marginTop:"80px"}}>
    //   <Box sx={{paddingX:40}}>

    //   <div><h1 className="py-1 font-bold text-xl">Hills View Restaurent</h1></div>
    //   <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam ut rerum alias quae nihil dolores autem optio inventore ex vel aut doloremque, quo ratione, quos, voluptas at saepe id culpa?</p>
      
    //   <FrontImages/>
    //   </Box>
    // </div>

    <Box  sx={{marginTop:"80px"}}>
        <Box sx={{paddingX:{
           xl:30,
           lg:20,
           md:1,
           sm:1,
           xs:1,
        }}}>

        <Grid  container spacing={9} sx={{display:'flex',paddingX:1}}>
        <Grid item xs={6} className='d-flex'>
        <Typography variant="h4" component="div" sx={{ mb: 2 }}>
       {item.restroName}
      </Typography>
      </Grid>
      <Grid item xs={3} className='d-flex' sx={{marginTop:1}}>
                 <StarRateIcon sx={{color:'orange'}}/>
                 <StarRateIcon  sx={{color:'orange'}}/>
                 <StarRateIcon  sx={{color:'orange'}}/>
                 <StarRateIcon  sx={{color:'orange'}}/>
                 <StarRateIcon/>
                </Grid>

                <Grid item xs={3} className='d-flex'>

                {true?<Button  onClick={toggleDrawer(true)}
                  sx={{borderRadius:"20px",marginTop:"5px"}} variant="outlined">Settings</Button>:<Button variant="outlined">Follow</Button>}
       
      </Grid>
                </Grid>

      

      <FrontImages item={item}/>
      <Box sx={{ display: 'flex' }}>
  {/* <Typography variant="body1" component="div" sx={{ mt: 1, marginLeft: 2, fontWeight: 'bold' }}>
    About:
  </Typography> */}

  <Typography variant="body1" component="div" sx={{ mt: 1, marginLeft: 1 }}>
   {item.discription}
  </Typography>
</Box>
     
     <Box sx={{display:'flex',mt:2}}>
     <div style={{display:'flex',paddingLeft:15,color:'red'}}>
      <ReviewsIcon onClick={handleShowComment} sx={{cursor:'pointer'}}/>
      <Typography sx={{marginLeft:1,cursor:'pointer'}} onClick={handleShowComment}>Reviews</Typography>
      </div>

      <div style={{display:'flex',paddingLeft:15,color:'green'}}>
      <LocationOnIcon onClick={() => window.location.href = item.location} sx={{cursor:"pointer"}}/>
         <Typography sx={{marginLeft:1,cursor:"pointer"}} onClick={() => window.location.href = item.location}>Location</Typography>
      </div>
      </Box>

      <Box sx={{display:'flex',mt:1}}>

      <Box sx={{display:'flex'}}>
      <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:2, fontWeight: 'bold'}}>
        City:
      </Typography>
      <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:1}}>
        {item.city}
      </Typography>
      </Box>

      <Box sx={{display:'flex',marginLeft:2}}>
      <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:2, fontWeight: 'bold'}}>
        Address:
      </Typography>
      <Typography variant="p" component="div" sx={{ mt: 1 ,marginLeft:1}}>
        {item.adress}
      </Typography>
      </Box>

      </Box>



      </Box>


      <Box sx={{paddingX:{
         xl:30,
         lg:20,
         md:1,
         sm:1,
         xs:1,
      }, marginTop:0,maxHeight:"600px",overflowY:'scroll',scrollbarWidth: 'thin',  
  scrollbarColor: '#fff #FFF',  
  msOverflowStyle: 'none',}}>
  {showComments &&  
    <section style={{ marginTop: 12, marginLeft: 8 }}>
      {/* ... */}
      <div style={{marginTop:16}}>
        <input 
          style={{width:'99%',borderColor:'#3b4054',outline:'none',paddingLeft:2}} 
          onKeyPress={(e)=>{
            if(e.key==="Enter" && e.target.value!==""){
              handleCreateComment(e.target.value);
              console.log("enter pressed...",e.target.value);
              e.target.value="";
            }
          }}
          placeholder='Write your comment...' 
          type="text" 
        />
      </div>
      <Divider/>
      <div style={{marginTop:"25px"}}>
        {item.restroComments?.map((comment) => 
          <div style={{marginTop:6,display:'flex'}}>
           {comment.user?.image?  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}} src={comment.user?.image} /> :  <Avatar sx={{height:"1.5rem",width:"1.5rem",fontSize:".8rem",marginTop:"3px",background:"green"}}>
            {comment.user?.firstname[0].toUpperCase()}</Avatar>}
            <div>
              <p style={{marginLeft:5,color:"rgb(98, 100, 102)",width:100}}>{comment.user.firstname}</p>
              {comment.content}
            </div>
          </div>
        )}
      </div>
    </section>
  }
</Box>

      
<Box sx={{paddingX:{
   xl:30,
   lg:20,
   md:1,
   sm:1,
   xs:1,
}, marginTop:10}}>

<Typography variant="h6" component="div" sx={{ mt: 1 ,marginLeft:1}}>
        Specials Today
      </Typography>
      {food.userfood && Array.isArray(food.userfood) && (
  <Specials sx={{ marginTop: 1 }} items={food.userfood} />
)}


</Box>

                    <Box sx={{paddingX:{
                       xl:30,
                       lg:16,
                       md:1,
                       sm:1,
                       xs:1,
                    }, marginTop:10}}>

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

              <Drawer open={open} onClose={toggleDrawer(false)} anchor={'right'}>
  {DrawerList}
</Drawer>
            

      <section>
        <EditRestautrent open={open2} handleClose={handleClose}/>
      </section>
      <section>
        <AddCoverPic open={open3} handleClose={handleClose2}/>
      </section>
      <section>
        <AddFood open={open4} handleClose={handleClose3} items={item}/>
      </section>

      <section>
        <SetSpecialFoodModel items={food.userfood} open={open5} handleClose={handleClose4}/>
      </section>

      
      <section>
        <SetFoodAvailable items={food.userfood} open={open6} handleClose={handleClose5}/>
      </section>

    </Box>


  )
}

export default Restaurent
