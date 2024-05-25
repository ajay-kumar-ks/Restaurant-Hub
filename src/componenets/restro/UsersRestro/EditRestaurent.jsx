import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import { Avatar, Grid, IconButton, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { updateRestroAction } from '../../../Redux/restro/restro.action';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  outline:"none",
  overFlow:"scrolly-y",
  borderRadious: 3,
};

export default function EditRestautrent({open, handleClose}) {

    const dispatch=useDispatch();

    // const handleSubmit=(values)=>{
    //     console.log("values",values)
    // }

    const formik=useFormik({
      initialValues:{
          restroName:"",
          adress:"",
          discription:"",
          city:"",
          location:""
      },
      
      onSubmit: (values) => {
          console.log("values ", values);
          dispatch(updateRestroAction(values));
      },
      
})




  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
     
          <form  onSubmit={formik.handleSubmit}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                    <IconButton onClick={handleClose}>

                      <CloseIcon/>
                    </IconButton>
<Grid container spacing={9} sx={{display:'flex',paddingX:1}}>
    <Grid item xs={9}> <p>Edit Restaurent</p></Grid>
    <Grid item xs={3}> <Button sx={{right:"0"}} type="submit">Save</Button></Grid>
</Grid>
                   
                   

                </div>
              

            </div>
               
               <div className='mt-4 ' style={{marginTop:10}}>

                   <TextField
                        sx={{marginY:2}}
                        fullWidth
                        id="restroName"
                        name="restroName"
                        label="Restaurent Name"
                        value={formik.values.restroName}
                        onChange={formik.handleChange}
                        />

                       <TextField
                       sx={{marginY:2}}
                        fullWidth
                        id="discription"
                        name="discription"
                        label="Discription"
                          value={formik.values.discription}
                        onChange={formik.handleChange}
                        />

                <TextField
                sx={{marginY:2}}
                        fullWidth
                        id="city"
                        name="city"
                        label="City"
                   value={formik.values.city}
                        onChange={formik.handleChange}
                        />

                <TextField
                sx={{marginY:2}}
                        fullWidth
                        id="adress"
                        name="adress"
                        label="Adress"
                   value={formik.values.adress}
                        onChange={formik.handleChange}
                        />

                <TextField
                sx={{marginY:2}}
                        fullWidth
                        id="location"
                        name="location"
                        label="Location as Google Map Link"
                   value={formik.values.location}
                        onChange={formik.handleChange}
                        />

               </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
