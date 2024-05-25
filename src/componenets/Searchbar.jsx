import React, { useEffect, useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import PlaceIcon from '@mui/icons-material/Place';
import SearchResult from "./SearchResult";
import SearchLocationResult from './SearchLocationResult';
import { useDispatch, useSelector } from "react-redux";
import { searchRestroAction, searchRestroByCityOrAdressAction } from "../Redux/restro/restro.action";
import { useFormik } from "formik";

function Searchbar({ searchinItem, onSearchChange, onSetSearchedValue, searchBarValue }) {
  const dispatch = useDispatch();
  const restro = useSelector(store => store.restro);
  const [placeholder, setPlaceholder] = useState("Search restaurants, foods");
  const [onfocus, setonfocus] = useState(false);
  const [hideResult, setHideResult] = useState(false);

  const handleClickResult = (value)=> {

    setHideResult(value);
    console.log(value)
  }

  const formik = useFormik({
    initialValues: {
      query: ""
    },
    onSubmit: (values) => {
      dispatch(searchRestroAction(values.query));
    },
  });

  const handleChangeSearch = (value) => {
    if (value === "location") {
      setPlaceholder("search by location");
      onSearchChange("location");
    } else {
      setPlaceholder("Search restaurants, foods");
      onSearchChange("search");
    }
  };

  const inputValue = useRef();

  useEffect(() => {
    inputValue.current.value = searchBarValue && searchinItem === "location" ? searchBarValue : formik.values.query;
  }, [searchBarValue,searchinItem]); // Add searchBarValue to dependency array

  return (
    <div>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <form className="search" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            ref={inputValue}
            onChange={(e) => {
              formik.handleChange(e);
              if (e.target.value !== null && searchinItem === "search") {
                dispatch(searchRestroAction(e.target.value));
              } else if (e.target.value !== null && searchinItem === "location") {
                dispatch(searchRestroByCityOrAdressAction(e.target.value));
                console.log("Restaurants gettted are ", restro.locRestros);
              }
            }}
            name="query"
            placeholder={placeholder}
            onFocus={() => { setHideResult(false) }}
            // onBlur={() => { setHideResult(true) }}
          />
          <button type="button" onClick={() => handleChangeSearch("location")}><PlaceIcon sx={{ color: "#F99417", border: "2px black" }} /></button>
          <button type="button" onClick={() => handleChangeSearch("search")}><SearchIcon sx={{ color: "#F99417" }} /></button>
        </form>
        {searchinItem === "search" ? <div className="container-result">
          {formik.values.query !== "" && <SearchResult item={restro.restaurents} />}
        </div> :
         (hideResult?"":<SearchLocationResult  item={restro.locRestros} onSetSearchedValue={onSetSearchedValue} handleClickResult={handleClickResult}/>)
        }
      </div>
    </div>
  );
}

export default Searchbar;
