import React from "react";
import {
  SORT_AZ,
  SORT_PRICE_ASC,
  SORT_PRICE_DESC,
} from "../../../../constants";

const SortCourse = ({ sortBy, setSortBy }) => {
  return (
    <div className="sort">
      <div className="input-group sort-tool">
        <div className="dropdown">
          <button
            className="btn btn-effect dropdown-toggle "
            type="button"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Sắp xếp khóa học
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" onClick={() => setSortBy("")}>
              Mặc định
            </a>
            <a className="dropdown-item" onClick={() => setSortBy(SORT_AZ)}>
              Bảng chữ cái
            </a>
            <a
              className="dropdown-item"
              onClick={() => setSortBy(SORT_PRICE_ASC)}
            >
              Giá tăng dần
            </a>
            <a
              className="dropdown-item"
              onClick={() => setSortBy(SORT_PRICE_DESC)}
            >
              Giá giảm dần
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortCourse;
