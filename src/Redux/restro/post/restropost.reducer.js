import { CREATE_RESTROPOST_FAILURE, CREATE_RESTROPOST_REQUEST, CREATE_RESTROPOST_SUCCESS, GET_ALL_RESTROPOST_FAILURE, GET_USERS_RESTROPOST_FAILURE, GET_USERS_RESTROPOST_REQUEST, GET_USERS_RESTROPOST_SUCCESS, LIKE_RESTROPOST_FAILURE, LIKE_RESTROPOST_REQUEST, LIKE_RESTROPOST_SUCCESS } from "./restropost.actionType"

const initialState={
    loading:false,
    error:null,
    posts:[]
}
export const restropostReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_RESTROPOST_REQUEST:
        case LIKE_RESTROPOST_REQUEST:
        case GET_USERS_RESTROPOST_REQUEST:
                return {...state, error:null,loading:false}
            
        case CREATE_RESTROPOST_SUCCESS:
            
               return {...state,post:action.payload,
                
               
               loading:false,error:null
            }
       
        
        case GET_USERS_RESTROPOST_SUCCESS:
            return {...state,posts:action.payload,loading:false,error:null}
        

        case CREATE_RESTROPOST_FAILURE:
        case GET_ALL_RESTROPOST_FAILURE:
        case LIKE_RESTROPOST_FAILURE:  
        case GET_USERS_RESTROPOST_FAILURE:  
            return{...state,error:action.payload,loading:false}
    
        default:
            return state;
    }
   
}