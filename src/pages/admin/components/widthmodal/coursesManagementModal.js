import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import classnames from 'classnames';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
class coursesManagementModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			values: {
				maKhoaHoc: '',
				biDanh: '',
				tenKhoaHoc: '',
				moTa: '',
				luotXem: 0,
				danhGia: 0,
				hinhAnh: '',
				maDanhMucKhoaHoc: '',
			},
			errors: {
				maKhoaHoc: '',
				biDanh: '',
				tenKhoaHoc: '',
				moTa: '',
			},
			valids: {
				maKhoaHoc: false,
				biDanh: false,
				tenKhoaHoc: false,
				moTa: false,
				form: false,
			},
			whenSubmit: false,
		};
	}
	componentDidMount() {
		this.props.getCategoryCourse();
		$(document).ready(() => {
			$('#modelId').on('hide.bs.modal', () => {
				this.checkPrompt();
			});
		});
	}
	componentDidUpdate(nextProps) {
		const { editCourse } = this.props;
		if (nextProps.editCourse !== editCourse) {
			if (editCourse) {
				this.setState({
					values: {
						...this.state.values,
						maKhoaHoc: this.props.editCourse.maKhoaHoc,
						biDanh: this.props.editCourse.biDanh,
						tenKhoaHoc: this.props.editCourse.tenKhoaHoc,
						moTa: this.props.editCourse.moTa,
						luotXem: 0,
						danhGia: 0,
						hinhAnh: this.props.editCourse.hinhAnh,
						maDanhMucKhoaHoc: this.props.editCourse.danhMucKhoaHoc
							? this.props.editCourse.danhMucKhoaHoc.maDanhMucKhoahoc
							: '',
					},
					valids: {
						maKhoaHoc: true,
						biDanh: true,
						tenKhoaHoc: true,
						moTa: true,
						form: true,
					},
				});
			} else {
				this.setState({
					values: {
						...this.state.values,
						maKhoaHoc: '',
						biDanh: '',
						tenKhoaHoc: '',
						moTa: '',
						luotXem: 0,
						danhGia: 0,
						hinhAnh: '',
						maDanhMucKhoaHoc: '',
					},
					valids: {
						maKhoaHoc: false,
						biDanh: false,
						tenKhoaHoc: false,
						moTa: false,
						form: false,
					},
				});
			}
		}
	}
	handleNameForm = () => {
		let nameForm = '';
		switch (this.props.nameForm) {
			case 'THEM_KHOA_HOC':
				nameForm = 'Thêm khóa học';
				break;
			case 'SUA_KHOA_HOC':
				nameForm = 'Sửa khóa học';
				break;
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
	renderHTMLDanhMucKhoaHoc = () => {
		return this.props.danhMucKhoaHoc.map((item, index) => {
			return (
				<option key={index} value={item.maDanhMuc}>
					{item.tenDanhMuc}
				</option>
			);
		});
	};
	handleOnChange = e => {
		let { name, value } = e.target;
		this.setState({
			values: { ...this.state.values, [name]: value },
		});
	};
	handleErrors = e => {
		let { name, value, placeholder } = e.target;
		let { errors, valids } = this.state;
		let isValid = false;
		let massage = value === '' ? placeholder + ' không được rỗng' : '';
		isValid = massage !== '' ? false : true;
		if (value !== '') {
			switch (name) {
				case 'maKhoaHoc':
					if (!value.match('^[a-z0-9_-]{3,16}$')) {
						isValid = false;
						massage = placeholder + ' không đúng định dạng.';
					}
					break;
				case 'tenKhoaHoc' || 'biDanh':
					if (
						!value.match(
							'^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
							'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
							'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$'
						)
					) {
						isValid = false;
						massage = placeholder + ' không đúng định dạng.';
					}
					break;
				default:
					break;
			}
		}

		this.setState(
			{
				errors: { ...errors, [name]: massage },
				valids: { ...valids, [name]: isValid },
			},
			() => {
				this.formValidation();
			}
		);
	};
	formValidation = () => {
		let { valids } = this.state;
		this.setState({
			valids: {
				...valids,
				form: valids.maKhoaHoc && valids.biDanh && valids.tenKhoaHoc && valids.moTa,
			},
		});
	};
	handleOnSubmit = e => {
		e.preventDefault();
		if (this.state.valids.form) {
			this.setState({
				whenSubmit: true,
			});
			this.props.onSubmit(this.state.values, this.props.nameForm);
		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Vui lòng kiểm tra thông tin!',
			});
		}
	};
	checkPrompt = () => {
		if (
			(!!this.state.values.maKhoaHoc ||
				!!this.state.values.biDanh ||
				!!this.state.values.tenKhoaHoc ||
				!!this.state.values.moTa ||
				!!this.state.values.hinhAnh ||
				!!this.state.values.maDanhMucKhoaHoc) &&
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
		let { editCourse } = this.props;
		let { errors, values } = this.state;
		return (
			<Fragment>
				<form onSubmit={this.handleOnSubmit}>
					<div className="modal-body">
						<div className="cm-modal">
							<div className="cm-modal-content-left">
								<div
									className={classnames('form-group', {
										'd-none': editCourse,
									})}
								>
									<label tmlFor="maKhoaHoc">Mã khóa học </label>
									<input
										onBlur={this.handleErrors}
										onKeyUp={this.handleErrors}
										onChange={this.handleOnChange}
										type="text"
										id="maKhoaHoc"
										name="maKhoaHoc"
										className="form-control"
										aria-describedby="helpId"
										value={this.state.values.maKhoaHoc}
										placeholder="Mã khóa học"
									/>
									{errors.maKhoaHoc !== '' ? (
										<div className="massage-error">{errors.maKhoaHoc}</div>
									) : (
										<div className="massage-error-hide">massage-error-hide</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="biDanh">Bí danh </label>
									<input
										onBlur={this.handleErrors}
										onKeyUp={this.handleErrors}
										onChange={this.handleOnChange}
										type="text"
										id="biDanh"
										name="biDanh"
										className="form-control"
										aria-describedby="helpId"
										value={this.state.values.biDanh}
										placeholder="Bí danh"
									/>
									{errors.biDanh !== '' ? (
										<div className="massage-error">{errors.biDanh}</div>
									) : (
										<div className="massage-error-hide">massage-error-hide</div>
									)}
								</div>
								<div className="form-group">
									<label htmlFor="tenKhoaHoc">Tên khóa học</label>
									<input
										onBlur={this.handleErrors}
										onKeyUp={this.handleErrors}
										onChange={this.handleOnChange}
										type="text"
										id="tenKhoaHoc"
										name="tenKhoaHoc"
										className="form-control"
										aria-describedby="helpId"
										value={this.state.values.tenKhoaHoc}
										placeholder="Tên khóa học"
									/>
									{errors.tenKhoaHoc !== '' ? (
										<div className="massage-error">{errors.tenKhoaHoc}</div>
									) : (
										<div className="massage-error-hide">massage-error-hide</div>
									)}
								</div>
							</div>
							<div className="cm-modal-content-right">
								<div className="form-group">
									<label htmlFor="danhMucKhoaHoc">Danh mục khóa học</label>
									<select
										id="danhMucKhoaHoc"
										className="form-control"
										name="maDanhMucKhoaHoc"
										onChange={this.handleOnChange}
										onBlur={this.handleErrors}
										value={values.maDanhMucKhoaHoc}
									>
										<option>Vui lòng chọn danh mục</option>
										{this.renderHTMLDanhMucKhoaHoc(editCourse)}
									</select>
									<div className="massage-error-hide">massage-error-hide</div>
								</div>
								<div className="form-group">
									<label htmlFor="luotXem">Lượt xem</label>
									<input
										onBlur={this.handleErrors}
										onKeyUp={this.handleErrors}
										onChange={this.handleOnChange}
										type="number"
										id="luotXem"
										name="luotXem"
										className="form-control"
										aria-describedby="helpId"
										value={values.luotXem}
									/>
									<div className="massage-error-hide">massage-error-hide</div>
								</div>
								<div
									className={classnames('form-group', {
										'd-none': editCourse,
									})}
								>
									<label htmlFor="danhGia">Đánh giá</label>
									<input
										onBlur={this.handleErrors}
										onKeyUp={this.handleErrors}
										onChange={this.handleOnChange}
										type="number"
										id="danhGia"
										name="danhGia"
										className="form-control"
										aria-describedby="helpId"
										value={values.danhGia}
									/>
									<div className="massage-error-hide">massage-error-hide</div>
								</div>
							</div>
							<div className="cm-modal-content-bottom">
								<div className="form-group">
									<label htmlFor="hinhAnh" className="btn--black">
										Chọn hình ảnh cho khóa học
									</label>
									<input
										onBlur={this.handleErrors}
										onChange={this.handleOnChange}
										name="hinhAnh"
										id="hinhAnh"
										type="file"
										accept=".gif,.jpg,.jpeg,.png"
										style={{ display: 'none' }}
									/>
								</div>
								<label htmlFor="moTa">Mô tả</label>
								<textarea
									name="moTa"
									className="form-control"
									aria-describedby="helpId"
									onChange={this.handleOnChange}
									value={values.moTa}
									onBlur={this.handleErrors}
									onKeyUp={this.handleErrors}
									placeholder="Mô tả"
								/>
								{errors.moTa !== '' ? (
									<div className="massage-error">{errors.moTa}</div>
								) : (
									<div className="massage-error-hide">massage-error-hide</div>
								)}
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<button type="submit" className="btn btn-primary">
							{this.handleNameForm()}
						</button>
						<button type="button" className="btn btn-secondary" data-dismiss="modal">
							Close
						</button>
					</div>
				</form>
			</Fragment>
		);
	}
}
const mapStateToProps = state => {
	return {
		danhMucKhoaHoc: state.khoaHocReducer.listCategoryCourse,
		editCourse: state.khoaHocReducer.editCourse,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		onSubmit: (data, nameForm) => {
			switch (nameForm) {
				case 'THEM_KHOA_HOC':
					dispatch(actions.actAddNewCourse(data));
					break;
				case 'SUA_KHOA_HOC':
					dispatch(actions.actUpdateCourse(data));
					break;
				case 'THEM_NGUOI_DUNG':
					dispatch(actions.actGetListCourseAPI());
					break;
				case 'SUA_NGUOI_DUNG':
					dispatch(actions.actGetListCourseAPI());
					break;
				default:
					break;
			}
		},
		getCategoryCourse: () => {
			dispatch(actions.actGetCategoryCourseAPI());
		},
		onEdit: () => {
			dispatch(actions.actEditCourse(''));
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(coursesManagementModal);
