import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { authReducer } from "./Auth/auth.reducer";
import { restroReducer } from "./restro/restro.reducer";
import { restropostReducer } from "./restro/post/restropost.reducer";
import { foodReducer } from "./restro/food/food.reducer";
import { postReducer } from "./post/post.reducer";
import { vlogReducer } from "./vlogs/vlog.reducer";

const rootReducers=combineReducers({
post:postReducer,    
auth:authReducer,
restro:restroReducer,
restropost:restropostReducer,
food:foodReducer,
vlog:vlogReducer
})

 export const store=legacy_createStore(rootReducers,applyMiddleware(thunk))