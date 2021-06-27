import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
class userManagementModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			taiKhoan: '',
			matKhau: '',
			hoTen: '',
			soDT: '',
			maLoaiNguoiDung: '',
			maNhom: 'GP01',
			email: '',
			whenSubmit: false,
		};
	}
	componentDidMount() {
		$(document).ready(() => {
			$('#modelId').on('hide.bs.modal', () => {
				this.checkPrompt();
			});
		});
	}
	componentDidUpdate(nextProps) {
		if (nextProps.accountInfo !== this.props.accountInfo || nextProps.nameForm !== this.props.nameForm) {
			if (this.props.nameForm === 'THEM_NGUOI_DUNG') {
				this.setState({
					taiKhoan: '',
					matKhau: '',
					hoTen: '',
					soDT: '',
					maLoaiNguoiDung: '',
					maNhom: 'GP01',
					email: '',
				});
			} else {
				this.setState({
					taiKhoan: this.props.accountInfo.taiKhoan,
					matKhau: this.props.accountInfo.matKhau,
					hoTen: this.props.accountInfo.hoTen,
					soDT: this.props.accountInfo.soDT,
					maLoaiNguoiDung: this.props.accountInfo.maLoaiNguoiDung,
					maNhom: 'GP01',
					email: this.props.accountInfo.email,
				});
			}
		}
	}
	handleOnChange = e => {
		let { name, value } = e.target;
		this.setState({
			...this.state,
			[name]: value,
		});
	};
	handleNameForm = () => {
		let nameForm = '';
		switch (this.props.nameForm) {
			case 'THEM_NGUOI_DUNG':
				nameForm = 'Thêm người dùng';
				break;
			case 'SUA_NGUOI_DUNG':
				nameForm = 'Sửa người dùng';
				break;
			default:
				break;
		}
		return nameForm;
	};
	checkPrompt = () => {
		if (
			(!!this.state.taiKhoan ||
				!!this.state.matKhau ||
				!!this.state.hoTen ||
				!!this.state.soDT ||
				!!this.state.email ||
				!!this.state.maLoaiNguoiDung) &&
			!this.state.whenSubmit
		) {
			Swal.fire({
				position: 'center',
				icon: 'success',
				icon: 'warning',
				html: `<h3 style="color:#f8bb86"><b>WARNING!</b></h3><b>Bạn có muốn điền tiếp thông tin còn đang dở dang không?</b>`,
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Đồng ý',
				cancelButtonText: 'Hủy',
				reverseButtons: true,
			}).then(rs => {
				if (rs.value) {
					$('#modelId').modal('show');
				}
			});
		}
	};
	render() {
		return (
			<Fragment>
				<div className="modal-body um-modal">
					<div className="um-modal-content-left">
						<div className="form-group">
							<label htmlFor="">Tài khoản </label>
							<input
								type="text"
								name="taiKhoan"
								className="form-control"
								aria-describedby="helpId"
								onChange={this.handleOnChange}
								value={this.state.taiKhoan}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="">Mật khẩu </label>
							<input
								type="text"
								name="matKhau"
								className="form-control"
								aria-describedby="helpId"
								onChange={this.handleOnChange}
								value={this.state.matKhau}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="">Họ tên </label>
							<input
								type="text"
								name="hoTen"
								className="form-control"
								aria-describedby="helpId"
								onChange={this.handleOnChange}
								value={this.state.hoTen}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="">Số điện thoại </label>
							<input
								type="number"
								name="soDT"
								className="form-control"
								aria-describedby="helpId"
								onChange={this.handleOnChange}
								value={this.state.soDT}
							/>
						</div>
					</div>
					<div className="um-modal-content-right">
						<div className="form-group">
							<label htmlFor="">Mã loại người dùng </label>
							<select
								className="form-control"
								name="maLoaiNguoiDung"
								onChange={this.handleOnChange}
								value={this.state.maLoaiNguoiDung}
							>
								<option>Vui lòng chọn</option>
								<option>HV</option>
								<option>GV</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="">Mã nhóm </label>
							<select
								className="form-control"
								name="maNhom"
								onChange={this.handleOnChange}
								value={this.state.maNhom}
							>
								<option>GP01</option>
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="">Email</label>
							<input
								type="text"
								name="email"
								className="form-control"
								aria-describedby="helpId"
								onChange={this.handleOnChange}
								value={this.state.email}
							/>
						</div>
					</div>
				</div>
				<div className="modal-footer">
					<button
						type="button"
						className="btn btn-primary"
						id="editModal"
						onClick={() => {
							this.setState({
								whenSubmit: true,
							});
							this.props.onSubmit(this.state, this.props.nameForm);
						}}
					>
						{this.handleNameForm()}
					</button>
					<button type="button" className="btn btn-secondary" data-dismiss="modal">
						Close
					</button>
				</div>
			</Fragment>
		);
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onSubmit: (data, nameForm) => {
			switch (nameForm) {
				case 'THEM_NGUOI_DUNG':
					dispatch(actions.actAddUserAPI(data));
					break;
				case 'SUA_NGUOI_DUNG':
					dispatch(actions.actPUTinfoAccount(data));
					break;
				default:
					break;
			}
		},
	};
};

const mapStateToProps = state => {
	return {
		accountInfo: state.NguoiDungReducer.accountInfo,
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(userManagementModal);
