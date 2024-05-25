import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { uploadToCloud } from "../../utils/UploadToCloud";
import { createFoodAction } from "../../../Redux/restro/food/food.action";
import Autocomplete from "@mui/material/Autocomplete";

function AddFood({ handleClose, open, items }) {
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
    overflowY: 'scroll',
    height: '600px'
  };

  const [selectedImage, setSelectedImage] = useState();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSelectImage = async (event) => {
    setLoading(true);
    const imageUrl = await uploadToCloud(event.target.files[0], "image");
    setSelectedImage(imageUrl);
    setLoading(false);
    formik.setFieldValue("image", imageUrl);
  };

  const formik = useFormik({
    initialValues: {
      caption: "",
      image: "",
      name: "",
      price: "",
      oldPrice: "",
      category: "veg",
      foodType: "", 
    },
    onSubmit: (values) => {
      console.log("formik value --", values);
      dispatch(createFoodAction(values));
      handleClose();

      setSelectedImage(null);
      formik.resetForm();
    },
  });

  const handleFoodTypeBlur = (event) => {
    formik.setFieldValue("foodType", event.target.value);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div>
              <TextField
                sx={{ marginY: 2 }}
                fullWidth
                id="name"
                name="name"
                label="Food Name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />

              <Grid container spacing={9} sx={{ display: "flex", paddingX: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    sx={{ marginY: 2 }}
                    fullWidth
                    id="price"
                    name="price"
                    label="Price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    sx={{ marginY: 2 }}
                    fullWidth
                    id="oldPrice"
                    name="oldPrice"
                    label="Old Price"
                    value={formik.values.oldPrice}
                    onChange={formik.handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3} sx={{ display: "flex", paddingX: 1 }}>
                <Grid item xs={4}>
                  <Select
                    sx={{ marginTop: "15px" }}
                    id="category-select"
                    value={formik.values.category}
                    onChange={(event) => formik.setFieldValue("category", event.target.value)}
                    fullWidth
                  >
                    <MenuItem value="veg">Veg</MenuItem>
                    <MenuItem value="nonVeg">Non-Veg</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={7}>
                  <Autocomplete
                    options={items.foodType?.map((item) => item.name)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Food Type"
                        id="foodType-select"
                        fullWidth
                        autoComplete="true"
                        onBlur={handleFoodTypeBlur}
                      />
                    )}
                    value={formik.values.foodType}
                    onChange={(event, newValue) =>
                      formik.setFieldValue("foodType", newValue)
                    }
                  />
                </Grid>
              </Grid>

              <textarea
                style={{
                  width: "100%",
                  marginTop: 3,
                  padding: 3,
                  background: "transparent",
                  borderColor: "black",
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

              <div style={{ display: "flex", width: "100%", justifyContent: "flex-end" }}>
                <Button variant="contained" type="submit" sx={{ borderRadius: "1.5rem" }}>
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

export default AddFood;
