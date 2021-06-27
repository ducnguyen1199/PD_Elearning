import React, { useEffect } from "react";
import { useState } from "react";
import ItemCourse from "../../../../components/ItemCourse";

const TableItemCourse = ({ listCourseFilter, courseOfUser }) => {
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    setPageNumber(0);
  }, [listCourseFilter]);

  const renderPageNumber = () =>
    [...Array(Math.ceil(listCourseFilter.length / 8))].map((item, index) => (
      <div key={index} className="pn-item">
        <span
          className={`pn-link ${index === pageNumber && "active first"}`}
          onClick={() => setPageNumber(index)}
        >
          {index + 1}
        </span>
      </div>
    ));

  const renderTableCourse = () =>
    listCourseFilter
      .slice(pageNumber * 8, pageNumber * 8 + 8)
      .map((item, index) => (
        <div
          className="col-md-4 col-sm-6 col-xl-3 col-12 item-course"
          key={index}
        >
          <ItemCourse
            course={item}
            id={index}
            courseOfUser={courseOfUser ? courseOfUser : ""}
          />
        </div>
      ));

  return (
    <>
      <div className="row">{renderTableCourse()}</div>
      <div className="adjust-center-pagesize">{renderPageNumber()}</div>
    </>
  );
};

export default TableItemCourse;
