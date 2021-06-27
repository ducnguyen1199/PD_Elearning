import React, { Component } from "react";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import ItemCourseOfUser from "../../../components/ItemCourseOfUser";
import NoData from "../../../components/NoData/NoData";
class CourseAccepted extends Component {
  componentDidMount() {
    this.props.getCourseAccepted({ taiKhoan: this.props.accountInfo });
  }
  renderHTML = () => {
    let { listCourseAccepted } = this.props;
    if (listCourseAccepted && listCourseAccepted.length) {
      return this.props.listCourse
        .filter(
          (item) =>
            listCourseAccepted.findIndex(
              (item2) => item.maKhoaHoc === item2.maKhoaHoc
            ) != -1
        )
        .map((item, index) => (
          <ItemCourseOfUser
            course={item}
            key={index}
            location={"courseAccepted"}
          />
        ));
    }

    return <NoData message="Bạn chưa có Khóa học nào!" />;
  };
  render() {
    return (
      <div className="course-accepted">
        <div className="list-cart">
          <div className="content">
            <div className="header-list-cart">
              <p>KHÓA HỌC</p>
              <p>GIÁ TRỊ</p>
            </div>
            <div className="mct-list-cart">{this.renderHTML()}</div>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getCourseAccepted: (data) => {
      dispatch(actions.actGetListCourseAccpetedAPI(data));
    },
    getListCourse: () => {
      dispatch(actions.actGetListCourseAPI());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    listCourseAccepted: state.NguoiDungReducer.listCourseAccepted,
    listCourse: state.khoaHocReducer.listCourse,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseAccepted);
