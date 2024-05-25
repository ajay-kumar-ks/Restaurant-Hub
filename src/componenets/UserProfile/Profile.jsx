import { Avatar, Button, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tab, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../../Redux/Auth/auth.action';
import { deepOrange } from '@mui/material/colors';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import SourceIcon from '@mui/icons-material/Source';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreateIcon from '@mui/icons-material/Create';
import AddToQueueIcon from '@mui/icons-material/AddToQueue';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import CreatePostModal from './profilemodals/CreatePostModal';
import { getUsersPostAction } from '../../Redux/post/post.action';
import PostCard from '../posts/PostCard';
import EditProfileModal from './profilemodals/EditProfileModal';
import CreateVlogModal from './profilemodals/CreateVlogModal';
import VlogCard from '../posts/VlogCard';
import { getUsersVlogAction } from '../../Redux/vlogs/vlog.action';

function Profile() {


    const authSelector = state => state.auth;
    const auth = useSelector(authSelector);
    const post=useSelector(store=>store.post);
    const vlog = useSelector(store=>store.vlog);
    
      const dispatch=useDispatch();
      const jwt= localStorage.getItem("jwt");
      
      
      useEffect(() => {
        dispatch(getProfileAction(jwt));
      }, [jwt]);
      
      useEffect(() => {
        if (auth.user?.id) {
          dispatch(getUsersPostAction(auth.user.id));
        }
      }, [auth.user?.id,post.newComment]);


      
      console.log("postt",post.userposts)

      useEffect(() => {
        if (auth.user?.id) {
          dispatch(getUsersVlogAction(auth.user.id));
        }
      }, [auth.user?.id]);

      console.log("vlog",vlog.vlogs)



      const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);            
  };


  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => (event) => {
    event.stopPropagation();
    setOpen(newOpen);
  };
  

 


//models ? for drawer

  const [open2, setOpen2] = React.useState(false);
  const handleOpenCreatePostModal = ()=> setOpen2(true);
  const handleClose =()=> setOpen2(false);

  const [open3, setOpen3] = React.useState(false);
  const handleOpenUpdateProfileModal = ()=> setOpen3(true);
  const handleClose3 =()=> setOpen3(false);
 
  const [open4, setOpen4] = React.useState(false);
  const handleCreateVlogModal = ()=> setOpen4(true);
  const handleClose4 =()=> setOpen4(false);



  const DrawerList = (

    <Box sx={{ width: 250 ,marginTop:3}} role="presentation" onClick={toggleDrawer(false)}>
      {/* {console.log("open value:", open)} */}

      <List sx={{marginTop:6}}>
        {['Create Post', 'Create Vlog', 'Manage Contenet'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => index === 0 ? handleOpenCreatePostModal() : index === 1 ? handleCreateVlogModal() : index === 2 ? "aryou ok" : index === 3 ? "nicee" : ""}>
             
              <ListItemIcon>
                {index === 0 ? <AddAPhotoIcon/> : index === 1 ? <AddToQueueIcon/> : index === 2 ? <SourceIcon/> :""}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Notifications','Bookings', 'Edit Profile', 'More'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton  onClick={() => index === 2 ? handleOpenUpdateProfileModal() :""}>
              <ListItemIcon>
              {index === 0 ? <NotificationsIcon/> :index === 1 ? <RestaurantMenuIcon/> : index === 2 ? <CreateIcon/> : <MoreHorizIcon/>}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );




  return (
    <div>
      <Box sx={{ width: '100%', paddingX: 36 ,marginTop:'9%',}}>
         <Box sx={{display:'flex',marginLeft:4}}>
      {auth.user?.image?  <Avatar sx={{ width:'10rem',height:'10rem',fontSize:'3rem'}} src={auth.user?.image} /> :  <Avatar sx={{ bgcolor: deepOrange[500] ,width:'10rem',height:'10rem',fontSize:'3rem'}}>
            {auth.user?.firstname[0].toUpperCase()}</Avatar>}
          
             <Box sx={{marginLeft:5}}>
             <Typography variant="h4" sx={{marginLeft:'-1px',marginTop:'14px'}}>{auth.user?.firstname}</Typography>
           <Typography sx={{marginTop:'14px'}}>Home: konnathady</Typography>
           <Button variant="outlined" sx={{marginTop:'16px'}} onClick={toggleDrawer(true)}>Settings</Button>
             </Box>
             
           
         </Box>

      </Box>


      <Box sx={{ width: '100%', typography: 'body1', paddingX: 30,marginTop:6 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ paddingX: 4 }}>
              <Tab label="Post" value="1" />
              <Tab label="Vlog" value="2" />
            
            </TabList>
          </Box>
          <TabPanel value="1">

            <Grid container  spacing={2}>
            {post.userposts.map((item) =>
              <Grid item xs="4" key={item.id}>
              
                <PostCard item={item}/>
               
              </Grid>)}

            </Grid>
     
         
          </TabPanel>
          <TabPanel value="2">
          <Grid container  spacing={2}>
            {vlog.vlogs?.map((item) =>
              <Grid item xs="4" key={item?.id}>
              
                <VlogCard item={item}/>
               
              </Grid>)}

            </Grid>
          </TabPanel>
       
        </TabContext>
      </Box>


      <Drawer open={open} onClose={toggleDrawer(false)} anchor={'top'}>
  {DrawerList}
</Drawer>

<section>
        <CreatePostModal open={open2} handleClose={handleClose}/>
      </section>

      <section>
        <EditProfileModal open={open3} handleClose={handleClose3} item={auth.user}/>
      </section>

      <section>
        <CreateVlogModal open={open4} handleClose={handleClose4} item={auth.user}/>
      </section>

    </div>
  )
}

export default Profile
