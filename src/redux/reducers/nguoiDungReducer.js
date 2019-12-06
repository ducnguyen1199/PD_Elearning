import * as actionTypes from '../constants/actionTypes';
let initialState = {
	accountInfo: {},
	userList: [],
	listCourseWaiting: [],
	listCourseAccepted: []
};

const NguoiDungReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_USER_LIST:
			state.userList = action.data;
			return { ...state }
		case actionTypes.CANCEL_ATTENDED_COURSE:
			let accountInfo = { ...state.accountInfo };
			let index = accountInfo.chiTietKhoaHocGhiDanh.findIndex(item => {
				return item.maKhoaHoc == action.data.maKhoaHoc;
			});
			accountInfo.chiTietKhoaHocGhiDanh.splice(index, 1);
			state.accountInfo = accountInfo;


			return { ...state };
		case actionTypes.DELETE_USER:
			let userList = [...state.userList];
			let x = state.userList.findIndex(item => {
				return action.data === item.taiKhoan
			});
			userList.splice(x, 1);
			state.userList = userList;
			return { ...state }
		case actionTypes.ADD_USER:
			let userList2 = [...state.userList];
			userList2.push(action.data);
			state.userList = userList2;
			return { ...state };
		case actionTypes.PUT_ACCOUNT_USER:
			let userList3 = [...state.userList];
			let x2 = state.userList.findIndex(item => {
				return action.data.taiKhoan === item.taiKhoan
			});
			userList3[x2] = action.data;
			state.userList = userList3;
			return { ...state }
		case actionTypes.GET_INFO_ACCOUNT:
			state.accountInfo = action.data;
			return { ...state };
		case actionTypes.LOGOUT_ACCOUNT:
			state.accountInfo = action.data;
			return { ...state };
		case actionTypes.GET_COURSE_WAITING:
			state.listCourseWaiting = action.data;
			return { ...state }
		case actionTypes.GET_LIST_COURSE_ACCEPTED:

			state.listCourseAccepted = action.data;
			return { ...state }
		case actionTypes.CANCEL_ATTENDED_COURSE_ADMIN:
			let listCourseWaiting = [...state.listCourseWaiting];
			let indexx = state.listCourseWaiting.findIndex(item => {
				return item.maKhoaHoc === action.data.maKhoaHoc
			})
			listCourseWaiting.splice(indexx, 1);
			state.listCourseWaiting = listCourseWaiting;
		case actionTypes.ACCPET_COURSE_REGISTER:
			let listCourseWaiting1 = [...state.listCourseWaiting];
			let indexxx = state.listCourseWaiting.findIndex(item => {
				return item.maKhoaHoc === action.data.maKhoaHoc
			})
			listCourseWaiting1.splice(indexxx, 1);
			state.listCourseWaiting = listCourseWaiting1;

			let listCourseAccepted = [...state.listCourseAccepted]
			let temp = {
				maKhoaHoc: action.data.maKhoaHoc,
				tenKhoaHoc: action.data.tenKhoaHoc
			}
			listCourseAccepted.push(temp);
			state.listCourseAccepted = listCourseAccepted;
			return { ...state }
		default:
			return { ...state };
	}
};

export default NguoiDungReducer;
