import * as actionType from "../../actionType"

export const categoryListSuccess = (data) => {
   return {
     type: actionType.CATEGORY_LIST,
     payload : data
   }
 }
 
 export const categoryList = () => {
   return async dispatch => {
     try{
       const response = await fetch(
         `https://fakestoreapi.com/products`
       );
       const resData = await response.json();
       dispatch(categoryListSuccess(resData));
     }catch(error){
       console.log("error ", error);
     }
   }
 }
 

export const addProductSuccess = (data) => {
   return {
     type: actionType.ADD_CART,
     payload : data
   }
 }
 
 export const addProduct = (data) => {
   return async dispatch => {
     try{
       dispatch(addProductSuccess(data));
     }catch(error){
       console.log("error ", error);
     }
   }
 }
 
