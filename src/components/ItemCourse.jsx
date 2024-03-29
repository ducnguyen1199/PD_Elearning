import React, { Component, Fragment } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions/index";
import { UncontrolledPopover, PopoverBody, PopoverHeader } from "reactstrap";
import $ from "jquery";
import { withRouter } from "react-router-dom";
class ItemCourse extends Component {
  goTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  renderAddToCart = () => {
    return this.props.listCart.findIndex((item) => {
      return item.maKhoaHoc === this.props.course.maKhoaHoc;
    }) === -1 ? (
      <button
        className="btn--blue btnn"
        onClick={() => {
          this.props.addToCart(this.props.course);
        }}
      >
        THÊM GIỎ HÀNG
      </button>
    ) : (
      <NavLink className="btn--purple btnn" to="/home/detail-cart">
        TỚI GIỎ HÀNG
      </NavLink>
    );
  };
  handleAddToCart = () => {
    return this.props.courseOfUser ? (
      this.props.courseOfUser.findIndex((item) => {
        return item.maKhoaHoc === this.props.course.maKhoaHoc;
      }) === -1 ? (
        this.renderAddToCart()
      ) : (
        <NavLink
          className="btn--purple btnn"
          to="/home/profile"
          onClick={this.goTop}
        >
          TỚI HỒ SƠ
        </NavLink>
      )
    ) : (
      this.renderAddToCart()
    );
  };

  renderPopover = () => {
    let { course } = this.props;
    return (
      <Fragment>
        <UncontrolledPopover
          trigger="hover"
          placement="right"
          target={"Popover-" + this.props.id}
        >
          <PopoverBody>
            <div className="course-info">
              <div className="course-infomation">
                <p className="text-sm">Ngày khởi tạo: {course.ngayTao}</p>
                <h3 className="course-name">{course.tenKhoaHoc}</h3>
                <p className="text-sm">
                  {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
                </p>
                <span className="more-infomation">
                  <i className="fa fa-eye"></i> {course.luotXem} |{" "}
                  <i className="fa fa-mortar-board"></i>
                  {course.soLuongHocVien} | <i className="fa fa-heart"></i> 99
                </span>
                <p className="course-description">{course.moTa}</p>
                <div className="detail-course">
                  <NavLink
                    className="btn--black"
                    to={`/home/detail-course/${course.maKhoaHoc}?price=${course.fee}`}
                    onClick={() => {
                      this.props.getDataDetailCourse(course.maKhoaHoc);
                    }}
                  >
                    Chi Tiết
                  </NavLink>
                  {this.handleAddToCart()}
                </div>
              </div>
            </div>
          </PopoverBody>
        </UncontrolledPopover>
      </Fragment>
    );
  };
  render() {
    let { course } = this.props;
    return (
      <div id={"Popover-" + this.props.id} className="ItemCourses">
        <div className="allCourse-item ">
          <div
            className="image"
            onClick={() => {
              if (window.innerWidth < 768) {
                this.props.history.push(
                  `/home/detail-course/${course.maKhoaHoc}?${course.fee}`
                );
              }
            }}
          >
            <div className="wrap-img">
              <div
                className="wrap-image-IC"
                style={{ backgroundImage: `url(${course.hinhAnh})` }}
              ></div>
            </div>
            <div className="teacher-img">
              <div className="row m-0 align-center">
                <div className="col-3 left-side ">
                  <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" />
                  <div className="teacher-name">
                    <span> {course ? course.nguoiTao.hoTen : null} </span>
                  </div>
                </div>
                <div className="col-9 right-side">
                  <div className="course-name">
                    <span>{course.tenKhoaHoc}</span>
                  </div>
                  <div className="more-infomation">
                    <div className="more-info-item">
                      <span>
                        <i className="fa fa-graduation-cap"> </i>{" "}
                        <label>Học viên</label>
                        <p>{course.soLuongHocVien}</p>
                      </span>
                    </div>
                    <div className="more-info-item">
                      <span>
                        <i className="fa fa-eye"></i> <label>Lượt xem </label>
                        <p>{course.luotXem}</p>
                      </span>
                    </div>
                    <div className="more-info-item">
                      <span className="dollar">
                        <i className="fa fa-money"></i> <label>Giá</label>
                        <p>{course.fee}$</p>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.renderPopover()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listCart: state.GioHangReducer.listCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => {
      dispatch(actions.actAddToCart(product));
    },
    getDataDetailCourse: (id) => {
      dispatch(actions.actGetDetailCourseAPI(id));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ItemCourse));
