import React from "react";
import listBlog from "../data/data.json";
const BlogMainContent = () => {
  const renderListBlog = () => {
    if (listBlog) {
      return listBlog.map((item, index) => (
        <div className="blog-item" key={index}>
          <div className="blog-wrap">
            <img src={item.hinhAnh} />
            <div className="date">
              <div>
                <p className="day">{item.day}</p>
                <p className="month">{item.month}</p>
              </div>
            </div>
          </div>
          <div className="blog-item-content">
            <h4>{item.title}</h4>
            <p>
              {item.cates.map((iitem, iindex) => (
                <span key={iindex}>{iitem} / </span>
              ))}
            </p>
            <p className="blog-text">{item.des}</p>
            <button className="btn--blue pulse">READ MORE {">"}</button>
          </div>
        </div>
      ));
    }
  };

  return (
    <section className="blog-main-content">
      {renderListBlog()}
      <div id="blog"></div>
    </section>
  );
};

export default BlogMainContent;
