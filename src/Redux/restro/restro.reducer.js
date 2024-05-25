import { GET_ALL_RESTROPOST_FAILURE, GET_USERS_RESTROPOST_REQUEST, GET_USERS_RESTROPOST_SUCCESS } from "./post/restropost.actionType"
import { CREATE_RESTRO_COMMENT_FAILURE, CREATE_RESTRO_COMMENT_REQUEST, CREATE_RESTRO_COMMENT_SUCCESS, CREATE_RESTRO_RATING_FAILURE, CREATE_RESTRO_RATING_REQUEST, CREATE_RESTRO_RATING_SUCCESS, CREATE_Restro_FAILURE, CREATE_Restro_REQUEST, CREATE_Restro_SUCCESS, GET_ALL_Restro_FAILURE, GET_ALL_Restro_REQUEST, GET_ALL_Restro_SUCCESS, GET_RESTAURANT_BY_CITY_AND_ADRESS_FAILURE, GET_RESTAURANT_BY_CITY_AND_ADRESS_REQUEST, GET_RESTAURANT_BY_CITY_AND_ADRESS_SUCCESS, GET_Restro_BYID_FAILURE, GET_Restro_BYID_REQUEST, GET_Restro_BYID_SUCCESS, GET_Restro_BY_CITY_AND_ADRESS_REQUEST, GET_Restro_BY_CITY_AND_ADRESS_SUCCESS, GET_Restro_BY_RATING_FAILURE, GET_Restro_BY_RATING_REQUEST, GET_Restro_BY_RATING_SUCCESS, GET_USERS_Restro_FAILURE, GET_USERS_Restro_REQUEST, GET_USERS_Restro_SUCCESS, LIKE_Restro_FAILURE, LIKE_Restro_REQUEST, SEARCH_Restro_BY_CITY_AND_ADRESS_FAILURE, SEARCH_Restro_BY_CITY_AND_ADRESS_REQUEST, SEARCH_Restro_BY_CITY_AND_ADRESS_SUCCESS, SEARCH_Restro_FAILURE, SEARCH_Restro_REQUEST, SEARCH_Restro_SUCCESS } from "./retro.actionType"

const initialState={
    userrestro:null,
    post:null,
    loading:false,
    error:null,
    posts:[],
    like:null,
    comments:[],
    newComment:null,
    userposts:[],
    restaurents:[],
    restaurent:null,
    restroComments:[],
    ratings:[],
    restroPost:[],
    locRestros:[],
    restroFood:[]

    
}
export const restroReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_Restro_REQUEST:
        case GET_ALL_Restro_REQUEST:
        // case LIKE_Restro_REQUEST:
        case GET_USERS_Restro_REQUEST:
            case SEARCH_Restro_REQUEST:
            case GET_Restro_BYID_REQUEST: 
            case CREATE_RESTRO_COMMENT_REQUEST:   
            case CREATE_RESTRO_RATING_REQUEST:
            case GET_Restro_BY_RATING_REQUEST: 
            case GET_USERS_RESTROPOST_REQUEST:  
            case SEARCH_Restro_BY_CITY_AND_ADRESS_REQUEST: 
            case GET_Restro_BY_CITY_AND_ADRESS_REQUEST: 
           case GET_RESTAURANT_BY_CITY_AND_ADRESS_REQUEST:
                return {...state, error:null,loading:false}
            
        case CREATE_Restro_SUCCESS:
            
               return {...state,post:action.payload,
               loading:false,error:null
            }

            case CREATE_RESTRO_COMMENT_SUCCESS:
                return {
                  ...state,
                  newComment: action.payload,
                  restroComments: [action.payload, ...state.restroComments], // Include the new comment in the restroComments array
                  loading: false,
                  error: null,
                };

        // case LIKE_POST_SUCCESS:
        //     return{
        //         ...state,like:action.payload,
        //         posts:state.posts.map((item)=>item.id===action.payload.id?action.payload:item),
        //         loading:false,error:null
                
        //     }    

        // case GET_ALL_Restro_SUCCESS:
        //     return {...state,restro:action.payload,loading:false,error:null} 

        case CREATE_RESTRO_RATING_SUCCESS:
            return{
                ...state,ratings:action.payload,
                loading:false,error:null
                
            } 
        
        case GET_USERS_Restro_SUCCESS:    
            return {...state,user:action.payload,loading:false,error:null}

        case GET_Restro_BYID_SUCCESS:    
            return {...state,restaurent:action.payload,loading:false,error:null}

            case SEARCH_Restro_SUCCESS:
            case GET_Restro_BY_RATING_SUCCESS: 
            case GET_RESTAURANT_BY_CITY_AND_ADRESS_SUCCESS:   
                return {...state,restaurents:action.payload,loading:false,error:null}

            case SEARCH_Restro_BY_CITY_AND_ADRESS_SUCCESS:    
                return {...state,locRestros:action.payload,loading:false,error:null}
                
            case GET_Restro_BY_CITY_AND_ADRESS_SUCCESS:    
                return {...state,restroFood:action.payload,loading:false,error:null}
        

                case GET_USERS_RESTROPOST_SUCCESS:
            return {...state,restroPost:action.payload,loading:false,error:null}

        case CREATE_Restro_FAILURE:
        case GET_ALL_Restro_FAILURE:
        // case LIKE_Restro_FAILURE:  
        case GET_USERS_Restro_FAILURE: 
        case SEARCH_Restro_FAILURE: 
        case GET_Restro_BYID_FAILURE:
        case CREATE_RESTRO_COMMENT_FAILURE:
        case CREATE_RESTRO_RATING_FAILURE:
        case GET_Restro_BY_RATING_FAILURE: 
        case GET_ALL_RESTROPOST_FAILURE:  
        case SEARCH_Restro_BY_CITY_AND_ADRESS_FAILURE:   
        case GET_RESTAURANT_BY_CITY_AND_ADRESS_FAILURE:  
            return{...state,error:action.payload,loading:false}
    
        default:
            return state;
    }
   
}