import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';
import HomeLocationFood from './HomeLocationFood';
import HomeLocationRestro from './HomeLocationRestro';

function HomeLocationComponent({item}) {

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  return (
    <div>
      <Box sx={{ width: '100%', typography: 'body1', paddingX: 20 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ paddingX: 4 }}>
              <Tab label="Best Food in This location" value="1" />
              <Tab label="Best Restaurant in This location" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <HomeLocationFood item={item}/>
          </TabPanel>
          <TabPanel value="2">
               <HomeLocationRestro item={item}/>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default HomeLocationComponent;
