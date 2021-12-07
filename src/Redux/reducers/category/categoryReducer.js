import * as actionType from "../../actionType"
const initialState = {
  categoryList: [],
  addCartData: [],
};
function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case actionType.CATEGORY_LIST:
      return { ...state, categoryList: action.payload };
    case actionType.ADD_CART:
      return { ...state, addCartData: action.payload };
    default:
      return state;
  }
}
export default categoryReducer;