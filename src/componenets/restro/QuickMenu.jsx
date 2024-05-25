import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Chip,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FoodDetailed from "../posts/FoodDetailed";
import StarIcon from "@mui/icons-material/Star";
import { isAvailability } from "../utils/isAvaliablity";

// import { isAvailability } from "../utils/isAvailability"; // Fix typo in import statement

function QuickMenu({ handleClose, open, items, foodTypes }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: ".6rem",
    outline: "none",
    height: "100%",
  };

  const mappedItems = Array.isArray(items) ? items : [];

  const [open2, setOpen2] = React.useState(false);
  const [itemToDetailedView, setItemToDetailedView] = React.useState(null);

  const handleOpenFoodDetaildView = (row) => {
    setOpen2(true);
    setItemToDetailedView(row);
  };

  const handleClose2 = () => setOpen2(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  // Define the calculateAverageRating function
  const calculateAverageRating = (item) => {
    if (item.rating && item.rating.length > 0) {
      const totalRating = item.rating.reduce((acc, rating) => acc + rating.value, 0);
      const averageRating = totalRating / item.rating.length;
      return averageRating.toFixed(1); // Round to one decimal place
    }
    return 0; // Default rating if no ratings available
  };

  const filteredItems = mappedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortCriteria === "priceHigh") {
      return b.price - a.price;
    } else if (sortCriteria === "priceLow") {
      return a.price - b.price;
    } else if (sortCriteria === "rating") {
      // Sort by rating value
      const ratingA = calculateAverageRating(a);
      const ratingB = calculateAverageRating(b);
      return ratingB - ratingA;
    }
    return 0;
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
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>

          <Box sx={{ textAlign: "center", display: "flex" }}>
            <TextField
              id="standard-basic"
              label="Find Food"
              variant="standard"
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <FormControl
              variant="standard"
              sx={{ marginLeft: 2, minWidth: 120 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                Sort
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={sortCriteria}
                onChange={handleSortChange}
                label="Sort"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="priceHigh">Price High</MenuItem>
                <MenuItem value="priceLow">Price Low</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <div style={{ overflowX: "scroll", height: "calc(100% - 120px)" }}>
            <Grid container spacing={1} sx={{ paddingBottom: 10 }}>
              {foodTypes?.map((foodTypeItem) => (
                <Grid
                  item
                  xs={6}
                  key={foodTypeItem.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      sx={{ marginTop: 5, marginBottom: 2, color: "red" }}
                    >
                      {foodTypeItem.name}
                    </Typography>

                    <TableContainer component={Paper}>
                      <Table
                        sx={{ minWidth: 200 }}
                        size="small"
                        aria-label="a dense table"
                      >
                        <TableBody>
                          {sortedItems
                            .filter(
                              (row) => row.foodType === foodTypeItem.name
                            )
                            .map((filteredRow) => (
                              <TableRow
                                key={filteredRow.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  cursor: "pointer",
                                  ":hover": { background: "#EEEEEE" },
                                }}
                                onClick={() =>
                                  handleOpenFoodDetaildView(filteredRow)
                                }
                              >
                                <TableCell component="th" scope="row">
                                  <div style={{ display: "flex" }}>
                                    {filteredRow.name}
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        background: "green",
                                        height: 20,
                                        width: 39,
                                        marginLeft: 10,
                                        color: "#ffff",
                                        borderRadius: 6,
                                      }}
                                    >
                                      <p style={{ fontSize: 13 }}>
                                        {parseFloat(
                                          calculateAverageRating(filteredRow)
                                        )}
                                      </p>
                                      <StarIcon sx={{ height: 15, width: 15 }} />
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell align="right">
                                  ₹{filteredRow.price}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton>
                                    {isAvailability(filteredRow) ? (
                                      <Tooltip title="Available">
                                        <CheckCircleOutlineIcon
                                          sx={{ color: "green" }}
                                        />
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Not Available">
                                        <CancelIcon sx={{ color: "red" }} />
                                      </Tooltip>
                                    )}
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </Grid>
              ))}

              {/* Display "Others" table */}
              <Grid
                item
                xs={6}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{ marginTop: 5, marginBottom: 2, color: "red" }}
                  >
                    Others
                  </Typography>

                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 200 }}
                      size="small"
                      aria-label="a dense table"
                    >
                      <TableBody>
                        {sortedItems
                          .filter(
                            (row) =>
                              !foodTypes.some(
                                (type) => type.name === row.foodType
                              )
                          )
                          .map((otherRow) => (
                            <TableRow
                              key={otherRow.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                                cursor: "pointer",
                                ":hover": { background: "#EEEEEE" },
                              }}
                              onClick={() =>
                                handleOpenFoodDetaildView(otherRow)
                              }
                            >
                              <TableCell component="th" scope="row">
                                <div style={{ display: "flex" }}>
                                  {otherRow.name}
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      background: "green",
                                      height: 20,
                                      width: 39,
                                      marginLeft: 10,
                                      color: "#ffff",
                                      borderRadius: 6,
                                    }}
                                  >
                                    <p style={{ fontSize: 13 }}>
                                      {parseFloat(
                                        calculateAverageRating(otherRow)
                                      )}
                                    </p>
                                    <StarIcon sx={{ height: 15, width: 15 }} />
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell align="right">
                                ₹{otherRow.price}
                              </TableCell>
                              <TableCell align="right">
                                <IconButton>
                                  {isAvailability(otherRow) ? (
                                    <Tooltip title="Available">
                                      <CheckCircleOutlineIcon
                                        sx={{ color: "green" }}
                                      />
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title="Not Available">
                                      <CancelIcon sx={{ color: "red" }} />
                                    </Tooltip>
                                  )}
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
            </Grid>
          </div>

          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>

      <section>
        {itemToDetailedView ? (
          <FoodDetailed
            open={open2}
            handleClose={handleClose2}
            item={itemToDetailedView}
          />
        ) : (
          ""
        )}
      </section>
    </div>
  );
}

export default QuickMenu;
