import React, { useEffect } from 'react';
import CoursesAreWaiting from './components/CoursesAreWaiting';
import CoursesHasRegistered from './components/CoursesHasRegistered';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
const RegisterCoursesByUser = props => {
	useEffect(() => {
		let id = props.propsComponent.match.params.id;
		props.getListCourseWaiting({ taiKhoan: id });
		props.GetListCourseAccepted({ taiKhoan: id });
	}, []);
	return (
		<section className="register-courses">
			<h3 className="title">
				<i className="fa fa-edit" aria-hidden="true"></i> REGISTER COURSES BY USER
			</h3>
			<ul className="nav nav-tabs admin-tabs" id="myTab" role="tablist">
				<li className="nav-item">
					<a
						className="nav-link active"
						id="register-course-1-tab"
						data-toggle="tab"
						href="#register-course-1"
						role="tab"
						aria-controls="register-course-1"
						aria-selected="true"
					>
						DANH SÁCH KHÓA HỌC ĐANG CHỜ GHI DANH
					</a>
				</li>
				<li className="nav-item">
					<a
						className="nav-link"
						id="register-course-2-tab"
						data-toggle="tab"
						href="#register-course-2"
						role="tab"
						aria-controls="register-course-2"
						aria-selected="false"
					>
						DANH SÁCH KHÓA HỌC ĐÃ GHI DANH
					</a>
				</li>
			</ul>
			<div className="tab-content" id="myTabContent">
				<div
					className="tab-pane fade show active"
					id="register-course-1"
					role="tabpanel"
					aria-labelledby="register-course-1-tab"
				>
					<CoursesAreWaiting id={props.propsComponent.match.params.id} />
				</div>
				<div
					className="tab-pane fade"
					id="register-course-2"
					role="tabpanel"
					aria-labelledby="register-course-2-tab"
				>
					<CoursesHasRegistered id={props.propsComponent.match.params.id} />
				</div>
			</div>
		</section>
	);
};
const mapDispatchToProps = dispatch => {
	return {
		getListCourseWaiting: data => {
			dispatch(actions.actGetCourseWaitingAPI(data));
		},
		GetListCourseAccepted: data => {
			dispatch(actions.actGetListCourseAccpetedAPI(data));
		},
	};
};

export default connect(null, mapDispatchToProps)(RegisterCoursesByUser);
