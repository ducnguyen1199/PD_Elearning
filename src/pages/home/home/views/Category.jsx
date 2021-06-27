import React, { useEffect } from "react";
import ItemCategory from "../components/ItemCategory";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import AOS from "aos";
const Category = () => {
  const { listCategoryCourse } = useSelector((state) => state.khoaHocReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.actGetCategoryCourseAPI());
    AOS.init();
  }, []);
  const renderCategoryHTML = () =>
    listCategoryCourse.length &&
    listCategoryCourse.map((item, index) => (
      <ItemCategory key={index} hinhAnh={index + 1} category={item} />
    ));
  return (
    <section className="category ">
      <div className="wallpaper">
        <img src="./img/bg-3.png" alt="wallpaper" />
      </div>

      <h3 className="title" data-aos="fade-down" data-aos-duration="1300">
        Our category
      </h3>
      <div className="container">
        <div className="row" data-aos="fade-right" data-aos-duration="1000">
          {renderCategoryHTML()}
        </div>
      </div>
    </section>
  );
};

export default Category;
