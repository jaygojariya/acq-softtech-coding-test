import { combineReducers } from 'redux';
import categoryReducer from "./category/categoryReducer";
import authReducer from "./auth/authReducer";

export default combineReducers({
    categoryReducer,
    authReducer
})