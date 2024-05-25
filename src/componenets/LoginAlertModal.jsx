import * as React from "react";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { Grid, IconButton, Modal, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minHeight: 100,
  maxHeight: 300,
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  outline: "none",
  overFlowY: "scroll",
  borderRadius: 3,
  scrollbarWidth: "thin", // Firefox
  scrollbarColor: "#fff #FFF", // Webkit (Chrome, Safari)
  msOverflowStyle: "none",
  display: "grid",
};

export default function LoginAlertModal({ open, handleClose }) {
  const navigate = useNavigate();

  function handleNavigate(){
    navigate('/login'); 
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{width:'100%',display:'flex',justifyContent:'end'}}>
             <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
          </Box>

          <Box sx={{display:'grid',justifyContent:'center'}}>
            <Typography variant="h5">please login</Typography>
            <Typography variant="p" sx={{color:'blue',cursor:'pointer',marginTop:3}} onClick={handleNavigate}>Click Here To login</Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
