import * as actionTypes from "../constants/actionTypes";
let initialState = {
  listCart: [],
  giamGia: {
    maGiamGia: "KH",
    mucGiamGia: 0.2,
  },
};
const GioHangReducer = (state = initialState, { type, payload, ...action }) => {
  switch (type) {
    case actionTypes.ADD_TO_CART: {
      let index = state.listCart.findIndex((item) => {
        return item.maKhoaHoc === payload.maKhoaHoc;
      });
      if (index === -1) {
        state.listCart = [...state.listCart, payload];
      }
      return { ...state };
    }
    case actionTypes.DELETE_INTO_CART: {
      state.listCart = state.listCart.filter(
        (item) => item.maKhoaHoc !== action.maKhoaHoc
      );
      return { ...state };
    }
    case actionTypes.RELOAD_CART:
      state.listCart = [];
      return { ...state };
    default:
      return { ...state };
  }
};
export default GioHangReducer;
