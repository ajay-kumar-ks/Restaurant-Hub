import {
    Backdrop,
    Box,
    CircularProgress,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React from "react";

  import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { avalabilityRestroFoodAction } from "../../../Redux/restro/food/food.action";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { isAvailability } from "../../utils/isAvaliablity";









  
  function SetFoodAvailable({ handleClose, open ,items}) {
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



    const dispatch=useDispatch();

    const handleAvailablePost=(row)=>{
      dispatch(avalabilityRestroFoodAction(row.id));
    }
  
    const mappedItems = Array.isArray(items) ? items : [];
  
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
  
           
  
            <div
            style={{height:"400px",overflowY:"scroll"}}
            // onSubmit={formik.handleSubmit}
            >
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:"bold"}}>Food Name</TableCell>
            <TableCell sx={{fontWeight:"bold"}} align="right">Availability</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {mappedItems.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              
              <TableCell align="right"><IconButton onClick={() => handleAvailablePost(row)}>{isAvailability(row) ? <CheckCircleOutlineIcon sx={{color:"green"}}/> :<CheckCircleOutlineIcon/> }</IconButton></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
  
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
         
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </Box>
        </Modal>
      </div>
    );
  }
  
  export default SetFoodAvailable;
  