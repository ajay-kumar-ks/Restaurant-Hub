import axios from "axios";
import { API_BASE_URL, api } from "../../config/api"
import { CREATE_REEL_COMMENT_FAILURE, CREATE_REEL_COMMENT_REQUEST, CREATE_VLOG_FAILURE, CREATE_VLOG_REQUEST, CREATE_VLOG_SUCCESS, GET_ALL_VLOG_FAILURE, GET_ALL_VLOG_REQUEST, GET_ALL_VLOG_SUCCESS, GET_USERS_VLOG_FAILURE, GET_USERS_VLOG_REQUEST, GET_USERS_VLOG_SUCCESS, GET_VLOG_BYID_FAILURE, GET_VLOG_BYID_REQUEST, GET_VLOG_BYID_SUCCESS, INCREMENET_VLOG_VIEW_FAILURE, INCREMENET_VLOG_VIEW_REQUEST, INCREMENET_VLOG_VIEW_SUCCESS, LIKE_VLOG_FAILURE, LIKE_VLOG_REQUEST, LIKE_VLOG_SUCCESS } from "./vlog.actionType";
import { CREATE_Restro_SUCCESS } from "../restro/retro.actionType";

export const createVlogAction=(postData)=>async(dispatch)=>{
 dispatch({type:CREATE_VLOG_REQUEST})
    try {
        const{data}=await api.post('/api/vlogs',postData);
        dispatch({type:CREATE_VLOG_SUCCESS,payload:data});
        console.log("created vlog ",data);
    } catch (error) {

        console.log("error ",error)
        dispatch({type:CREATE_VLOG_FAILURE,payload:error});
        
    }
};


export const getAllVlogAction=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_VLOG_REQUEST})
       try {
           const{data}=await api.get('/api/vlogs');
           dispatch({type:GET_ALL_VLOG_SUCCESS,payload:data});
           console.log("get all vlog ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_ALL_VLOG_FAILURE,payload:error});
           
       }
   };


   export const getUsersVlogAction=(userId)=>async(dispatch)=>{
    dispatch({type:GET_USERS_VLOG_REQUEST})
       try {
           const{data}=await api.get(`/api/vlogs/user/${userId}`);
           dispatch({type:GET_USERS_VLOG_SUCCESS,payload:data});
           console.log("get user vlog ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_USERS_VLOG_FAILURE,payload:error});
           
       }
   };

   export const getVlogByIdAction=(Id)=>async(dispatch)=>{
    dispatch({type:GET_VLOG_BYID_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/reels/${Id}`);
           dispatch({type:GET_VLOG_BYID_SUCCESS,payload:data});
           console.log("get vlog -----------------------------------",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_VLOG_BYID_FAILURE,payload:error});
           
       }
   };


   export const likeVlogAction=(reelId)=>async(dispatch)=>{
    dispatch({type:LIKE_VLOG_REQUEST})
       try {
           const{data}=await api.put(`/api/reels/like/${reelId}`);
           dispatch({type:LIKE_VLOG_SUCCESS,payload:data});
           console.log("like vlog ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:LIKE_VLOG_FAILURE,payload:error});
           
       }
   };

   export const IncrementVlogViewAction=(reelId)=>async(dispatch)=>{
    console.log("vlog called...............................",reelId)
    dispatch({type:INCREMENET_VLOG_VIEW_REQUEST})
       try {
           const{data}=await axios.put(`${API_BASE_URL}/reels/countView/${reelId}`);
           dispatch({type:INCREMENET_VLOG_VIEW_SUCCESS,payload:data});
           console.log("view aded ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:INCREMENET_VLOG_VIEW_FAILURE,payload:error});
           
       }
   };



   //


   export const createReelCommentAction=(reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_REEL_COMMENT_REQUEST})
       try {
           const{data}=await api.post(`/api/comments/reel/${reqData.reelId}`,reqData.data);
           dispatch({type:CREATE_Restro_SUCCESS,payload:data});
           console.log("created comment ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:CREATE_REEL_COMMENT_FAILURE,payload:error});
           
       }
   };

//    export const getTrendingPostAction=()=>async(dispatch)=>{
//     dispatch({type:GET_TRENDING_POST_REQUEST})
//        try {
//            const{data}=await axios.get(`${API_BASE_URL}/trendposts`);
//            dispatch({type:GET_TRENDING_POST_SUCCESS,payload:data});
//            console.log("get Trending post ",data);
//        } catch (error) {
   
//            console.log("error ",error)
//            dispatch({type:GET_TRENDING_POST_FAILURE,payload:error});
           
//        }
//    };