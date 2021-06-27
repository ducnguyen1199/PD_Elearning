import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import * as actions from "../../../../redux/actions/index";
import { NavLink } from "react-router-dom";
import listBlog from "../data/data.json";
import * as $ from "jquery";
import classnames from "classnames";
class BlogSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fixed: false,
      positionPost: 0,
      footer: false,
    };
  }
  componentDidMount() {
    this.props.getListCategory();
    this.setState({
      fixed: false,
      positionPost: $("#lastest-posts").offset().top,
    });
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    let fixed =
      this.state.positionPost < window.pageYOffset &&
      window.pageYOffset < $("#blog").offset().top - 500;
    let footer = window.pageYOffset > $("#blog").offset().top - 500;
    this.setState({
      fixed,
      footer,
    });
  };
  render() {
    return (
      <section className="blog-side-bar">
        <TextField
          id="search-blog"
          label="What are you looking for?"
          style={{ width: "100%" }}
        />
        <h3>CATEGORIES</h3>
        <ul className="blog-category list-unstyled">
          {this.props.listCategoryCourse
            ? this.props.listCategoryCourse.map((item, index) => {
                return (
                  <li key={index}>
                    <NavLink to={`/home/courses/${item.maDanhMuc}`}>
                      {item.tenDanhMuc}
                    </NavLink>
                  </li>
                );
              })
            : ""}
        </ul>
        <div
          className={classnames({
            "p-fixed": this.state.fixed,
            "p-footer": this.state.footer,
          })}
          id="lastest-posts"
        >
          <h3>LASTEST POSTS</h3>
          {listBlog
            ? listBlog.slice(0, 3).map((item, index) => {
                return (
                  <div className="lastest-post" key={index}>
                    <img src={item.hinhAnh} />
                    <div className="lb-content">
                      <h5>{item.title}</h5>
                      <p>{item.month + " " + item.day}, 2019</p>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listCategoryCourse: state.khoaHocReducer.listCategoryCourse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListCategory: () => {
      dispatch(actions.actGetCategoryCourseAPI());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BlogSideBar);
