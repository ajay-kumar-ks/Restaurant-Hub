import {
    Avatar,
    Backdrop,
    Badge,
    Box,
    Button,
    CircularProgress,
    Grid,
    IconButton,
    Modal,
    TextField,
  } from "@mui/material";
  import React, { useState } from "react";
  import ImageIcon from "@mui/icons-material/Image";
  import { useDispatch } from "react-redux";
  import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { uploadToCloud } from "../../utils/UploadToCloud";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { updateProfileAction } from "../../../Redux/Auth/auth.action";
import { deepOrange } from "@mui/material/colors";
  
  function EditProfileModal({ handleClose, open ,item}) {
    const style = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: ".6rem",
      outline: "none",
    };

    console.log("items------------------",item)
  
    const [selectedImage, setSelectedImage] = useState();
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
  
      const handleSelectImage= async(event)=>{
           setLoading(true);
           const imageUrl = await uploadToCloud(event.target.files[0],"image")
           setSelectedImage(imageUrl);
           setLoading(false);
           formik.setFieldValue("image", imageUrl);
      };
  

      
    const formik = useFormik({
        initialValues: {
            firstname: item?.firstname,
            image: item?.image,
            email: item?.email,
            location: item?.location
        },
        onSubmit:(values)=>{
            console.log("formik value --",values);
            dispatch(updateProfileAction(values));
            handleClose();
    
    setSelectedImage(null); 
    formik.resetForm();
        }
    });
  
    console.log('Formik Values:', formik.values);

    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
  
          <div  style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
           <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
      </div>
  
           
  
            <form
            onSubmit={formik.handleSubmit}
            >
              <div>

           
                  <div style={{display:'flex',justifyContent:'center'}}>

                    <Badge badgeContent={  <div>
                    <input
                      type="file"
                      accept="image/*"
                       onChange={handleSelectImage}
                      style={{ display: "none" }}
                      id="image-input"
                    />
                    <label htmlFor="image-input">
                      <IconButton color="primary" component="span">
                        <AddPhotoAlternateIcon />
                      </IconButton>
                    </label>
                     <span style={{marginRight:'50px'}}></span>
                  </div>} 
                  color="" 
  anchorOrigin={{
    vertical: 'top',
    horizontal: 'right',
  }}
>
{selectedImage ? (
  <Avatar sx={{ width: '10rem', height: '10rem', fontSize: '3rem' }} src={selectedImage} />
) : item?.image ? (
  <Avatar sx={{ width: '10rem', height: '10rem', fontSize: '3rem' }} src={item?.image} />
) : (
  <Avatar sx={{ bgcolor: deepOrange[500], width: '10rem', height: '10rem', fontSize: '3rem' }}>
    {item?.firstname[0].toUpperCase()}
  </Avatar>
)}

                   </Badge>
                    
                  </div>
                
                  
              <TextField
                          sx={{marginY:2}}
                          fullWidth
                          id="firstname"
                          name="firstname"
                          label="Name"
                          value={formik.values.firstname}
                          onChange={formik.handleChange}
                          />
              <TextField
                          sx={{marginY:2}}
                          fullWidth
                          id="email"
                          name="email"
                          label="Email"
                          value={formik.values.email}
                          onChange={formik.handleChange}
                          />
             <TextField
                          sx={{marginY:2}}
                          fullWidth
                          id="location"
                          name="location"
                          label="Place"
                          value={formik.values.location}
                          onChange={formik.handleChange}
                          />
                 

                          
  
               
  
             
  
                <div style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{ borderRadius: "1.5rem" }}
                  >
                    Post
                  </Button>
                </div>
              </div>
            </form>
  
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={isLoading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Modal>
      </div>
    );
  }
  
  export default EditProfileModal;
  