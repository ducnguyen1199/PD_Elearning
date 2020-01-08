import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/actions/index';
import Swal from 'sweetalert2';
const CoursesHasRegistered = props => {
	const renderTableHTML = () => {
		let { ListCourseAccepted } = props;
		return ListCourseAccepted.map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.maKhoaHoc}</td>
					<td>{item.tenKhoaHoc}</td>
					<td><i
						class="fa fa-times"
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
									props.cancelAcceptedCourse({ maKhoaHoc: item.maKhoaHoc, taiKhoan: props.id });
								}
							});
						}}
					></i></td>
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
						<th>HỦY GHI DANH</th>
					</tr>
				</thead>
				<tbody>
					{props.ListCourseAccepted.length ? (
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
		ListCourseAccepted: state.NguoiDungReducer.listCourseAccepted,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		cancelAcceptedCourse: (data) => {
			dispatch(actions.actCancelAcceptedCourseAdmin(data));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesHasRegistered);
