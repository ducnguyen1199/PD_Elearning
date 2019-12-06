import React from 'react';
import { connect } from 'react-redux';
const UsersHasRegistered = props => {
	const renderListUserRegister = () => {
		if (props.listUserRegister) {
			return props.listUserRegister.map((item, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{item.taiKhoan}</td>
						<td>{item.hoTen}</td>
						<td>{item.biDanh}</td>
					</tr>
				);
			});
		}
	};
	return (
		<table class="table table-striped">
			<thead>
				<tr>
					<th>STT</th>
					<th>TÀI KHOẢN</th>
					<th>HỌ TÊN</th>
					<th>BÍ DANH</th>
				</tr>
			</thead>
			<tbody>{renderListUserRegister()}</tbody>
		</table>
	);
};
const mapStateToProps = state => {
	return {
		listUserRegister: state.khoaHocReducer.listUserRegister,
	};
};
export default connect(mapStateToProps, null)(UsersHasRegistered);
