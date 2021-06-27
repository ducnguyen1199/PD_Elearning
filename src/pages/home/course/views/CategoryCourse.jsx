import React from "react";

const CategoryCourse = ({ listCategoryCourse, cateCode, setCateCode }) => {
  const renderCategoryHTML = () =>
    listCategoryCourse.map((item, index) => (
      <div key={index} className="menu-item">
        <span
          className={`category-items cate-link ${
            item.maDanhMuc === cateCode && "active"
          }`}
          onClick={() => setCateCode(item.maDanhMuc)}
        >
          {item.tenDanhMuc}
        </span>
      </div>
    ));
  return (
    <div className="navbar-nav category-menu">
      <div className="menu-item">
        <span
          className={`category-items cate-link ${!cateCode && "active"}`}
          onClick={() => setCateCode("")}
        >
          Tất cả khóa học
        </span>
      </div>
      {renderCategoryHTML()}
    </div>
  );
};

export default CategoryCourse;
