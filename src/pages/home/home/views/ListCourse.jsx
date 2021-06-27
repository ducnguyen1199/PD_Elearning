import * as actions from "../../../../redux/actions/index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseItem from "../components/CourseItem";
import { NavLink } from "react-router-dom";
import AOS from "aos";

const ListCourse = (props) => {
  const dispatch = useDispatch();
  const { listCourse } = useSelector((state) => state.khoaHocReducer);
  const { accountInfo } = useSelector((state) => state.NguoiDungReducer);
  useEffect(() => {
    dispatch(actions.actGetListCourseAPI());
    dispatch(actions.actGetInfoAccount());
    AOS.init();
  }, []);

  const renderListCourse = () => {
    if (listCourse.length) {
      return listCourse.slice(0, 6).map((item, index) => (
        <div className="item-course col-12 col-xl-4" key={index}>
          <CourseItem course={item} history={props.history} />
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
          <NavLink to="/home/courses">
            SHOWN ALL<i className="fa fa-angle-double-right"></i>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default ListCourse;
