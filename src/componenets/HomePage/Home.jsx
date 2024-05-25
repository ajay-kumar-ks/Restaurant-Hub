import React, { useState } from 'react';
import Searchbar from '../Searchbar';
import HomeItemsType from '../Homecomp/HomeItemsType';
import CustomAlert from '../CustomAlert';
import HomeLocationComponent from '../HomeLocationcomp/HomeLocationComponent';

function Home() {
  const [searchinItem, setSearchinItem] = useState("search");
  const [searchedLoc, setSearchedLoc] = useState(null);
  const msg = "an error found";

  const handleSearchChange = (value) => {
    setSearchinItem(value);
  };

  const handleSearchedValue = (value) =>{
    setSearchedLoc(value)
  }
  console.log("location in home  ",searchedLoc);

  return (
    <div>
      {/* <CustomAlert item={item} mesg={msg} /> */}
      <Searchbar searchinItem={searchinItem} onSearchChange={handleSearchChange} onSetSearchedValue={handleSearchedValue} searchBarValue={searchedLoc}/>

      {searchinItem === "location" ? <HomeLocationComponent item={searchedLoc}/> : <HomeItemsType />}
    </div>
  );
}

export default Home;
