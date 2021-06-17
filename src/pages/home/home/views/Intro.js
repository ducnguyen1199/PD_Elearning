import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { NavLink } from "react-router-dom";
import "../Intro.scss";
const Intro = () => {
  const { listCourse } = useState((state) => state.khoaHocReducer);
  const dispatch = useDispatch();
  let ref = useRef();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(actions.actGetListCourseAPI());
  });
  const scrollDown = () => {
    window.scrollTo({
      behavior: "smooth",
      top: ref.current.offsetTop,
    });
  };
  const handleOnChange = (event) => {
    let { value } = event.target;
    setKeyword(value);
  };
  const renderContentSearch = () =>
    keyword &&
    listCourse
      .filter((item) => {
        return (
          item.tenKhoaHoc.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
        );
      })
      .map((item, index) => {
        return (
          <NavLink to={"/home/detail-course/" + item.maKhoaHoc} key={index}>
            <span>{item.tenKhoaHoc}</span>
            <span>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</span>
          </NavLink>
        );
      });
  return (
    <section className="intro">
      <div className="overflow"></div>
      <img src="./img/blog-4.jpg" alt="blog" />
      <div className="content">
        <div>
          <h3 className="head-title">
            Getting started with <b>PD-Elearning</b>
          </h3>
          <p className="head-subtitle">
            We pride ourselves on providing the most up-to-date content for
            <br />
            our students to learn each course
          </p>
          <div className="form-group">
            <div className="search">
              <input
                type="text"
                placeholder="What course are you looking for?"
                className="form-control"
                onKeyUp={handleOnChange}
              ></input>
              {keyword && (
                <div className="content-search">{renderContentSearch()}</div>
              )}
            </div>
            <NavLink
              to={`/home/courses/all?${keyword}`}
              className="btn-cool bttn"
            >
              SEARCH
            </NavLink>
          </div>
        </div>
      </div>
      <div className="arrow-down" onClick={scrollDown}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div ref={ref}></div>
    </section>
  );
};

export default Intro;
