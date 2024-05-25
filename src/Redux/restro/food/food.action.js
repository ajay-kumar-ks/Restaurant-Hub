import axios from "axios";
import { API_BASE_URL, api } from "../../../config/api";
import { AVAILABLE_FOOD_FAILURE, AVAILABLE_FOOD_REQUEST, AVAILABLE_FOOD_SUCCESS, CREATE_FOOD_COMMENT_FAILURE, CREATE_FOOD_COMMENT_REQUEST, CREATE_FOOD_COMMENT_SUCCESS, CREATE_FOOD_FAILURE, CREATE_FOOD_REQUEST, CREATE_FOOD_SUCCESS, CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_BEST_FOOD_FAILURE, GET_BEST_FOOD_REQUEST, GET_BEST_FOOD_SUCCESS, GET_USERS_FOOD_FAILURE, GET_USERS_FOOD_REQUEST, GET_USERS_FOOD_SUCCESS, LIKE_FOOD_FAILURE, LIKE_FOOD_REQUEST, LIKE_FOOD_SUCCESS, SPECIAL_FOOD_FAILURE, SPECIAL_FOOD_REQUEST, SPECIAL_FOOD_SUCCESS } from "./food.actionType";



export const createFoodAction=(foodData)=>async(dispatch)=>{
    console.log("req food ---------",foodData);
    dispatch({type:CREATE_FOOD_REQUEST})
       try {
           const{data}=await api.post('/api/foods',foodData);
           dispatch({type:CREATE_FOOD_SUCCESS,payload:data});
           console.log("created food -----",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:CREATE_FOOD_FAILURE,payload:error});
           
       }
   };
   
   
   
   
      export const getUsersFoodAction=(userId)=>async(dispatch)=>{
        console.log(userId);
       dispatch({type:GET_USERS_FOOD_REQUEST})
          try {
              const{data}=await axios.get(`${API_BASE_URL}/foods/restaurent/${userId}`); 
              console.log("get user restaurent food ",data);
              dispatch({type:GET_USERS_FOOD_SUCCESS,payload:data});
              
          } catch (error) {
      
              console.log("error ",error);

              dispatch({type:GET_USERS_FOOD_FAILURE,payload:error});
               
          }
      };
   
   
      export const likeRestroFoodAction=(postId)=>async(dispatch)=>{
       dispatch({type:LIKE_FOOD_REQUEST})
          try {
              const{data}=await api.put(`/api/foods/like/${postId}`);
              dispatch({type:LIKE_FOOD_SUCCESS,payload:data});
              console.log("like food ",data);
          } catch (error) {
      
              console.log("error ",error)
              dispatch({type:LIKE_FOOD_FAILURE,payload:error});
              
          }
      };

      export const specialRestroFoodAction=(postId)=>async(dispatch)=>{
        dispatch({type:SPECIAL_FOOD_REQUEST})
           try {
               const{data}=await api.put(`/api/foods/specials/${postId}`);
               dispatch({type:SPECIAL_FOOD_SUCCESS,payload:data});
               console.log("like food ",data);
           } catch (error) {
       
               console.log("error ",error)
               dispatch({type:SPECIAL_FOOD_FAILURE,payload:error});
               
           }
       };

       export const avalabilityRestroFoodAction=(postId)=>async(dispatch)=>{
        dispatch({type:AVAILABLE_FOOD_REQUEST})
           try {
               const{data}=await api.put(`/api/foods/avail/${postId}`);
               dispatch({type:AVAILABLE_FOOD_SUCCESS,payload:data});
               console.log("like food ",data);
           } catch (error) {
       
               console.log("error ",error)
               dispatch({type:AVAILABLE_FOOD_FAILURE,payload:error});
               
           }
       };

       export const createFoodRating=(foodId,value)=>async(dispatch)=>{
        console.log("value---------------------",value)
        dispatch({type:CREATE_RATING_REQUEST})
           try {
               const{data}=await api.post(`/api/ratings/${foodId}`,{value},value);
               dispatch({type:CREATE_RATING_SUCCESS,payload:data});
               console.log("rated food ",data);
           } catch (error) {
       
               console.log("error ",error)
               dispatch({type:CREATE_RATING_FAILURE,payload:error});
               
           }
       };


       export const createFoodCommentAction=(reqData)=>async(dispatch)=>{
        dispatch({type:CREATE_FOOD_COMMENT_REQUEST})
           try {
               const{data}=await api.post(`/api/foodcomments/${reqData.foodId}`,reqData.data);
               dispatch({type:CREATE_FOOD_COMMENT_SUCCESS,payload:data});
               console.log("created food comment ",data);
           } catch (error) {
       
               console.log("error ",error)
               dispatch({type:CREATE_FOOD_COMMENT_FAILURE,payload:error});
               
           }
       };

       

    export const getBestFoodAction = (currentPage) => async (dispatch) => {
        console.log("Fetching best's food data...");
        dispatch({ type: GET_BEST_FOOD_REQUEST });
        // console.log("Axios Request:", `${API_BASE_URL}/food/trendfoods?page=${currentPage}`);
      
        try {
            const { data } = await axios.get(`${API_BASE_URL}/food/trendfoods?page=${currentPage}`);
            console.log("get best food", data);
            dispatch({ type: GET_BEST_FOOD_SUCCESS, payload: data });
          } catch (error) {
            console.error("Axios Error:", error);
            dispatch({ type: GET_BEST_FOOD_FAILURE, payload: error });
          }
          
      };
  
    
   