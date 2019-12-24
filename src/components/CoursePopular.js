import React, { Component } from 'react';
import ItemCourse from './ItemCourse';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/index';
import OwlCarousel from 'react-owl-carousel';
class CoursePopular extends Component {
	componentDidMount() {
		this.props.getListCourse();
		this.props.getInfoAccount();
	}
	renderPopularCourse = () => {
		let { listCourse, accountInfo } = this.props;
		return listCourse.map((item, index) => {
			return (
				<div className="item" key={index}>
					<ItemCourse
						course={item}
						id={index}
						courseOfUser={accountInfo ? accountInfo.chiTietKhoaHocGhiDanh : ''}
					/>
				</div>
			);
		});
	};
	render() {
		return (
			<section className="list-course-popular">
				<h1 className="title">CÓ THỂ BẠN QUAN TÂM</h1>

				<OwlCarousel
					className="owl-theme"
					loop={false}
					margin={5}
					items={5}

					slideBy={4}
					nav
					responsiveClass
					responsive={{
						0: {
							items: 1,
							slideBy: 1,
							dots: false
						},
						600: {
							items: 2,
							slideBy: 2,
							dots: false
						},
						992: {
							items: 5,
							slideBy: 5
						}
					}}

					key={this.props.listCourse.length}
				>
					{this.renderPopularCourse()}
				</OwlCarousel>
			</section>
		);
	}
}
const mapStateToProps = state => {
	return {
		listCourse: state.khoaHocReducer.listCourse,
		accountInfo: state.NguoiDungReducer.accountInfo,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getListCourse: () => {
			dispatch(actions.actGetListCourseAPI());
		},
		getInfoAccount: () => {
			dispatch(actions.actGetInfoAccount());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(CoursePopular);
