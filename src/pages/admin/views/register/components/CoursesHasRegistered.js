import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const CoursesHasRegistered = props => {
	const renderTableHTML = () => {
		let { ListCourseAccepted } = props;
		return ListCourseAccepted.map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.maKhoaHoc}</td>
					<td>{item.tenKhoaHoc}</td>
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

export default connect(mapStateToProps, null)(CoursesHasRegistered);
