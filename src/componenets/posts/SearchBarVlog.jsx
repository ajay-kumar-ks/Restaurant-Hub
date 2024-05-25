import { Container, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBarVlog() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ marginLeft:"29%"}}>
      <TextField
        id="search"
        type="search"
        label="Search Vlogs"
        value={searchTerm}
        onChange={handleChange}
        sx={{ width: 600 ,borderRadius:'50px'}}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Container>
  );
}
