// import React, { useEffect, useState } from 'react';
import "./tag.css"
// import { useNavigate } from 'react-router-dom';

function MentionResult({ item, onSelectResult }) {
//   const navigate = useNavigate();
//   const [shouldNavigate, setShouldNavigate] = useState(false);

//   useEffect(() => {
//     if (shouldNavigate && item && item.length > 0) {
//       // Add your navigation logic here if needed
//     }
//   }, [shouldNavigate, item, navigate]);

  const handleClick = (result) => {
    // setShouldNavigate(true);
    onSelectResult(result.id,result.restroName); // Call the callback function with the selected result id
  };

  return (
    <div className='result-list'>
      {item && item.length > 0 ? (
        item.map((result, id) => (
          <div key={id} onClick={() => handleClick(result)} className='results'>
            <p>{result.restroName}</p>
            <small>{result.city}</small>
          </div>
        ))
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
}

export default MentionResult;
