import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/actions/index';
import Swal from 'sweetalert2';
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
							className="fa fa-check"
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
							className="fa fa-times"
							aria-hidden="true"
							onClick={() => {
								Swal.fire({
									position: 'center',
									icon: 'success',
									icon: 'warning',
									html: `<h3 style="color:#f8bb86"><b>WARNING!</b></h3><b>Bạn có muốn hủy ghi danh khóa học này không?</b>`,
									showCancelButton: true,
									confirmButtonColor: '#d33',
									cancelButtonColor: '#3085d6',
									confirmButtonText: 'Đồng ý',
									cancelButtonText: 'Hủy',
									reverseButtons: true,
								}).then(rs => {
									if (rs.value) {
										props.cancelAttendCourse({ maKhoaHoc: item.maKhoaHoc, taiKhoan: props.id });
									}
								});
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
