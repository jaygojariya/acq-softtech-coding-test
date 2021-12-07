import * as actionType from "../../actionType"

 export const login = (param) => {
  localStorage.setItem('auth_info', true);

   return async dispatch => {
     try{
       const response = await fetch(
         `https://fakestoreapi.com/auth/login`,{
              method:'POST',
              body:JSON.stringify({
                  username: "mor_2314",
                  password: "83r5^_"
                  // username: param.username,
                  // password: param.password,
              })
          }
       );
       const resData = await response.json();

       // if success then data store in local storage
       let successLogin = {
         is_auth : true
       }
       localStorage.setItem('auth_info', true);

      //  dispatch(loginSuccess(resData));
     }catch(error){
       console.log("error ", error);
     }
   }
 }
 

export const loginSuccess = (data) => {
   return {
     type: actionType.LOGIN_SUCCESS,
     payload : data
   }
 }