import axios from "axios";
import { API_BASE_URL, api } from "../../../config/api";
import { CREATE_RESTROPOST_FAILURE, CREATE_RESTROPOST_REQUEST, CREATE_RESTROPOST_SUCCESS, GET_ALL_RESTROPOST_REQUEST, GET_USERS_RESTROPOST_FAILURE, GET_USERS_RESTROPOST_REQUEST, GET_USERS_RESTROPOST_SUCCESS, LIKE_RESTROPOST_FAILURE, LIKE_RESTROPOST_REQUEST, LIKE_RESTROPOST_SUCCESS } from "./restropost.actionType";





export const createRestroPostAction=(postData)=>async(dispatch)=>{
    console.log("req post ---------",postData);
    dispatch({type:CREATE_RESTROPOST_REQUEST})
       try {
           const{data}=await api.post('/api/restroposts',postData);
           dispatch({type:CREATE_RESTROPOST_SUCCESS,payload:data});
           console.log("created post -----",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:CREATE_RESTROPOST_FAILURE,payload:error});
           
       }
   };
   
   
   
   
      export const getUsersRestroPostAction=(userId)=>async(dispatch)=>{
       dispatch({type:GET_USERS_RESTROPOST_REQUEST})
          try {
              const{data}=await axios.get(`${API_BASE_URL}/restroposts/restaurent/${userId}`);
              dispatch({type:GET_USERS_RESTROPOST_SUCCESS,payload:data});
              console.log("get user restaurent post ",data);
          } catch (error) {
      
              console.log("error ",error)
              dispatch({type:GET_USERS_RESTROPOST_FAILURE,payload:error});
              
          }
      };
   
   
      export const likeRestroPostAction=(postId)=>async(dispatch)=>{
       dispatch({type:LIKE_RESTROPOST_REQUEST})
          try {
              const{data}=await api.put(`/api/restroposts/like/{postId}${postId}`);
              dispatch({type:LIKE_RESTROPOST_SUCCESS,payload:data});
              console.log("like post ",data);
          } catch (error) {
      
              console.log("error ",error)
              dispatch({type:LIKE_RESTROPOST_FAILURE,payload:error});
              
          }
      };

      
   
   
   
      //
   