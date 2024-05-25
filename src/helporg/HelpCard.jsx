import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

function HelpCard({ item, index }) { 
  return (
    <div>
      <Card sx={{ minWidth: 275, background: item.background }}>
        <CardContent>
          <CardMedia
            component="img"
            sx={{ width: index===5 || index===2 || index===7 || index===8?"71%":"100%",marginLeft: index===5 || index===2 || index===7 || index===8?6:0, height: '200px', display: 'flex', justifyContent: 'center' }}
            image={item.img}
            alt="Paella dish"
          />
          <Typography variant="h6" component="div">
            {item.title}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {item.more}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default HelpCard;
