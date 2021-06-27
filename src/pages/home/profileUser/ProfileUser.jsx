import React, { Component, Fragment } from "react";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import AccountInfo from "./AccountInfo";
import CourseAttended from "./CourseAttended";
import CourseAccepted from "./CourseAccepted";
import Loading from "../../../components/Loading";
import Swal from "sweetalert2";
class ProfileUser extends Component {
  componentDidMount() {
    if (localStorage.getItem("user")) {
      this.props.getInfoAccount();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>VUI LÒNG ĐĂNG NHẬP</b>`,
        showConfirmButton: false,
        timer: 1000,
      }).then(() => this.props.propsCompnent.history.push("/"));
    }
  }
  render() {
    let { accountInfo } = this.props;
    return (
      <Fragment>
        <Loading />
        <section className="profileUser">
          <div className="wrap-profileUser">
            <div
              className="bg-profile"
              style={{ backgroundImage: "url('../../img/profile.jpg')" }}
            ></div>
            <div className="row m-0 all-table">
              <div className="col-3 profile-nav ">
                <div className="profile-navigation-bar">
                  <div className="border-avatar">
                    <div className="profile-avatar">
                      <img src="http://bootdey.com/img/Content/User_for_snippets.png" />
                    </div>
                    <p className="user-name">{accountInfo.hoTen}</p>
                    <div className="bottom-line"></div>
                  </div>

                  {/* Nav tabs */}
                  <ul className="nav nav-tabs container profile-list-menu">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-toggle="tab"
                        href="#home"
                      >
                        Thông tin tài khoản
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu1">
                        Khóa học ghi danh
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#menu2">
                        Khóa học của tôi
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-9 profile-infomation-table">
                <div className="profile-table-menu">
                  {/* Tab panes */}
                  <div className="tab-content">
                    <div className="tab-pane container active" id="home">
                      <div className="Table-header">
                        <h3>Thông tin tài khoản</h3>
                        <p>Xem thông tin hoặc chỉnh sửa thông tin của bạn</p>
                        <div className="bottom-line"></div>
                      </div>
                      <div className="Table-Content">
                        {accountInfo ? (
                          <AccountInfo accountInfo={accountInfo} />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="tab-pane container fade" id="menu1">
                      <div className="Table-header">
                        <h3>Khóa học đã ghi danh</h3>
                        <p>Thông tin về khóa học bạn đã ghi danh</p>
                        <div className="bottom-line"></div>
                      </div>
                      <div className="Table-Content">
                        {accountInfo ? (
                          <CourseAttended accountInfo={accountInfo} />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="tab-pane container fade" id="menu2">
                      <div className="Table-header">
                        <h3>Khóa học của tôi</h3>
                        <p>Thông tin về khóa học bạn đã được xét duyệt</p>
                        <div className="bottom-line"></div>
                      </div>
                      <div className="Table-Content">
                        {accountInfo.taiKhoan ? (
                          <CourseAccepted accountInfo={accountInfo.taiKhoan} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoAccount: () => {
      dispatch(actions.actGetInfoAccount());
    },
  };
};
const mapStateToProps = (state) => {
  return {
    accountInfo: state.NguoiDungReducer.accountInfo,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
