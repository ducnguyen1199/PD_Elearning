import * as actionTypes from '../constants/actionTypes';
let initialState = {
	listCourse: [],
	listCategoryCourse: [],
	dataDetailCourse: [],
	editCourse: '',
	listUserRegister: [],
	listUserWaiting: [],
};

const KhoaHocReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.GET_LIST_COURSE:
			state.listCourse = action.listCourse;
			return { ...state };
		case actionTypes.GET_CATEGORY_COURSE:
			state.listCategoryCourse = action.listCategoryCourse;
			return { ...state };
		case actionTypes.GET_DETAIL_COURSE:
			let listDataDetailCourse = { ...state.dataDetailCourse };
			listDataDetailCourse = action.dataDetailCourse;
			state.dataDetailCourse = listDataDetailCourse;
			return { ...state };
		case actionTypes.ADD_NEW_COURSE:
			state.listCourse = [...state.listCourse, action.data];
			return { ...state };
		case actionTypes.EDIT_COURSE:
			state.editCourse = action.data;
			return { ...state };
		case actionTypes.DELETE_COURESE:
			let listCourse = [...state.listCourse];
			let index = state.listCourse.findIndex(item => {
				return item.maKhoaHoc === action.maKhoaHoc;
			});
			listCourse.splice(index, 1);
			state.listCourse = listCourse;
			return { ...state };
		case actionTypes.UPDATE_COURSE:
			let listCourses = [...state.listCourse];
			let indexx = state.listCourse.findIndex(item => {
				return item.maKhoaHoc === action.data.maKhoaHoc;
			});
			listCourses[indexx] = action.data;
			state.listCourse = listCourses;
			return { ...state };
		case actionTypes.GET_LIST_USER_REGISTER:
			state.listUserRegister = action.listUserRegister;
			return { ...state };
		case actionTypes.GET_LIST_USER_WAITING:
			state.listUserWaiting = action.listUserWaiting;
			return { ...state };
		case actionTypes.DELETE_USER_REGISTER:
			console.log(action.data);
			let listUserWaiting = [...state.listUserWaiting];
			let indexxx = state.listUserWaiting.findIndex(item => {
				return item.taiKhoan === action.data;
			});
			listUserWaiting.splice(indexxx, 1);
			state.listUserWaiting = listUserWaiting;
			return { ...state };
		default:
			return { ...state };
	}
};

export default KhoaHocReducer;
