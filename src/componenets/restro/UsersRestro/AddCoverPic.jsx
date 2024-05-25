import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Modal,

} from "@mui/material";
// import { useFormik } from 'formik';
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { useDispatch } from "react-redux";
// import { createCommentAction, createPostAction } from '../../Redux/post/post.action';
import CloseIcon from "@mui/icons-material/Close";
import { uploadToCloud } from "../../utils/UploadToCloud";
import { Formik, useFormik } from "formik";
import { createRestroAction } from "../../../Redux/restro/restro.action";
import { createRestroPostAction } from "../../../Redux/restro/post/restropost.action";

function AddCoverPic({ handleClose, open }) {
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
      initialValues:{
          caption:"",
          image:""
          
      },
      onSubmit:(values)=>{
          console.log("formik value ----",values);
          dispatch(createRestroPostAction(values));
          handleClose();
      }
  });

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
          

              <textarea
                 style={{
                    width:"100%",marginTop:3,padding:3,background:"transparent",borderColor:"black"
                 }}
                placeholder="Write description..."
                name="caption"
                id=""
                type="text"
                rows="4"
                value={formik.values.caption}
                onChange={formik.handleChange}
              ></textarea>

              <div className="flex space-x-5 items-center mt-5">
                <div>
                  <input
                    type="file"
                    accept="image/*"
                     onChange={handleSelectImage}
                    style={{ display: "none" }}
                    id="image-input"
                  />
                  <label htmlFor="image-input">
                    <IconButton color="primary" component="span">
                      <ImageIcon />
                    </IconButton>
                  </label>

                  <span>Image</span>
                </div>
              </div>

              {selectedImage && (
                <div>
                  <img className="h-[10rem]" src={selectedImage} alt="" />
                </div>
              )}

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

export default AddCoverPic;
