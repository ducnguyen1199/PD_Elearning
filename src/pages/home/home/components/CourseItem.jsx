import React from "react";
import * as actions from "../../../../redux/actions/index";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const CourseItem = ({ course }) => {
  const { listCart } = useSelector((state) => state.GioHangReducer);
  const { accountInfo } = useSelector((state) => state.NguoiDungReducer);
  const { chiTietKhoaHocGhiDanh } = accountInfo;
  const dispatch = useDispatch();

  const renderAddToCart = () => {
    return listCart.findIndex((item) => {
      return item.maKhoaHoc === course.maKhoaHoc;
    }) === -1 ? (
      <a
        className="btn-leon"
        onClick={() => {
          dispatch(actions.actAddToCart(course));
        }}
      >
        THÊM GIỎ HÀNG
      </a>
    ) : (
      <NavLink className="btn--blue btnn" to="/home/detail-cart">
        TỚI GIỎ HÀNG
      </NavLink>
    );
  };

  const handleAddToCart = () => {
    return chiTietKhoaHocGhiDanh ? (
      chiTietKhoaHocGhiDanh.findIndex((item) => {
        return item.maKhoaHoc === course.maKhoaHoc;
      }) === -1 ? (
        renderAddToCart()
      ) : (
        <NavLink className="btn--purple btnn" to="/home/profile">
          TỚI HỒ SƠ
        </NavLink>
      )
    ) : (
      renderAddToCart()
    );
  };

  return (
    <div className="khoa-hoc">
      <div className="wallpaper">
        <img src={course.hinhAnh} alt="course" />
        <div className="overflow">
          <div className="ct-wallpaper">
            <h3>{course.tenKhoaHoc}</h3>
            <p>{course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
          </div>
        </div>
      </div>
      <div className="kh-main-content">
        <div className="kh-relative">
          <div className="status-course">
            <span>Mới</span>
            {/* <span>HOT</span> */}
          </div>
          <div className="mct-original">
            <div className="d-flex">
              <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" />
              <div className="content">
                <label>Giảng viên</label>
                <p>{course.nguoiTao.hoTen}</p>
              </div>
            </div>
            <div className="d-flex">
              <i className="fa fa-mortar-board"></i>
              <div className="content">
                <label>Học viên</label>
                <p>{course.soLuongHocVien}</p>
              </div>
            </div>
            <div className="d-flex fee">${course.fee}</div>
          </div>
          <div className="mct-hover">
            <p className="text-sm">Ngày khởi tạo: {course.ngayTao}</p>
            <h3 className="text-lg">{course.tenKhoaHoc}</h3>
            <p className="text-sm">
              {course.danhMucKhoaHoc?.tenDanhMucKhoaHoc}
            </p>
            <div className="d-flex justify-content-between pr-3">
              <div className="d-flex align-items-center">
                <img src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" />
                <div className="content">
                  <label>Giảng viên</label>
                  <p>{course.nguoiTao.hoTen}</p>
                </div>
              </div>
              <div className="d-flex align-items-center fee">${course.fee}</div>
            </div>
            <span>
              <i className="fa fa-eye"></i> {course.luotXem} |{" "}
              <i className="fa fa-mortar-board"></i>
              {course.soLuongHocVien} | <i className="fa fa-heart"></i> 99
            </span>
            <p className="description">{course.moTa}</p>
            <div className="btn-group">
              {handleAddToCart()}
              <NavLink
                className="btn--white btnn"
                to={`/home/detail-course/${course.maKhoaHoc}?${course.fee}`}
              >
                CHI TIẾT
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
