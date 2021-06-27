import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import TableItemCourse from "./views/TableItemCourse";
import CategoryCourse from "./views/CategoryCourse";
import CoursePopular from "../../../components/CoursePopular";
import Loading from "../../../components/Loading";
import SearchCourse from "./views/SearchCourse";
import SortCourse from "./views/SortCourse";
import * as actions from "../../../redux/actions/index";
import NoData from "../../../components/NoData/NoData";

const AllCourse = () => {
  const { listCourse, listCategoryCourse, listCourseFilter } = useSelector(
    (state) => state.khoaHocReducer
  );
  const { accountInfo } = useSelector((state) => state.NguoiDungReducer);
  const dispatch = useDispatch();

  const { cateCode: cateCodeFromParam } = useParams();

  const [keyword, setKeyword] = useState("");
  const [cateCode, setCateCode] = useState(cateCodeFromParam);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    dispatch(actions.actGetCategoryCourseAPI());
    dispatch(actions.actGetListCourseAPI());
    dispatch(actions.actGetInfoAccount());
  }, []);

  useEffect(() => {
    dispatch(
      actions.actFilterListCourse([...listCourse], cateCode, keyword, sortBy)
    );
  }, [listCourse, keyword, cateCode, sortBy]);

  return (
    <>
      <Loading />
      <section className="allCourse">
        <div className="wrap-head">
          <div
            className=" header-head"
            style={{
              backgroundImage: "url('../../img/15.jpg')",
            }}
          >
            <div
              className="overflow"
              style={{ backgroundImage: "url('../../img/bg-2.png')" }}
            ></div>
            <div className="title detail-course">
              <span>KHÓA HỌC CỦA CHÚNG TÔI</span>
              <h4>
                <NavLink to="/home">Trang chủ</NavLink> /{" "}
                <span>Khóa học của chúng tôi</span>
              </h4>
            </div>
          </div>
        </div>
        <div className="wrap-top-content">
          <div className="tittle">
            <SortCourse sortBy={sortBy} setSortBy={setSortBy} />
            <SearchCourse keyword={keyword} setKeyword={setKeyword} />
          </div>
        </div>
        <hr></hr>
        <div className="allCourse-body">
          <div className="row">
            <div className="col-sm-10 col-9">
              {listCourseFilter.length ? (
                <TableItemCourse
                  listCourseFilter={listCourseFilter}
                  courseOfUser={
                    accountInfo && accountInfo.chiTietKhoaHocGhiDanh
                  }
                />
              ) : (
                <NoData message={"Không có khóa học nào được tìm thấy!!"} />
              )}
            </div>
            <div className="col-3 col-sm-2">
              <div className="course-category">
                <h4 className="title ">Danh mục khóa học</h4>
                <CategoryCourse
                  listCategoryCourse={listCategoryCourse}
                  cateCode={cateCode}
                  setCateCode={setCateCode}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Related-Course">
          <CoursePopular />
        </div>
      </section>
    </>
  );
};

export default AllCourse;
