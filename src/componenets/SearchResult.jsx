import React, { useEffect, useState } from 'react';
import "./searchbar.css"
import { useNavigate } from 'react-router-dom';
import HomeLocationComponent from './HomeLocationcomp/HomeLocationComponent';

function SearchResult({ item }) {
  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  useEffect(() => {
    if (shouldNavigate && item && item.length > 0) {
      navigate(`/restaurent/${item[0].id}`);
    }
  }, [shouldNavigate, item, navigate]);

  const handleClick = () => {
    setShouldNavigate(true);
  };

  return (
    <div style={{width:'45%',marginTop:'4rem',position:'absolute',zIndex:'200',background:'white',boxShadow:'0px 0px 3px #ddd',borderRadius:'10px',maxHeight:'300px',overflowY:'scroll',padding:'15px',marginLeft:'20%'}}>
      {item && item.length > 0 ? (
        item.map((result, id) => (
          <div key={id} onClick={handleClick} className='results'><p>{result.restroName}</p><small>{result.city}</small></div>
        ))
      ) : (
        <div>No results found</div>
      )}

   
    </div>
  );
}

export default SearchResult;
