import React, { useState, useEffect } from 'react';
import MuiAlert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import './animation.css'; // Import the CSS file for styling

export default function CustomAlert({ item, mesg }) {
  const [isVisible, setIsVisible] = useState(item);

  useEffect(() => {
    setIsVisible(item);
    if (item) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000); // 5000 milliseconds = 5 seconds
      return () => clearTimeout(timer);
    }
  }, [item]);

  return (
    isVisible && (
      <MuiAlert
        id="alert"
        icon={<CheckIcon fontSize="inherit" />}
        severity="success"
        className={isVisible ? 'show' : 'hide'} // Dynamically apply CSS class based on visibility
        sx={{ top: 0, position: 'absolute', width: '100%' }}
      >
        {mesg}
      </MuiAlert>
    )
  );
}
