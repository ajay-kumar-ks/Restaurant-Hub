import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineSharpIcon from '@mui/icons-material/ChatBubbleOutlineSharp';

import { useDispatch, useSelector } from 'react-redux';
import { createCommentAction, likePostAction } from '../../Redux/post/post.action';
import { isLikedByReqUser } from '../utils/isLikedByReqUser';
import { getRestroByRestroId } from '../../Redux/restro/restro.action';
import { useNavigate } from 'react-router-dom';
import PostDetailed from './PostDetailed';
import LoginAlertModal from '../LoginAlertModal';


function PostCard({item}) {

  console.log("items   ---",item);
  const dispatch=useDispatch();

  const [showComments,setShowComments]=useState(false);

  const auth=useSelector(store=>store.auth);
  
  const [open7, setOpen7] = React.useState(false);
  const handleOpenloginalert = ()=> setOpen7(true);
  const handleClose7 =()=> setOpen7(false);
  // const  restro  = useSelector((store) => store.restro); 
  // useEffect(() => {
  //   if (item.tagRestro) {
  //     dispatch(getRestroByRestroId(item.tagRestro));
  //     console.log("id------------------",item.tagRestro)
  //   }
  // }, [ dispatch]);


const handleShowComment=()=>setShowComments(!showComments);

// const handleCreateComment=(content)=>{
//   const reqData={
//     postId:item.id,
//     data:{
//       content
//     }
//   }
//   dispatch(createCommentAction(reqData))
// }

const [likedByUser, setLikedByUser] = useState(isLikedByReqUser(auth.user?.id, item));

const handleLikePost = () => {
  dispatch(likePostAction(item.id));
  // Instead of relying on the current state, directly toggle the like status in the local component state
  setLikedByUser(!likedByUser);
}

//go to restaurent

const navigate = useNavigate();
const [shouldNavigate, setShouldNavigate] = React.useState(false);

useEffect(() => {
  if (shouldNavigate && item.tagRestro) {
    navigate(`/restaurent/${item.tagRestro}`);
  }
}, [shouldNavigate, navigate]);


const handleClick = () => {
  setShouldNavigate(true);
};



//post detailed view

const [open2, setOpen2] = React.useState(false);
const handleViewPostDetailed = ()=> setOpen2(true);
const handleClose2 =()=> setOpen2(false);
  return (
    <Card className='' sx={{height:'370px'}}>
      
      <CardHeader
      sx={{height:'40px'}}
        avatar={
          <Avatar sx={{ bgcolor: red[500] ,width:'25px' ,height:'25px',fontSize:'.9rem'}} aria-label="recipe">
            {item.user?.firstname[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{width:'25px' ,height:'25px',marginBottom:'5px'}}>
            <MoreVertIcon />
          </IconButton>
        }
        title={item.user?.firstname}
       
      />

      <CardMedia
        sx={{height:'200px'}}
        component="img"
        height="194"
        image={item.image}
        alt="Paella dish"
      />

      
<CardActions className='flex justify-between' disableSpacing>

<div>
              <IconButton onClick={ ()=>{
                if(auth.user){
                  handleLikePost()
                }else{

                  handleOpenloginalert()
                }
             
              }
              }
                >
  {item && (isLikedByReqUser(auth?.user?.id, item, likedByUser) ? <FavoriteIcon sx={{color:'red'}} /> : <FavoriteBorderIcon sx={{ color: 'rgb(68, 67, 67)'}}/>)}
</IconButton>


<IconButton onClick={handleViewPostDetailed}>
 
    <ChatBubbleOutlineSharpIcon sx={{ color: 'rgb(68, 67, 67)'}} />

</IconButton>

       {item.tag && item.tagRestro ? 
      <Typography variant="body2" color="text.secondary" sx={{color:'#333399','&:hover': {
        color:'#000066',fontSize:'.88rem',},cursor:'pointer'}}
        onClick={handleClick}
        >
         @{item.tag }
        </Typography> : ""}

</div>



</CardActions>

      <CardContent>
      

        <Typography variant="body2" color="text.secondary">
       {item.caption}
        </Typography>
      </CardContent>


  {/* {showComments && <section>

                <div className='flex items-center space-x-5 mx-3 my-5'>

                  <Avatar sx={{}}/>

                  <input onKeyPress={(e)=>{
                    if(e.key==="Enter" && e.target.value!==""){
                      handleCreateComment(e.target.value);
                      console.log("enter pressed...",e.target.value);
                     e.target.value="";

                    }
                  }} className='w-full outline-non bg-transparent border border-[#3b4054] rounded-full px-5 py-2' placeholder='Write your comment...' type="text" />

                </div>

                <Divider/>

                <div className='mx-3 space-y-2 my-5 text-xs'>

                
                    
                { item.comments?.map((comment)=>   <div className='flex items-center space-x-5'>

                      <Avatar sx={{height:"2rem",width:"2rem",fontSize:".8rem"}}>
                           {comment.user.firstname[0]}
                      </Avatar>

                      <p>{comment.content}</p>

                    </div>)}
                

                </div>

        </section>} */}

<section>
        <PostDetailed open={open2} handleClose={handleClose2} item={item}/>
      </section>

      <section>
        <LoginAlertModal open={open7} handleClose={handleClose7}/>
      </section>

    </Card>

  )
}

export default PostCard
