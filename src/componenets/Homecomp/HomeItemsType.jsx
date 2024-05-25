import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab } from '@mui/material';
import React from 'react';
import HomeContenet from './HomeContenet';
import HomePosts from './HomePosts';
import HomeRestros from './HomeRestros';

function HomeItemsType() {

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
              <Tab label="Best Foods of this Week" value="1" />
              <Tab label="Trending Posts" value="2" />
              <Tab label="Trending Restaurents" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <HomeContenet />
          </TabPanel>
          <TabPanel value="2">
             <HomePosts/>
          </TabPanel>
          <TabPanel value="3">
               <HomeRestros/>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}

export default HomeItemsType;
