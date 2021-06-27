import React from "react";

const SearchCourse = ({ keyword, setKeyword }) => {
  return (
    <div className="input-group search-bar">
      <input
        type="text"
        className="form-control"
        placeholder="Tìm kiếm khóa học"
        defaultValue={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
};

export default SearchCourse;
