import * as actionType from "../../actionType"
const initialState = {
  authData: localStorage.getItem('auth_info'),
  // authData: []
};
function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      return { ...state, authData: action.payload };
    default:
      return state;
  }
}
export default authReducer;