import { CREATE_COMMENT_SUCCESS, CREATE_REEL_COMMENT_FAILURE, CREATE_REEL_COMMENT_REQUEST, CREATE_REEL_COMMENT_SUCCESS, CREATE_VLOG_FAILURE, CREATE_VLOG_REQUEST, CREATE_VLOG_SUCCESS, GET_ALL_VLOG_FAILURE, GET_ALL_VLOG_REQUEST, GET_ALL_VLOG_SUCCESS, GET_TRENDING_VLOG_FAILURE, GET_TRENDING_VLOG_REQUEST, GET_TRENDING_VLOG_SUCCESS, GET_USERS_VLOG_FAILURE, GET_USERS_VLOG_REQUEST, GET_USERS_VLOG_SUCCESS, GET_VLOG_BYID_FAILURE, GET_VLOG_BYID_REQUEST, GET_VLOG_BYID_SUCCESS, LIKE_VLOG_FAILURE, LIKE_VLOG_REQUEST, LIKE_VLOG_SUCCESS } from "./vlog.actionType"

const initialState={
    loading:false,
    vlog:null,
    error:null,
    like:null,
    comments:[],
    newComment:null,
    vlogs:[],
    vlog:[]
}
export const vlogReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_VLOG_REQUEST:
        case GET_ALL_VLOG_REQUEST:
        case LIKE_VLOG_REQUEST:
        case GET_USERS_VLOG_REQUEST:
        case GET_TRENDING_VLOG_REQUEST:
        case GET_VLOG_BYID_REQUEST: 
        case CREATE_REEL_COMMENT_REQUEST:       
                return {...state, error:null,loading:false}
            
        case CREATE_VLOG_SUCCESS:
            
               return {...state,vlog:action.payload,
                
                comments:action.payload.comments,
                vlogs:[action.payload,...state.vlog],
               loading:false,error:null
            }

            case CREATE_REEL_COMMENT_SUCCESS:
                return{...state,
                    newComment:action.payload,
                    // comments:[action.payload,...state.comments],
                    loading:false,error:null}

                    case LIKE_VLOG_SUCCESS:
                        return {
                            ...state,
                            like: action.payload,
                            vlog: state.vlog.map((item) => item.id === action.payload.id ? action.payload : item),
                            loading: false,
                            error: null
                        }
                       

        case GET_ALL_VLOG_SUCCESS:
            case GET_TRENDING_VLOG_SUCCESS:
            return {...state,vlogs:action.payload,loading:false,error:null} 
        
        case GET_USERS_VLOG_SUCCESS:
            return {...state,vlogs:action.payload,loading:false,error:null}

            case GET_VLOG_BYID_SUCCESS:    
            return {...state,vlog:action.payload,loading:false,error:null}
        

        case CREATE_VLOG_FAILURE:
        case GET_ALL_VLOG_FAILURE:
        case LIKE_VLOG_FAILURE:  
        case GET_USERS_VLOG_FAILURE: 
        case GET_TRENDING_VLOG_FAILURE: 
        case GET_VLOG_BYID_FAILURE:
        case CREATE_REEL_COMMENT_FAILURE:    
            return{...state,error:action.payload,loading:false}
    
        default:
            return state;
    }
   
}