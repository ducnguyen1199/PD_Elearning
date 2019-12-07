import React, { useEffect, useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import userManagementModal from '../../components/widthmodal/userManagementModal';
import widthmodal from '../../components/widthmodal/widthmodal';
import Loading from '../../../../components/Loading';
let FormsModal = widthmodal(userManagementModal);
const UsersManagement = props => {
	const [state, setstate] = useState({ status: true, keyword: '', UserItem: '' });
	useEffect(() => {
		props.getUserList();
	}, []);

	const handleOnchange = event => {
		let { value } = event.target;
		setstate({
			status: true,
			keyword: value,
		});
	};

	const renderUserManagementHTML = () => {
		let { userList } = props;
		userList = userList.filter(item => {
			return item.taiKhoan.toLowerCase().indexOf(state.keyword.toLowerCase()) !== -1;
		});
		return userList.map((item, index) => {
			return (
				<tr key={index}>
					<td>{index + 1}</td>
					<td>{item.taiKhoan}</td>
					<td>
						<NavLink
							style={{ color: 'white' }}
							className="btn--purple goTodetail"
							to={`/admin/detail-user/${item.taiKhoan}`}
						>
							View Detail
						</NavLink>
					</td>
					<td>{item.hoTen}</td>
					<td>{item.email}</td>
					<td>{item.soDt}</td>
					<td>{item.maLoaiNguoiDung}</td>
					<td className="um-button">
						<button
							className="bttn btn--blue"
							data-toggle="modal"
							data-target="#modelId"
							onClick={() => {
								setstate({
									...state,
									status: false,
								});
								props.GetInfoAccount(item.taiKhoan);
							}}
						>
							<i className="fa fa-edit" aria-hidden="true"></i>
						</button>
						<button
							className="bttn btn--red"
							onClick={() => {
								props.deleteUser(item.taiKhoan);
							}}
						>
							<i className="fa fa-trash" aria-hidden="true"></i>
						</button>
					</td>
				</tr>
			);
		});
	};
	return (
		<Fragment>
			<Loading />
			<section className="user-management">
				<div className="user-management-tittle">
					<h3 className="title">
						<i class="fa fa-users" aria-hidden="true"></i>
						USER MANAGEMENT
					</h3>
				</div>

				<div className="user-management-head">
					<button
						className="btn--green"
						data-toggle="modal"
						data-target="#modelId"
						onClick={() => {
							setstate({
								...state,
								status: true,
							});
						}}
					>
						<i class="fa fa-plus" aria-hidden="true"></i>ADD USER
					</button>
					<input placeholder="Search user" onChange={handleOnchange} />
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th> STT</th>
							<th> TÀI KHOẢN</th>
							<th></th>
							<th> HỌ TÊN</th>
							<th> EMAIL</th>
							<th> SỐ ĐT</th>
							<th> LOẠI</th>
							<th>THAO TÁC</th>
						</tr>
					</thead>
					<tbody>{renderUserManagementHTML()}</tbody>
				</table>
				<FormsModal nameForm={state.status ? 'THEM_NGUOI_DUNG' : 'SUA_NGUOI_DUNG'} />
			</section>
		</Fragment>
	);
};
const mapDispatchToProps = dispatch => {
	return {
		getUserList: () => {
			dispatch(actions.actGetListUserAPI());
		},
		deleteUser: data => {
			dispatch(actions.actDeleteUserAPI(data));
		},
		GetInfoAccount: data => {
			dispatch(actions.actGetInfoAccountAdmin(data));
		},
	};
};
const mapStateToProps = state => {
	return {
		userList: state.NguoiDungReducer.userList,
		accountInfo: state.NguoiDungReducer.accountInfo,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
