
import "./tag.css"
import {
    Backdrop,
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
  import { useDispatch, useSelector } from "react-redux";
  import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { uploadToCloud } from "../../utils/UploadToCloud";
import { createFoodAction } from "../../../Redux/restro/food/food.action";
import { createPostAction } from "../../../Redux/post/post.action";
import { searchRestroAction } from "../../../Redux/restro/restro.action";
import MentionResult from "./MentionResult";
  
  function CreatePostModal({ handleClose, open }) {
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
    const restro  = useSelector(store => store.restro);
    
  
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
            image:"",
            tagRestro:"",
            tag:''
            
        },
        onSubmit:(values)=>{
            console.log("formik value --",values);
            dispatch(createPostAction(values));
            handleClose();
    
    setSelectedImage(null); 
    formik.resetForm();
        }
    });


    const [showResults, setShowResults] = useState(true); 

    const handleSelectResult = (selectedId,selectedname) => {
      formik.setFieldValue("tagRestro",selectedId ); // Update the value of the tagRestro input
      formik.setFieldValue("tag",selectedname ); // Update the value of the tagRestro input
      console.log("restroooo id",selectedId,"  ",selectedname);

      setShowResults(false);
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
  
          <div  style={{display:"flex",width:"100%",justifyContent:"flex-end"}}>
           <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
      </div>
  
           
  
            <form
            onSubmit={formik.handleSubmit}
            >
              <div>

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

                <TextField
               
                                            sx={{ marginY: 2 ,display:'none'}}
                                            fullWidth
                                            id="tagRestro"
                                            name="tagRestro"
                                            label="Tag a Restaurant?"
                                            value={formik.values.tagRestro}
                                          
                                          />
                  
                                                          <TextField
                                            sx={{ marginY: 2 }}
                                            fullWidth
                                            id="tag"
                                            name="tag"
                                            label="Tag a Restaurant?"
                                            value={formik.values.tag}
                                            onChange={(e) => {
                                              formik.handleChange(e);
                                              setShowResults(true);
                                              if (e.target.value !== null) {
                                                dispatch(searchRestroAction(e.target.value));
                                              }
                                            }}
                                          />

                                      <div className="container-result">
                                      {showResults && formik.values.tag !== "" && (
                  <MentionResult item={restro.restaurents} onSelectResult={handleSelectResult} />
                )}                                      </div>
  

                <textarea
                   style={{
                      width:"100%",marginTop:3,padding:3,background:"transparent",borderColor:"black"
                   }}
                  placeholder="Write a Caption..."
                  name="caption"
                  id=""
                  type="text"
                  rows="4"
                  value={formik.values.caption}
                  onChange={formik.handleChange}
                ></textarea>
  
               
  
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
  
  export default CreatePostModal;
  