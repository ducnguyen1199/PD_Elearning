import React from "react";
import { useSelector } from "react-redux";
import BillCart from "./views/BillCart";
import ItemCourseOfUser from "../../../components/ItemCourseOfUser";
import CoursePopular from "../../../components/CoursePopular";
import Loading from "../../../components/Loading";
import { NavLink, useHistory } from "react-router-dom";
import NoData from "../../../components/NoData/NoData";

const DetailCart = () => {
  const history = useHistory();
  const { listCart } = useSelector((state) => state.GioHangReducer);
  const renderListCart = () =>
    listCart.map((item, index) => (
      <ItemCourseOfUser key={index} course={item} />
    ));
  return (
    <>
      <Loading />
      <section className="detail-cart">
        <div className="wrap-head">
          <div
            className=" header-head"
            style={{
              backgroundImage: "url('../../img/13.jpg')",
            }}
          >
            <div
              className="overflow"
              style={{ backgroundImage: "url('../../img/bg-2.png')" }}
            ></div>
            <div className="title detail-course">
              <span>THÔNG TIN GIỎ HÀNG</span>
              <h4>
                <NavLink to="/home">Trang chủ</NavLink> /{" "}
                <span>Thông tin giỏ hàng</span>
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
                {listCart == 0 ? (
                  <NoData message="Không có khóa học nào trong giỏ hàng!!" />
                ) : (
                  renderListCart()
                )}
              </div>
            </div>
          </div>
          <div className="bill col-lg-4 col-11">
            <BillCart listCart={listCart} history={history} />
          </div>
        </div>
      </section>
      <CoursePopular />
    </>
  );
};

export default DetailCart;
