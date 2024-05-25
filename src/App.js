import Navbar from './componenets/Navbar';


import Homepages from './componenets/HomePage/Homepages';

import React from 'react';
// import Navbar from './components/Navbar';
// import Homepages from './components/HomePage/Homepages';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from './componenets/Footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Homepages />

        <Box sx={{width:'100%',height:'100px'}}></Box>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
