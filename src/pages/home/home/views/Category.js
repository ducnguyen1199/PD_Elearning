import React, { Component } from 'react';
import ItemCategory from '../components/ItemCategory';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions/index';
import AOS from 'aos';
class Category extends Component {
	componentDidMount() {
		this.props.getListCategory();
		AOS.init();
	}
	renderCategoryHTML = () => {
		if (this.props.listCategory.length) {
			return this.props.listCategory.map((item, index) => (
				<ItemCategory key={index} hinhAnh={index + 1} category={item} />
			));
		}
	};
	render() {
		return (
			<section className="category ">
				<div className="wallpaper">
					<img src="./img/bg-3.png" />
				</div>

				<h3 className="title" data-aos="fade-down" data-aos-duration="1300">
					Our category
				</h3>
				<div className="container">
					<div className="row" data-aos="fade-right" data-aos-duration="1000">
						{this.renderCategoryHTML()}
					</div>
				</div>
			</section>
		);
	}
}
const mapStateToProps = state => {
	return {
		listCategory: state.khoaHocReducer.listCategoryCourse,
	};
};
const mapDispatchToProps = dispatch => {
	return {
		getListCategory: () => {
			dispatch(actions.actGetCategoryCourseAPI());
		},
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
