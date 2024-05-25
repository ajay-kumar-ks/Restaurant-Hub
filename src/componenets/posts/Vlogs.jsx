import React, { useEffect } from 'react'
import { getAllVlogAction } from '../../Redux/vlogs/vlog.action';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import VlogCardForVlogSec from './VlogCardForVlogSec';
import SearchBarVlog from './SearchBarVlog';




function Vlogs() {


  const dispatch=useDispatch();
  const vlog = useSelector(store=>store.vlog);
  
  useEffect(() => {
  
      dispatch(getAllVlogAction());
  }, []);
  
  console.log("home vlog",vlog.vlogs)

  return (
    <div style={{marginTop:'100px'}}>
      <Box sx={{display:'flex',justifyContent:'center'}}>
      <SearchBarVlog/>
      </Box>
        <Box sx={{ width: '100%', typography: 'body1', paddingX: 20 ,marginTop:'33px'}}>
          <Grid container  spacing={2}>
            {vlog.vlogs?.map((item) =>
              <Grid item xs="3" key={item?.id}>
              
                <VlogCardForVlogSec item={item}/>
               
              </Grid>)}

            </Grid>
          </Box>
    </div>
  )
}

export default Vlogs
