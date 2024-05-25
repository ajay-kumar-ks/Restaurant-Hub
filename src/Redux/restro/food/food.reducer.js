import { AVAILABLE_FOOD_FAILURE, AVAILABLE_FOOD_REQUEST, AVAILABLE_FOOD_SUCCESS, CREATE_FOOD_COMMENT_FAILURE, CREATE_FOOD_COMMENT_REQUEST, CREATE_FOOD_COMMENT_SUCCESS, CREATE_FOOD_FAILURE, CREATE_FOOD_REQUEST, CREATE_FOOD_SUCCESS, CREATE_RATING_FAILURE, CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, GET_ALL_FOOD_FAILURE, GET_BEST_FOOD_FAILURE, GET_BEST_FOOD_REQUEST, GET_BEST_FOOD_SUCCESS, GET_USERS_FOOD_FAILURE, GET_USERS_FOOD_REQUEST, GET_USERS_FOOD_SUCCESS, LIKE_FOOD_FAILURE, LIKE_FOOD_REQUEST, LIKE_FOOD_SUCCESS, SPECIAL_FOOD_FAILURE, SPECIAL_FOOD_REQUEST, SPECIAL_FOOD_SUCCESS } from "./food.actionType"

const initialState={
    post:null,
    loading:false,
    error:null,
    posts:[],
    like:null,
    rating:[],
    newComment:null,
    userposts:[],
    userfood:[]
}
export const foodReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_FOOD_REQUEST:
        case LIKE_FOOD_REQUEST:
        case GET_USERS_FOOD_REQUEST:
            case SPECIAL_FOOD_REQUEST:
            case AVAILABLE_FOOD_REQUEST:
            case CREATE_RATING_REQUEST:
            case CREATE_FOOD_COMMENT_REQUEST: 
            case GET_BEST_FOOD_REQUEST:   
                return {...state, error:null,loading:false}
            
                case CREATE_FOOD_SUCCESS:
                    return {
                        ...state,
                        userfood: [...state.userfood, action.payload],
                        posts: state.userfood.map((item) => item.id === action.payload.id ? action.payload : item),
                        loading: false,
                        error: null
                    }

            // case CREATE_COMMENT_SUCCESS:
            //     return{...state,
            //         newComment:action.payload,
            //         // comments:[action.payload,...state.comments],
            //         loading:false,error:null}

        case LIKE_FOOD_SUCCESS:
            return{
                ...state,like:action.payload,
                userfood:state.userfood.map((item)=>item.id===action.payload.id?action.payload:item),
                loading:false,error:null
                
            }   
            
            case CREATE_RATING_SUCCESS:
                return{
                    ...state,rating:action.payload,
                    loading:false,error:null
                    
                } 


            case SPECIAL_FOOD_SUCCESS:
            case AVAILABLE_FOOD_SUCCESS:    
                return{
                    ...state,like:action.payload,
                    userfood:state.userfood.map((item)=>item.id===action.payload.id?action.payload:item),
                    loading:false,error:null
                    
                } 

                case CREATE_FOOD_COMMENT_SUCCESS:
                    return {
                      ...state,
                      newComment: action.payload,
                    //   Comments: [action.payload, ...state.Comments],
                      loading: false,
                      error: null,
                    };

       
        
        case GET_USERS_FOOD_SUCCESS:
        case GET_BEST_FOOD_SUCCESS:    
            return {...state,userfood:action.payload,
                                   rating:[action.payload,...state.rating],

                loading:false,error:null}
        

        case CREATE_FOOD_FAILURE:
        case GET_ALL_FOOD_FAILURE:
        case LIKE_FOOD_FAILURE:  
        case GET_USERS_FOOD_FAILURE: 
        case SPECIAL_FOOD_FAILURE: 
        case AVAILABLE_FOOD_FAILURE:
        case CREATE_RATING_FAILURE:    
        case CREATE_FOOD_COMMENT_FAILURE:
        case GET_BEST_FOOD_FAILURE:    
            return{...state,error:action.payload,loading:false}
    
        default:
            return state;
    }
   
}