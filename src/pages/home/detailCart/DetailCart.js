import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import BillCart from './views/BillCart';
import ItemCourseOfUser from '../../../components/ItemCourseOfUser';
import CoursePopular from '../../../components/CoursePopular';
import Loading from '../../../components/Loading';
import { NavLink } from 'react-router-dom';
class DetailCart extends Component {
	componentDidMount() {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}
	renderListCart = () => {
		return this.props.listCart.map((item, index) => {
			return <ItemCourseOfUser key={index} course={item.course} />;
		});
	};
	render() {
		return (
			<Fragment>
				<Loading />
				<section className="detail-cart">
					<div className="wrap-head">
						<div
							className=" header-head"
							style={{
								backgroundImage: "url('../../img/13.jpg')",
							}}
						>
							<div className="overflow" style={{ backgroundImage: "url('../../img/bg-2.png')" }}></div>
							<div className="title detail-course">
								<span>THÔNG TIN GIỎ HÀNG</span>
								<h4>
									<NavLink to="/home">Trang chủ</NavLink> / <span>Thông tin giỏ hàng</span>
								</h4>
							</div>
						</div>
					</div>
					<div className="row justify-content-around">
						<div className="list-cart col-12 col-lg-8">
							<div className="content">
								<div className="header-list-cart">
									<p>KHÓA HỌC</p>
									<p>GIÁ TRỊ</p>
								</div>
								<div className="mct-list-cart">
									{this.props.listCart == 0 ? (
										<div className="no-course">KHÔNG CÓ KHÓA HỌC NÀO TRONG GIỎ HÀNG</div>
									) : (
										this.renderListCart()
									)}
								</div>
							</div>
						</div>
						<div className="bill col-lg-4 col-11">
							<BillCart
								listCart={this.props.listCart}
								giamGia={this.props.giamGia}
								history={this.props.propsCompnent.history}
							/>
						</div>
					</div>
				</section>
				<CoursePopular />
			</Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		listCart: state.GioHangReducer.listCart,
		giamGia: state.GioHangReducer.giamGia,
	};
};

export default connect(mapStateToProps, null)(DetailCart);
