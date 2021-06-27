import React from "react";
import { NavLink } from "react-router-dom";
export default function ItemCategory(props) {
  return (
    <div className="col-4 col-md-2">
      <NavLink
        className="item-category"
        to={`/home/courses/${props.category.maDanhMuc}`}
      >
        <div className="overflow"></div>
        <img src={`./img/${props.hinhAnh}.jpg`} alt="img-category" />
        <div className="content">
          <div className="text-center">
            <h6>{props.category.tenDanhMuc}</h6>
          </div>
        </div>
      </NavLink>
    </div>
  );
}
