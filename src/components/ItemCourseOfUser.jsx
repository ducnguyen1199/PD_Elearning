import React, { Component } from "react";
import * as actions from "../redux/actions/index";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import Swal from "sweetalert2";
class ItemCourseOfUser extends Component {
  swalWarning = (warning) => {
    return Swal.fire({
      position: "center",
      icon: "success",
      icon: "warning",
      html: `<h3 style="color:#f8bb86"><b>WARNING!</b></h3><b>${warning}</b>`,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });
  };
  handleOnDelete = () => {
    let { course } = this.props;
    window.location.pathname === "/home/profile"
      ? this.swalWarning("Bạn có muốn hủy ghi danh khóa học này không?").then(
          (rs) => {
            if (rs.value) {
              this.props.cancelAttendCourse({
                maKhoaHoc: course.maKhoaHoc,
                taiKhoan: this.props.accountInfo.taiKhoan,
              });
            }
          }
        )
      : this.swalWarning(
          "Bạn có muốn xóa khóa học này khỏi giỏ hàng không?"
        ).then((rs) => {
          if (rs.value) {
            this.props.deleteIntoCart(course.maKhoaHoc);
          }
        });
  };
  render() {
    let { course } = this.props;
    let { location } = this.props;
    return (
      <section className="item-course-of-user">
        <div className="d-flex justify-content-between align-items-center">
          <div className="content-left d-flex justify-content-start align-items-center">
            <img src={course.hinhAnh} />
            <div className="mct-item-course-of-user">
              <h5>
                <NavLink
                  to={`/home/detail-course/${course.maKhoaHoc}?${course.fee}`}
                >
                  Detail
                </NavLink>
                {course.tenKhoaHoc}
              </h5>
              <p>{course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
            </div>
          </div>
          <div className="content-right d-flex justify-content-end align-items-center">
            <p className="fee">${course.fee}</p>
            <div
              className={classnames("", { invisible: location })}
              onClick={this.handleOnDelete}
            >
              <i className="fa fa-trash"></i>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteIntoCart: (maKhoaHoc) => {
      dispatch(actions.actDeleteIntoCart(maKhoaHoc));
    },
    cancelAttendCourse: (data) => {
      dispatch(actions.actCancelAttendCourseAdmin(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(ItemCourseOfUser);
