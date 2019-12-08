import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import widthmodal from '../../components/widthmodal/widthmodal';
import coursesManagementModal from '../../components/widthmodal/coursesManagementModal';
import { NavLink } from 'react-router-dom';
import Loading from '../../../../components/Loading';
import Swal from 'sweetalert2';
const FormModal = widthmodal(coursesManagementModal);
const CoursesManagement = props => {
	const [state, setstate] = useState({ keyword: '', status: true });
	useEffect(() => {
		props.getListCourse();
	}, []);
	let { listCourse } = props;
	const handleSearch = event => {
		let { value } = event.target;
		let keyword = value;
		setstate({
			keyword,
			status: true,
		});
	};
	const renderListCourse = () => {
		return listCourse
			.filter(item => {
				return item.tenKhoaHoc.toLowerCase().indexOf(state.keyword.toLowerCase()) !== -1;
			})
			.map((item, index) => {
				return (
					<tr key={index}>
						<td>{index + 1}</td>
						<td>
							<div className="cm-name">
								<img src={item.hinhAnh} alt={item.tenKhoaHoc} />
								<div>
									<p>{item.tenKhoaHoc}</p>
									<p className="cm-category">{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
									<NavLink className="btn--purple" to={`/admin/detail-course/${item.maKhoaHoc}`}>
										VIEW DETAIL
									</NavLink>
								</div>
							</div>
						</td>
						<td>
							<div className="cm-creator">
								<p>{item.nguoiTao.taiKhoan}</p>
								<p className="cm-type-creator">{item.nguoiTao.tenLoaiNguoiDung}</p>
							</div>
						</td>
						<td>{item.ngayTao}</td>
						<td>
							<div className="cm-actions">
								<button
									className="bttn btn--blue"
									data-toggle="modal"
									data-target="#modelId"
									onClick={() => {
										setstate({ ...state, status: false });
										props.onEdit(item);
									}}
								>
									<i class="fa fa-edit"></i>
								</button>
								<button
									className="bttn btn--red"
									onClick={() => {
										Swal.fire({
											position: 'center',
											icon: 'success',
											icon: 'warning',
											html: `<h3 style="color:#f8bb86"><b>WARNING!</b></h3><b>Bạn có muốn xóa khóa học này không?</b>`,
											showCancelButton: true,
											confirmButtonColor: '#d33',
											cancelButtonColor: '#3085d6',
											confirmButtonText: 'Đồng ý',
											cancelButtonText: 'Hủy',
											reverseButtons: true,
										}).then(rs => {
											if (rs.value) {
												props.onDelete(item.maKhoaHoc);
											}
										});
									}}
								>
									<i class="fa fa-trash "></i>
								</button>
							</div>
						</td>
					</tr>
				);
			});
	};
	return (
		<Fragment>
			<Loading />
			<section className="course-management">
				<h3 className="title">
					<i class="fa fa-book" aria-hidden="true"></i> COURSES MANAGEMENT
				</h3>
				<div className="cm-head">
					<button
						className="btn--green"
						data-toggle="modal"
						data-target="#modelId"
						onClick={() => {
							setstate({ ...state, status: true });
							props.onEdit('');
						}}
					>
						<i class="fa fa-plus" aria-hidden="true"></i>ADD COURSE
					</button>
					<input
						placeholder="Search course"
						onChange={event => {
							handleSearch(event);
						}}
					/>
				</div>
				<table className="table table-striped">
					<thead>
						<tr>
							<th>STT</th>
							<th>TÊN KHÓA HỌC</th>
							<th>NGƯỜI TẠO</th>
							<th>NGÀY TẠO</th>
							<th>THAO TÁC</th>
						</tr>
					</thead>
					<tbody>{listCourse ? renderListCourse() : ''}</tbody>
				</table>
				<FormModal nameForm={state.status ? 'THEM_KHOA_HOC' : 'SUA_KHOA_HOC'} />
			</section>
		</Fragment>
	);
};

const mapStateToProps = state => {
	return {
		listCourse: state.khoaHocReducer.listCourse,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getListCourse: () => {
			dispatch(actions.actGetListCourseAPI());
		},
		onDelete: maKhoaHoc => {
			dispatch(actions.actDeleteCourseApi(maKhoaHoc));
		},
		onEdit: data => {
			dispatch(actions.actEditCourse(data));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesManagement);
