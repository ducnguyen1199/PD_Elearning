import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/actions/index';

const CoursesAreWaiting = props => {
	const renderTableHTML = () => {
		let { listCourseWaiting } = props;
		return listCourseWaiting.map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.maKhoaHoc}</td>
					<td>{item.tenKhoaHoc}</td>
					<td>
						<i
							class="fa fa-check"
							aria-hidden="true"
							onClick={() => {
								props.acceptCourse({
									maKhoaHoc: item.maKhoaHoc,
									taiKhoan: props.id,
									tenKhoaHoc: item.tenKhoaHoc,
								});
							}}
						></i>
						<i
							class="fa fa-times"
							aria-hidden="true"
							onClick={() => {
								props.cancelAttendCourse({ maKhoaHoc: item.maKhoaHoc, taiKhoan: props.id });
							}}
						></i>
					</td>
				</tr>
			);
		});
	};
	return (
		<Fragment>
			<table className="table">
				<thead>
					<tr>
						<th>STT</th>
						<th>MÃ KHÓA HỌC</th>
						<th>TÊN KHÓA HỌC</th>
						<th>THAO TÁC</th>
					</tr>
				</thead>
				<tbody>
					{props.listCourseWaiting.length ? (
						renderTableHTML()
					) : (
						<td colSpan="5" className="message">
							Không có khóa học
						</td>
					)}
				</tbody>
			</table>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		listCourseWaiting: state.NguoiDungReducer.listCourseWaiting,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		cancelAttendCourse: data => {
			dispatch(actions.actCancelAttendCourseAdmin(data));
		},
		acceptCourse: data => {
			dispatch(actions.actAcceptCourse(data));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CoursesAreWaiting);
