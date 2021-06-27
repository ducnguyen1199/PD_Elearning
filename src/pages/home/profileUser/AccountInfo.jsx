import React, { Component, Fragment } from "react";
import * as actions from "../../../redux/actions/index";
import { connect } from "react-redux";
import Swal from "sweetalert2";
class AccountInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "",
        maNhom: "",
        email: "",
      },
      errors: {
        taiKhoan: "",
        matKhau: "",
        hoTen: "",
        soDT: "",
        maLoaiNguoiDung: "",
        maNhom: "",
        email: "",
      },
      valids: {
        taiKhoan: false,
        matKhau: false,
        hoTen: false,
        soDT: false,
        maLoaiNguoiDung: false,
        maNhom: false,
        email: false,
        form: false,
      },
      statusSave: false,
      statusFromAPI: false,
    };
  }
  componentDidUpdate(nextProps) {
    let { accountInfo } = this.props;
    if (accountInfo !== nextProps.accountInfo) {
      this.setState({
        values: {
          taiKhoan: accountInfo.taiKhoan,
          matKhau: accountInfo.matKhau,
          hoTen: accountInfo.hoTen,
          soDT: accountInfo.soDT,
          maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
          maNhom: accountInfo.maNhom,
          email: accountInfo.email,
        },
        statusFromAPI: JSON.parse(localStorage.getItem("isPutSuccess")),
      });
    }
  }
  handleOnEdit = () => {
    let a = document.getElementsByClassName("form-control");
    for (let i = 1; i < a.length; i++) {
      a[i].removeAttribute("disabled");
    }

    this.setState({
      statusSave: true,
      statusFromAPI: false,
      valids: {
        taiKhoan: true,
        matKhau: true,
        hoTen: true,
        soDT: true,
        maLoaiNguoiDung: true,
        maNhom: true,
        email: true,
        form: true,
      },
    });
  };
  handleOnChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      values: { ...this.state.values, [name]: value },
    });
  };

  handleErrors = (e) => {
    let { name, value, placeholder } = e.target;
    let { errors, valids } = this.state;
    let isValid = false;
    let massage = value === "" ? placeholder + " không được rỗng" : "";
    isValid = massage !== "" ? false : true;
    if (value !== "") {
      switch (name) {
        case "taiKhoan":
          if (value.length < 4 || value.length > 9) {
            isValid = false;
            massage = placeholder + "phải có độ dài từ 4 đến 9 kí tự.";
          } else if (!value.match("^[a-z0-9_-]{3,16}$")) {
            isValid = false;
            massage = placeholder + "không đúng định dạng.";
          }
          break;
        case "matKhau":
          if (value.length < 6 || value.length > 12) {
            isValid = false;
            massage = placeholder + "phải có độ dài từ 6 đến 12 kí tự.";
          } else if (!value.match("^[a-zA-Z0-9]+$")) {
            isValid = false;
            massage = placeholder + "không đúng định dạng.";
          }

          break;
        case "hoTen":
          if (
            !value.match(
              "^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
                "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
                "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
            )
          ) {
            isValid = false;
            massage = placeholder + "không đúng định dạng.";
          }
          break;
        case "soDT":
          if (!value.match("^[0-9]*$")) {
            isValid = false;
            massage = placeholder + "không đúng định dạng.";
          }
          break;
        case "email":
          if (
            !value.match(
              "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" +
                "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$"
            )
          ) {
            isValid = false;
            massage = placeholder + "không đúng định dạng.";
          }
          break;
        default:
          break;
      }
    }

    this.setState(
      {
        errors: { ...errors, [name]: massage },
        valids: { ...valids, [name]: isValid },
      },
      () => {
        this.formValidation();
      }
    );
  };
  formValidation = () => {
    let { valids } = this.state;
    this.setState({
      valids: {
        ...valids,
        form:
          valids.taiKhoan &&
          valids.matKhau &&
          valids.hoTen &&
          valids.soDT &&
          valids.email,
      },
    });
  };
  handleOnSave = () => {
    this.state.valids.form === true
      ? this.props.UpdateUserProfile(this.state.values)
      : Swal.fire({
          position: "center",
          icon: "error",
          html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>VUI LÒNG KIỂM TRA LẠI THÔNG TIN</b>`,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.setState({
            statusSave: true,
          });
        });
  };
  handleOnCancel = () => {
    let accountInfo = this.props.accountInfo;
    this.setState({
      statusSave: false,
      values: {
        taiKhoan: accountInfo.taiKhoan,
        matKhau: accountInfo.matKhau,
        hoTen: accountInfo.hoTen,
        soDT: accountInfo.soDT,
        maLoaiNguoiDung: accountInfo.maLoaiNguoiDung,
        maNhom: accountInfo.maNhom,
        email: accountInfo.email,
      },
    });
    let a = document.getElementsByClassName("form-control");
    for (let i = 1; i < a.length; i++) {
      a[i].setAttribute("disabled", true);
    }
  };
  render() {
    let { errors } = this.state;
    return (
      <Fragment>
        <form className="AccountInfo">
          <div className="form-group">
            <label>Tên tài khoản </label>
            <input
              type="text"
              name="taiKhoan"
              className="form-control effect-7"
              placeholder="Tên tài khoản "
              aria-describedby="helpId"
              value={this.state.values.taiKhoan}
              onChange={this.handleOnChange}
              disabled
            />
          </div>
          <input type="password" className="form-control d-none" />
          <div className="form-group">
            <label>Mật khẩu </label>
            <input
              type="password"
              name="matKhau"
              className="form-control"
              placeholder="Mật Khẩu "
              aria-describedby="helpId"
              value={this.state.values.matKhau}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />

            {errors.matKhau !== "" ? (
              <div className="massage-error">{errors.matKhau}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Tên người dùng </label>
            <input
              type="text"
              name="hoTen"
              className="form-control"
              placeholder="Tên người dùng "
              aria-describedby="helpId"
              value={this.state.values.hoTen}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />
            {errors.hoTen !== "" ? (
              <div className="massage-error">{errors.hoTen}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Số điện thoại </label>
            <input
              type="text"
              name="soDT"
              className="form-control"
              placeholder="Số điện thoại "
              aria-describedby="helpId"
              value={this.state.values.soDT}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />
            {errors.soDT !== "" ? (
              <div className="massage-error">{errors.soDT}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label>Email </label>
            <input
              type="text"
              name="email"
              className="form-control"
              placeholder="Email "
              aria-describedby="helpId"
              value={this.state.values.email}
              onChange={this.handleOnChange}
              onBlur={this.handleErrors}
              onKeyUp={this.handleErrors}
              disabled
            />
            {errors.email !== "" ? (
              <div className="massage-error">{errors.email}</div>
            ) : (
              ""
            )}
          </div>
        </form>
        <div className="button">
          {this.state.statusSave === true &&
          this.state.statusFromAPI === false ? (
            <div>
              <button className="btn--red mr-1" onClick={this.handleOnCancel}>
                Hủy thay đổi
              </button>
              <button className="btn--purple" onClick={this.handleOnSave}>
                Lưu thay đổi
              </button>
            </div>
          ) : (
            <button className="btn--blue" onClick={this.handleOnEdit}>
              Sửa thông tin
            </button>
          )}
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateUserProfile: (data) => {
      dispatch(actions.actPUTinfoAccount(data));
    },
  };
};
const mapStateToProps = (state) => {
  return {
    dataAccount: state.NguoiDungReducer.accountInfo,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
