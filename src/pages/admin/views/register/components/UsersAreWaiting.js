import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../redux/actions/index';
import Swal from 'sweetalert2';
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
								className="fa fa-check"
								aria-hidden="true"
								onClick={() => {
									props.acceptUserRegister({ maKhoaHoc: props.maKhoaHoc, taiKhoan: item.taiKhoan });
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
										html: `<h3 style="color:#f8bb86"><b>WARNING!</b></h3><b>Bạn có muốn hủy ghi danh của người dùng này không?</b>`,
										showCancelButton: true,
										confirmButtonColor: '#d33',
										cancelButtonColor: '#3085d6',
										confirmButtonText: 'Đồng ý',
										cancelButtonText: 'Hủy',
										reverseButtons: true,
									}).then(rs => {
										if (rs.value) {
											props.rejectUserRegister({
												maKhoaHoc: props.maKhoaHoc,
												taiKhoan: item.taiKhoan,
											});
										}
									});
								}}
							></i>
						</td>
					</tr>
				);
			});
		}
	};
	return (
		<table className="table table-striped">
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
