import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/actions/index';
const UsersAreWaiting = props => {
	const renderListUserWaiting = () => {
		if (props.listUserWaiting) {
			return props.listUserWaiting.map((item, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>{item.taiKhoan}</td>
						<td>{item.hoTen}</td>
						<td>{item.biDanh}</td>
						<td>
							<i
								class="fa fa-check"
								aria-hidden="true"
								onClick={() => {
									props.acceptUserRegister({ maKhoaHoc: props.maKhoaHoc, taiKhoan: item.taiKhoan });
								}}
							></i>
							<i
								class="fa fa-times"
								aria-hidden="true"
								onClick={() => {
									props.rejectUserRegister({ maKhoaHoc: props.maKhoaHoc, taiKhoan: item.taiKhoan });
								}}
							></i>
						</td>
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
					<td>THAO TÁC</td>
				</tr>
			</thead>
			<tbody>{renderListUserWaiting()}</tbody>
		</table>
	);
};

const mapStateToProps = state => {
	return {
		listUserWaiting: state.khoaHocReducer.listUserWaiting,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		acceptUserRegister: data => {
			dispatch(actions.actAcceptUserRegisterApi(data));
		},
		rejectUserRegister: data => {
			dispatch(actions.actRejectUserRegisterApi(data));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersAreWaiting);
