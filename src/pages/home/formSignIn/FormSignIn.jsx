import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions/index";
import Swal from "sweetalert2";

const FormSignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, setState] = useState({ taiKhoan: "", matKhau: "" });

  const handleOnChange = (e) => {
    let { value, name } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    state.taiKhoan && state.matKhau
      ? dispatch(actions.actSignIn(state, history))
      : Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Vui lòng nhập đầy đủ nội dung!",
        });
  };
  return (
    <section className="form">
      <img src="../img/blog-1.jpg" />
      <div className="main-content">
        <form>
          <h4>ĐĂNG NHẬP</h4>
          <div>
            <TextField
              id="standard-basic"
              label="Tài Khoản"
              margin="normal"
              onChange={(e) => {
                handleOnChange(e);
              }}
              name="taiKhoan"
              style={{ width: "90%", margin: "15px auto" }}
            />
          </div>
          <div>
            <TextField
              id="standard-basic"
              label="Mật Khẩu"
              margin="normal"
              type="password"
              style={{ width: "90%", margin: "15px auto" }}
              onChange={(e) => {
                handleOnChange(e);
              }}
              name="matKhau"
            />
          </div>
          <button className="pulse" onClick={handleOnSubmit}>
            ĐĂNG NHẬP
          </button>
          <NavLink className="go-to-form-another" to="/home/dang-ky">
            Bạn chưa có tài khoản?
          </NavLink>
        </form>
      </div>
    </section>
  );
};

export default FormSignIn;
