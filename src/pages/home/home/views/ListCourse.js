import * as actions from "../../../../redux/actions/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import KhoaHoc from "../components/KhoaHoc";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import "Listcourse.scss";

const ListCourse = () => {
  const dispatch = useDispatch();
  const { listCourse } = useSelector((state) => state.khoaHocReducer);
  const { accountInfo } = (state) => state.NguoiDungReducer;
  useEffect(() => {
    dispatch(actions.actGetListCourseAPI());
    dispatch(actions.actGetInfoAccount());
    AOS.init();
  });
  useEffect(() => {}, []);

  const renderListCourse = (props) => {
    if (listCourse.length) {
      return listCourse.slice(0, 6).map((item, index) => (
        <div className="item-course col-12 col-xl-4" key={index}>
          <KhoaHoc
            course={item}
            courseOfUser={accountInfo ? accountInfo.chiTietKhoaHocGhiDanh : ""}
            history={props.history}
          />
        </div>
      ));
    }
  };
  return (
    <section
      className="list-course"
      data-aos="fade-up"
      data-aos-duration="1300"
    >
      <h3 className="title">Our Top Courses</h3>
      <p className="subtitle">
        Join over 100 instructors who use Teachable to share their knowledge.
        <br /> Easily register for an online course
      </p>
      <div className="lc-main-content">
        <div className="lc-content row">{renderListCourse()}</div>
        <div className="lc-btn-group">
          <button className="btn--blue btnn" id="loadMore">
            SHOWN MORE <i className="fa fa-angle-double-down"></i>
          </button>
          <button className="btn--blue btnn" id="showLess">
            SHOWN LESS <i className="fa fa-angle-double-up"></i>
          </button>
          <NavLink className="btn--purple btnn" to="/home/courses/all">
            SHOWN ALL<i className="fa fa-angle-double-right"></i>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ListCourse;
