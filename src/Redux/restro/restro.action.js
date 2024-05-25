import axios from "axios";
import { API_BASE_URL, api } from "../../config/api"
import { CREATE_RESTRO_COMMENT_REQUEST, CREATE_RESTRO_COMMENT_SUCCESS, CREATE_RESTRO_RATING_FAILURE, CREATE_RESTRO_RATING_REQUEST, CREATE_RESTRO_RATING_SUCCESS, CREATE_Restro_FAILURE, CREATE_Restro_REQUEST, CREATE_Restro_SUCCESS, GET_ALL_Restro_FAILURE, GET_ALL_Restro_REQUEST, GET_ALL_Restro_SUCCESS, GET_RESTAURANT_BY_CITY_AND_ADRESS_FAILURE, GET_RESTAURANT_BY_CITY_AND_ADRESS_REQUEST, GET_RESTAURANT_BY_CITY_AND_ADRESS_SUCCESS, GET_Restro_BYID_FAILURE, GET_Restro_BYID_REQUEST, GET_Restro_BYID_SUCCESS, GET_Restro_BY_CITY_AND_ADRESS_FAILURE, GET_Restro_BY_CITY_AND_ADRESS_REQUEST, GET_Restro_BY_CITY_AND_ADRESS_SUCCESS, GET_Restro_BY_RATING_FAILURE, GET_Restro_BY_RATING_REQUEST, GET_Restro_BY_RATING_SUCCESS, GET_USERS_Restro_FAILURE, GET_USERS_Restro_REQUEST, GET_USERS_Restro_SUCCESS, LIKE_Restro_FAILURE, LIKE_Restro_REQUEST, LIKE_Restro_SUCCESS, SEARCH_Restro_BY_CITY_AND_ADRESS_FAILURE, SEARCH_Restro_BY_CITY_AND_ADRESS_REQUEST, SEARCH_Restro_BY_CITY_AND_ADRESS_SUCCESS, SEARCH_Restro_FAILURE, SEARCH_Restro_REQUEST, SEARCH_Restro_SUCCESS, UPDATE_RESTRO_FAILURE, UPDATE_RESTRO_REQUEST, UPDATE_RESTRO_SUCCESS } from "./retro.actionType";
import { CREATE_RESTROPOST_FAILURE } from "./post/restropost.actionType";

export const createRestroAction=(restroData)=>async(dispatch)=>{
 dispatch({type:CREATE_Restro_REQUEST});
    try {
        const{data}=await api.post('/api/restaurents',restroData.data);
        console.log("req restroo ",restroData.data);
        dispatch({type:CREATE_Restro_SUCCESS,payload:data});
        // console.log("created restaurent --_-",data);
    } catch (error) {

        console.log("error ",error)
        dispatch({type:CREATE_Restro_FAILURE,payload:error});
        
    }
};


export const getAllRestroAction=()=>async(dispatch)=>{
    dispatch({type:GET_ALL_Restro_REQUEST})
       try {
           const{data}=await api.get('/api/restaurents');
           dispatch({type:GET_ALL_Restro_SUCCESS,payload:data});
           console.log("get all restaurent ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_ALL_Restro_FAILURE,payload:error});
           
       }
   };


   export const getUsersRestroAction=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USERS_Restro_REQUEST})
       try {
           const{data}=await api.get(`/api/user/restaurents`, {
            headers: {
              Authorization: `bearer ${jwt}`,
            },
          }
           );
           dispatch({type:GET_USERS_Restro_SUCCESS,payload:data});
           console.log("get user restaurent ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_USERS_Restro_FAILURE,payload:error});
           
       }
   };


   export const likeRestroAction=(restroId)=>async(dispatch)=>{
    dispatch({type:LIKE_Restro_REQUEST})
       try {
           const{data}=await api.put(`/api/posts/like/${restroId}`);
           dispatch({type:LIKE_Restro_SUCCESS,payload:data});
           console.log("like post ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:LIKE_Restro_FAILURE,payload:error});
           
       }
   };

   export const updateRestroAction = (restroData) => async (dispatch) => {
    console.log("req restaurent ---_---", restroData);
    dispatch({ type: UPDATE_RESTRO_REQUEST });
    try {
      const { data } = await api.put(`${API_BASE_URL}/api/restaurents`, restroData);
  
      console.log("update restaurent --------", data);
      dispatch({ type: UPDATE_RESTRO_SUCCESS, payload: data });
    } catch (error) {
      console.log("-----------", error);
      dispatch({ type: UPDATE_RESTRO_FAILURE, payload: error });
    }
  };


  export const searchRestroAction=(query)=>async(dispatch)=>{
    dispatch({type:SEARCH_Restro_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/restaurents/search?query=${query}`);
           dispatch({type:SEARCH_Restro_SUCCESS,payload:data});
           console.log("searched restaurents ----- ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:SEARCH_Restro_FAILURE,payload:error});
           
       }
   };

   export const getRestroByRestroId=(restroId)=>async(dispatch)=>{
    console.log("from restro id _______________________",restroId)
    dispatch({type:GET_Restro_BYID_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/restaurents/${restroId}`);

           console.log("Restaurent data__________________________________ ",data);

           dispatch({type:GET_Restro_BYID_SUCCESS,payload:data});
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_Restro_BYID_FAILURE,payload:error});
           
       }
   };

  

   export const createRestroRating=(restroId,value)=>async(dispatch)=>{
    console.log("value---------------------",value)
    dispatch({type:CREATE_RESTRO_RATING_REQUEST})
       try {
           const{data}=await api.post(`/api/ratings/restro/${restroId}`,{value},value);
           dispatch({type:CREATE_RESTRO_RATING_SUCCESS,payload:data});
           console.log("rated food ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:CREATE_RESTRO_RATING_FAILURE,payload:error});
           
       }
   };

   //


   export const createRestroCommentAction=(reqData)=>async(dispatch)=>{
    dispatch({type:CREATE_RESTRO_COMMENT_REQUEST})
       try {
           const{data}=await api.post(`/api/restrocomments/${reqData.restroId}`,reqData.data);
           dispatch({type:CREATE_RESTRO_COMMENT_SUCCESS,payload:data});
           console.log("created comment ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:CREATE_RESTROPOST_FAILURE,payload:error});
           
       }
   };


   export const getBestRestro=()=>async(dispatch)=>{
    dispatch({type:GET_Restro_BY_RATING_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/restaurent/bestrestro`);

           console.log("Restaurent data__________ ",data);

           dispatch({type:GET_Restro_BY_RATING_SUCCESS,payload:data});
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_Restro_BY_RATING_FAILURE,payload:error});
           
       }
   };

   export const searchRestroByCityOrAdressAction=(query)=>async(dispatch)=>{
    dispatch({type:SEARCH_Restro_BY_CITY_AND_ADRESS_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/restaurents/searchByCityOrAdress?query=${query}`);
           dispatch({type:SEARCH_Restro_BY_CITY_AND_ADRESS_SUCCESS,payload:data});
           console.log("searched restaurents by location----- ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:SEARCH_Restro_BY_CITY_AND_ADRESS_FAILURE,payload:error});
           
       }
   };

   export const getFoodByCityAndAdress=(query)=>async(dispatch)=>{
    dispatch({type:GET_Restro_BY_CITY_AND_ADRESS_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/foods/byLocation?query=${query}`);
           dispatch({type:GET_Restro_BY_CITY_AND_ADRESS_SUCCESS,payload:data});
           console.log("goted restaurents food by location----- ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_Restro_BY_CITY_AND_ADRESS_FAILURE,payload:error});
           
       }
   };

   export const getRestaurantByCityAndAdress=(query)=>async(dispatch)=>{
    dispatch({type:GET_RESTAURANT_BY_CITY_AND_ADRESS_REQUEST})
       try {
           const{data}=await axios.get(`${API_BASE_URL}/restaurents/getByCityOrAdress?query=${query}`);
           dispatch({type:GET_RESTAURANT_BY_CITY_AND_ADRESS_SUCCESS,payload:data});
           console.log("goted restaurents by location----- ",data);
       } catch (error) {
   
           console.log("error ",error)
           dispatch({type:GET_RESTAURANT_BY_CITY_AND_ADRESS_FAILURE,payload:error});
           
       }
   };
