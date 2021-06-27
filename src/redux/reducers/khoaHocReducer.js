import * as actionTypes from "../constants/actionTypes";
let initialState = {
  listCourse: [],
  listCategoryCourse: [],
  dataDetailCourse: [],
  editCourse: "",
  listUserRegister: [],
  listUserWaiting: [],
  listCourseFilter: [],
};

const KhoaHocReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_COURSE:
      return { ...state, listCourse: action.listCourse };
    case actionTypes.GET_CATEGORY_COURSE:
      return { ...state, listCategoryCourse: action.listCategoryCourse };
    case actionTypes.GET_DETAIL_COURSE:
      return { ...state, dataDetailCourse: action.dataDetailCourse };
    case actionTypes.ADD_NEW_COURSE:
      return { ...state, listCourse: [...state.listCourse, action.data] };
    case actionTypes.EDIT_COURSE:
      return { ...state, editCourse: action.data };
    case actionTypes.DELETE_COURESE:
      state.listCourse = state.listCourse.filter(
        (item) => item.maKhoaHoc !== action.maKhoaHoc
      );
      return { ...state };
    case actionTypes.UPDATE_COURSE:
      let listCourse = [...state.listCourse];
      let index = state.listCourse.findIndex(
        (item) => item.maKhoaHoc === action.data.maKhoaHoc
      );
      listCourse[index] = action.data;
      return { ...state, listCourse };
    case actionTypes.GET_LIST_USER_REGISTER:
      return { ...state, listUserRegister: action.listUserRegister };
    case actionTypes.GET_LIST_USER_WAITING:
      return { ...state, listUserWaiting: action.listUserWaiting };
    case actionTypes.DELETE_USER_REGISTER:
      state.listUserWaiting = state.listUserWaiting.filter(
        (item) => item.taiKhoan !== action.data
      );
      return { ...state };
    case actionTypes.FILTER_LIST_COURSE:
      return { ...state, listCourseFilter: action.payload };
    default:
      return { ...state };
  }
};

export default KhoaHocReducer;
