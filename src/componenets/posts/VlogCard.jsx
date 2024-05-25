import { Card, CardActions, CardContent, Grid, IconButton, ImageListItem, ImageListItemBar, Typography } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useNavigate } from 'react-router-dom';

function VlogCard(item) {
    const videoRef = useRef(null);
    const [showControls, setShowControls] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        if (!isPlaying) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoEnded = () => {
        setShowControls(false);
        setIsPlaying(false);
    };

    const handleVideoPlay = () => {
        setShowControls(true);
        setIsPlaying(true);
    };

    const handleVideoPause = () => {
        setShowControls(true);
        setIsPlaying(false);
    };

    const [duration, setDuration] = useState(0);

  const onDurationChange = (event) => {
    setDuration(event.target.duration);
  };

  const onLoad = (event) => {
    setDuration(event.target.duration);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };


  const navigate = useNavigate();
  const [shouldNavigate, setShouldNavigate] = React.useState(false);

  useEffect(() => {
    if (shouldNavigate  && item.item.id) {
      navigate(`/vlog/${item.item.id}`);
    }
  }, [shouldNavigate ,item.item.id, navigate]);

  const handleClick = () => {
    setShouldNavigate(true);
  };

    return (
        <div>
            <div>
                <Card>
                    <ImageListItem>
                        <video
                            ref={videoRef}
                            onClick={handlePlayClick}
                            onEnded={handleVideoEnded}
                            onPlay={handleVideoPlay}
                            onPause={handleVideoPause}
                            controls={showControls}
                            onLoadedMetadata={onDurationChange}
                            onLoad={onLoad}
                            // width="320" height="240"
                        >
                            <source src={item.item?.video} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {!isPlaying && (
                            <ImageListItemBar
                                sx={{
                                    background:
                                        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, " +
                                        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                                }}
                                title=""
                                position="bottom"
                                actionIcon={
                                    <div>
                                            <IconButton 
                                                sx={{ 
                                                    color: "white", 
                                                    position: "absolute", 
                                                    top: "-250%", 
                                                    left: "50%", 
                                                    transform: "translate(-50%, -50%)",
                                                    height:'80px !important',
                                                    width:'80px !important'
                                                }} 
                                                onClick={handlePlayClick}
                                            >
                                                <PlayCircleOutlineIcon />
                                            </IconButton>
                                            <div style={{color:'white',marginRight:'5px',background:'black',width:'2.5vw',display:'flex',justifyContent:'center'}}>
                                            {formatTime(duration)}
                                            </div>
                                    </div>
                                }
                                actionPosition="right"
                            />
                        )}
                        <ImageListItemBar
                            sx={{
                                background: "transparent",
                            }}
                            title=""
                            position="top"
                        />
                    </ImageListItem>
                    <CardContent onClick={handleClick}>
                        <Grid container spacing={2}>
                            <Grid item xs={9}>
                                <Typography sx={{ mb: 1 }} color="text.secondary">
                                    {item.item.user?.firstname}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Typography
                            variant="body2"
                            sx={{ marginTop: "8px", fontSize: ".8rem" }}
                        >
                            {item.item?.title}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{ display: "flex" }}>
                        <Grid container spacing={2}></Grid>
                    </CardActions>
                </Card>
            </div>
        </div>
    )
}

export default VlogCard;
