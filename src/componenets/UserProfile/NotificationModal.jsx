import * as React from 'react';
import Box from '@mui/material/Box';
import {  Divider, Grid,   Modal } from '@mui/material';
import Typography from "@mui/material/Typography";






const style = {
  position: 'absolute',
  top: '47%',
  left: '83.5%',
  transform: 'translate(-50%, -50%)',
  width: 440,
  height:590,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline:"none",
  borderRadius: 3,
  
  msOverflowStyle: 'none',

};

export default function NotificationModal({open, handleClose}) {

  

   



  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
     
     <Box>
       Notifications
     </Box>
          
        <Divider sx={{marginTop:1,background:'black'}}/>
               

                <Box sx={{display:'grid',width:'98%',marginTop:2,overflowY:'scroll',height:510,  scrollbarWidth: 'thin',  
  scrollbarColor: '#fff #FFF',}}>


                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>

                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>

                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>

                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>

                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>
                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>
                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>
                     <Grid container spacing={2} sx={{":hover":{
                            background:'#DDDDDD',
                         },borderRadius:2,marginLeft:.5,marginTop:'1px'}}>
                         <Grid item xs={7} sx={{marginTop:1,marginBottom:1}}>
                            <Typography variant='p' >
                              Marayoor Biriyani
                              Lorem ipsum dolor sit amet 
                            </Typography>
                         </Grid>
                         <Grid item xs={4} sx={{display:'flex',justifyContent:"center",alignItems:'center',marginBottom:2}}>
                            <img src="https://cdn.pixabay.com/photo/2023/12/13/17/54/bun-8447394_640.jpg" alt="" />
                         </Grid>
                     </Grid>
                </Box>
         
      
        </Box>
        
      </Modal>
    </div>
  );
}
