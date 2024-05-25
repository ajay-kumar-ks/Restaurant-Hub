import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Grid,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Rating,
  Tooltip,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import { useDispatch} from "react-redux";
// import { likeRestroFoodAction } from "../../Redux/restro/food/food.action";
import CancelIcon from '@mui/icons-material/Cancel';
import FoodDetailed from "./FoodDetailed";

function FoodCard({ item ,widths}) {

  const { width2, width3, width4, width5, width6 } = widths;

  const [open7, setOpen7] = React.useState(false);
  const handleOpenFoodDetaildView = ()=> setOpen7(true);
  const handleClose7 =()=> setOpen7(false);

  

  // const dispatch = useDispatch();
  // const auth = useSelector((store) => store.auth);

  if (!item) {
    return null; // or return a placeholder, throw an error, or handle the case accordingly
  }

  // Check if required properties exist in the item object
  if (!item.name || !item.image || !item.price || !item.caption) {
    return null; // or handle the missing properties case accordingly
  }

  // const handleLikePost = () => {
  //   dispatch(likeRestroFoodAction(item.id));
  // };

  const calculateAverageRating = () => {
    if (item.rating && item.rating.length > 0) {
      const totalRating = item.rating.reduce(
        (acc, rating) => acc + rating.value,
        0
      );
      const averageRating = totalRating / item.rating.length;
      return averageRating.toFixed(1); // Round to one decimal place
    }
    return 0; // Default rating if no ratings available
  };

  return (
    <>
    <div onClick={handleOpenFoodDetaildView}>
      <Card sx={{width:widths}}>
        <ImageListItem >
          <img src={item.image} alt="" loading="lazy" sx={{overflow:'hidden'}} style={{height:200}}/>
          <ImageListItemBar
            sx={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
            }}
            title=""
            position="bottom"
            actionIcon={
              <div>
                <IconButton sx={{ color: "white" }}></IconButton>
              </div>
            }
            actionPosition="right"
          />

          <ImageListItemBar
            sx={{
              background: "transparent",
            }}
            title=""
            position="top"
            actionIcon={
              item.availability ? (
                <Tooltip title="Available">
                  <CheckCircleOutlineIcon
                    sx={{
                      color: "white",
                      background: "green",
                      borderRadius: "50%",
                      height: "20px",
                      width: "20px",
                      marginLeft: "4px",
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip title="Not Available">
                  <CancelIcon
                    sx={{
                      color: "white",
                      background: "red",
                      borderRadius: "50%",
                      height: "20px",
                      width: "20px",
                      marginLeft: "4px",
                    }}
                  />
                </Tooltip>
              )
            }
            actionPosition="left"
          />
        </ImageListItem>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <Typography sx={{ mb: 1 }} color="gray" >
                {item.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={8} className="d-flex">
              <Rating
                value={parseFloat(calculateAverageRating())}
                precision={0.5}
                size="medium"
                readOnly
              />
            </Grid>
            <Grid item xs={3} sx={{ display: "flex", mt: "3px" }}>
              <p>
                {" "}
                <del>₹{item.oldPrice?item.oldPrice:""}</del>{" "}
              </p>

              <p style={{ marginLeft: "10px", color: "green" }}>
                {" "}
                {item.price}{" "}
              </p>
            </Grid>{" "}
          </Grid>

          <Typography
            variant="body2"
            sx={{ marginTop: "8px", fontSize: ".8rem" }}
          >
            {item.caption}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
          Average Rating: {calculateAverageRating()}
        </Typography> */}
        </CardContent>
        <CardActions disableSpacing sx={{ display: "flex" }}>
          <Grid container spacing={2}></Grid>
        </CardActions>
      </Card>
     
    </div>
    <section>
        <FoodDetailed open={open7} handleClose={handleClose7} item={item}/>
      </section>
   </>
  );
}

export default FoodCard;
