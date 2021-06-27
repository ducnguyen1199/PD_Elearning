import * as actionTypes from "../constants/actionTypes";
let initialState = {
  accountInfo: {},
  userList: [],
  listCourseWaiting: [],
  listCourseAccepted: [],
  isPUT: false,
};

const NguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_LIST:
      return { ...state, userList: action.data };
    case actionTypes.CANCEL_ATTENDED_COURSE:
      state.accountInfo = state.accountInfo.filter(
        (item) => item.maKhoaHoc !== action.data.maKhoaHoc
      );
      return { ...state };
    case actionTypes.DELETE_USER:
      state.userList = state.userList.filter(
        (item) => action.data !== item.taiKhoan
      );
      return { ...state };
    case actionTypes.ADD_USER:
      return { ...state, userList: [...state.userList, action.data] };
    case actionTypes.PUT_ACCOUNT_USER: {
      let userList = [...state.userList];
      let index = state.userList.findIndex((item) => {
        return action.data.taiKhoan === item.taiKhoan;
      });
      userList[index] = action.data;
      state.userList = userList;
      let accountInfo = { ...state.accountInfo };
      accountInfo = action.data;
      state.accountInfo = accountInfo;
      return { ...state };
    }
    case actionTypes.GET_INFO_ACCOUNT:
      return { ...state, accountInfo: action.data };
    case actionTypes.LOGOUT_ACCOUNT:
      return { ...state, accountInfo: action.data };
    case actionTypes.GET_COURSE_WAITING:
      return { ...state, listCourseWaiting: action.data };
    case actionTypes.GET_LIST_COURSE_ACCEPTED:
      return { ...state, listCourseAccepted: action.data };
    case actionTypes.CANCEL_ATTENDED_COURSE_ADMIN:
      state.listCourseWaiting = state.listCourseWaiting.filter(
        (item) => item.maKhoaHoc !== action.data.maKhoaHoc
      );
      return { ...state };
    case actionTypes.CANCEL_ACCEPTED_COURSE_ADMIN:
      state.listCourseAccepted = state.listCourseAccepted.filter(
        (item) => item.maKhoaHoc !== action.data.maKhoaHoc
      );
      return { ...state };
    case actionTypes.ACCPET_COURSE_REGISTER:
      state.listCourseWaiting = state.listCourseWaiting.filter(
        (item) => item.maKhoaHoc !== action.data.maKhoaHoc
      );
      let temp = {
        maKhoaHoc: action.data.maKhoaHoc,
        tenKhoaHoc: action.data.tenKhoaHoc,
      };
      state.listCourseAccepted = [...state.listCourseAccepted, temp];
      return {
        ...state,
        listCourseAccepted: [...state.listCourseAccepted, temp],
      };
    default:
      return { ...state };
  }
};

export default NguoiDungReducer;
