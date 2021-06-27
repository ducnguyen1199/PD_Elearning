import React from "react";
import { NavLink } from "react-router-dom";
import BlogMainContent from "./views/BlogMainContent";
import BlogSideBar from "./views/BlogSideBar";
import Loading from "../../../components/Loading";

const Blog = () => (
  <>
    <Loading />
    <setion className="blog">
      <div className="wrap-head">
        <div
          className=" header-head"
          style={{
            backgroundImage: "url('../../img/14.jpg')",
          }}
        >
          <div
            className="overflow"
            style={{ backgroundImage: "url('../../img/bg-2.png')" }}
          ></div>
          <div className="title detail-course">
            <span>BLOG</span>
            <h4>
              <NavLink to="/home">Trang chủ</NavLink> / <span>Blog</span>
            </h4>
          </div>
        </div>
      </div>
      <div className="blog-content">
        <div className="row">
          <div className="col-12 col-lg-9">
            <BlogMainContent />
          </div>

          <div className="col-lg-3 d-none d-lg-block">
            <BlogSideBar />
          </div>
        </div>
      </div>
    </setion>
  </>
);

export default Blog;
