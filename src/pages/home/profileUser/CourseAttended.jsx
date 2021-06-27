import React, { Component } from "react";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import ItemCourseOfUser from "../../../components/ItemCourseOfUser";
import NoData from "../../../components/NoData/NoData";

class CourseAttended extends Component {
  componentDidMount() {
    let { taiKhoan } = this.props.accountInfo;
    if (taiKhoan) {
      this.props.getListCourseWaiting({ taiKhoan });
    }
    this.props.getListCourse();
  }
  componentDidUpdate(nextProps) {
    let { taiKhoan } = this.props.accountInfo;
    if (taiKhoan !== nextProps.accountInfo.taiKhoan) {
      this.props.getListCourseWaiting({ taiKhoan });
    }
  }
  renderDetailCourseAttended = () => {
    let { listCourseWaiting } = this.props;
    return this.props.listCourse
      .filter(
        (item) =>
          listCourseWaiting.findIndex((i) => i.maKhoaHoc === item.maKhoaHoc) !==
          -1
      )
      .map((item, index) => (
        <ItemCourseOfUser
          key={index}
          course={item}
          accountInfo={this.props.accountInfo}
        />
      ));
  };
  render() {
    return (
      <section className="Course-Attended">
        <div className="list-cart">
          <div className="content">
            <div className="header-list-cart">
              <p>KHÓA HỌC</p>
              <p>GIÁ TRỊ</p>
            </div>
            <div className="mct-list-cart">
              {this.props.listCourseWaiting &&
              this.props.listCourseWaiting.length ? (
                this.renderDetailCourseAttended()
              ) : (
                <NoData message="Bạn chưa có Khóa học nào!" />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListCourseWaiting: (data) => {
      dispatch(actions.actGetCourseWaitingAPI(data));
    },
    getListCourse: () => {
      dispatch(actions.actGetListCourseAPI());
    },
  };
};

const mapStateToProps = (state) => {
  return {
    listCourse: state.khoaHocReducer.listCourse,
    listCourseWaiting: state.NguoiDungReducer.listCourseWaiting,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CourseAttended);
