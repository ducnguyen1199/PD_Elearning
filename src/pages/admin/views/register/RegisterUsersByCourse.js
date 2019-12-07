import React, { useEffect, Fragment } from 'react';
import UsersAreWaiting from './components/UsersAreWaiting';
import UsersHasRegistered from './components/UsersHasRegistered';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import Loading from '../../../../components/Loading';
const RegisterUsersByCourse = props => {
	useEffect(() => {
		const id = props.propsComponent.match.params.id;
		props.getListUserRegister(id);
		props.getListUserWaiting(id);
	}, []);
	return (
		<Fragment>
			<Loading />
			<section className="register-users">
				<h3 className="title">
					<i className="fa fa-edit" aria-hidden="true"></i> REGISTER USERS BY COURSE
				</h3>
				<ul className="nav nav-tabs admin-tabs" id="myTab" role="tablist">
					<li className="nav-item">
						<a
							className="nav-link active"
							id="register-user-1-tab"
							data-toggle="tab"
							href="#register-user-1"
							role="tab"
							aria-controls="register-user-1"
							aria-selected="true"
						>
							HỌC VIÊN ĐANG CHỜ GHI DANH
						</a>
					</li>
					<li className="nav-item">
						<a
							className="nav-link"
							id="register-user-2-tab"
							data-toggle="tab"
							href="#register-user-2"
							role="tab"
							aria-controls="register-user-2"
							aria-selected="false"
						>
							HỌC VIÊN ĐÃ GHI DANH
						</a>
					</li>
				</ul>

				<div className="tab-content" id="myTabContent">
					<div
						className="tab-pane fade show active"
						id="register-user-1"
						role="tabpanel"
						aria-labelledby="register-user-1-tab"
					>
						<UsersAreWaiting maKhoaHoc={props.propsComponent.match.params.id} />
					</div>
					<div
						className="tab-pane fade"
						id="register-user-2"
						role="tabpanel"
						aria-labelledby="register-user-2-tab"
					>
						<UsersHasRegistered />
					</div>
				</div>
			</section>
		</Fragment>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		getListUserRegister: maKhoaHoc => {
			dispatch(actions.actGetListUserRegisterApi(maKhoaHoc));
		},
		getListUserWaiting: maKhoaHoc => {
			dispatch(actions.actGetListUserWaitingApi(maKhoaHoc));
		},
	};
};
export default connect(null, mapDispatchToProps)(RegisterUsersByCourse);
