import React from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import Swal from "sweetalert2";

const BillCart = ({ listCart, history }) => {
  const dispatch = useDispatch();
  const totalCart = () => listCart.reduce((rs, item) => rs + item.fee, 0);

  const errOnRegister = (err) => {
    Swal.fire({
      position: "center",
      icon: "error",
      html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>${err}</b>`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const handleOnRegister = () => {
    localStorage.getItem("user")
      ? listCart.length
        ? dispatch(actions.actRegisterCourse(listCart, history))
        : errOnRegister("KHÔNG CÓ KHÓA HỌC NÀO TRONG GIỎ HÀNG")
      : errOnRegister("BẠN CHƯA ĐĂNG NHẬP");
  };
  return (
    <section className="bill-cart">
      <h3 className="text-center">THÔNG TIN ĐƠN HÀNG</h3>
      <div className="d-flex justify-content-between so-luong">
        <p>Số lượng: </p>
        <p className="fee">{listCart.length} khóa học</p>
      </div>
      <div className="d-flex justify-content-between tam-tinh">
        <p>Tạm tính: </p>
        <p className="fee">${totalCart()}</p>
      </div>

      <div className="d-flex justify-content-between total">
        <p>Tổng tiền: </p>
        <p className="fee">${parseInt(totalCart() * 1.1)}</p>
      </div>
      <p className="text-right">Đã bao gồm VAT (nếu có)</p>
      <span className="btn-neon bttn" onClick={handleOnRegister}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        TIẾN HÀNH THANH TOÁN
      </span>
    </section>
  );
};

export default BillCart;
