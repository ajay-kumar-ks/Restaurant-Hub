



import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import HomeIcon from '@mui/icons-material/Home';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HelpIcon from '@mui/icons-material/Help';
import { Chip, Tooltip } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileAction } from '../Redux/Auth/auth.action';
import NotificationModal from './UserProfile/NotificationModal';



function Navbar() {

  const authSelector = state => state.auth;
const auth = useSelector(authSelector);

  const dispatch=useDispatch();
  const jwt= localStorage.getItem("jwt");
  
  useEffect(() => {
    // Check if jwt exists before dispatching the action
    if (jwt) {
      dispatch(getProfileAction(jwt));
    }
  }, [jwt]);


  const [value, setValue] = React.useState('home');
  const [auth2, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);

    if (newValue === 'home') {
      navigate('/'); 
    } else if (newValue === 'vlog') {
      navigate('/vlogs');
    } else if (newValue === 'restaurant') {
      navigate('/restaurent');
    } else if (newValue === 'help'){
      navigate('/help');
    }  

  };

  const handleChange2=()=>{
    navigate('/profile');

  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleChangeShowNotifications = ()=> setOpen(true);
  const handleClose2 =()=> setOpen(false);




  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ background: '#0C2D57', top: 0, zIndex: 1201 }}>
          <Toolbar>
           


        <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 0 }}
            >
              <RoomServiceIcon sx={{ color: "#F99417" }} />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ color: "#F99417" }}>
              GRUB
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <BottomNavigation sx={{ width: 500, background: "#0C2D57" }} value={value} onChange={handleChange}>
                <BottomNavigationAction sx={{ color: "#fff", '&.Mui-selected': { color: '#F99417' } }} label="Home" value="home"  icon={<Tooltip title="Home" ><HomeIcon /></Tooltip>} />
                <BottomNavigationAction sx={{ color: "#fff", '&.Mui-selected': { color: '#F99417' } }} label="Vlog" value="vlog" icon={<Tooltip title="Vlog" ><PlayArrowIcon /></Tooltip>} />
                <BottomNavigationAction sx={{ color: "#fff", '&.Mui-selected': { color: '#F99417' } }} label="Restaurant" value="restaurant" icon={<Tooltip title="Restaurent" ><RoomServiceIcon /></Tooltip>} />
                <BottomNavigationAction sx={{ color: "#fff", '&.Mui-selected': { color: '#F99417' } }} label="Help" value="help" icon={<Tooltip title="Help" ><HelpIcon /></Tooltip>} />
              </BottomNavigation>
            </Box>
            {auth2 && (
              <div>
              <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={auth.user ? handleMenu : () => navigate("/login")}
                    color="inherit"
                      >                  
                    {auth.user ? (
                      <Tooltip title="Profile">
                        <AccountCircle />
                      </Tooltip>
                    ) : (
                      <Chip
                        sx={{ color: "white" }}
                        label="Login"
                        variant="outlined"
                      />
                    )}
               </IconButton>

             <Menu
             sx={{
              marginTop:5
             }}
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                                  {auth.user? (
                    <div>
                      <MenuItem onClick={handleChange2} sx={{height:'7px',width:'115'}}>Profile</MenuItem> 
                      <MenuItem onClick={handleChangeShowNotifications} sx={{height:'7px',width:'115',mt:2}}>Notifications</MenuItem>  
                    <MenuItem onClick={()=>{localStorage.removeItem('jwt');
                     navigate('/');  
                  }} sx={{height:'7px',width:'115',mt:2}}>logout</MenuItem>
                   </div>              
                  ) :""}
                </Menu>
              </div>
            )} 

          </Toolbar>
        </AppBar>
        <section>
          <NotificationModal open={open} handleClose={handleClose2}/>
        </section>
      </Box>
    </div>
  );
}

export default Navbar;
