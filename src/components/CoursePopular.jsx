// import React, { Component } from "react";
// import ItemCourse from "./ItemCourse";
// import { connect } from "react-redux";
// import * as actions from "../redux/actions/index";
// import OwlCarousel from "react-owl-carousel";
// class CoursePopular extends Component {
//   componentDidMount() {
//     this.props.getListCourse();
//     this.props.getInfoAccount();
//   }
//   renderPopularCourse = () => {
//     let { listCourse, accountInfo } = this.props;
//     return listCourse.map((item, index) => {
//       return (
//         <div className="item" key={index}>
//           <ItemCourse
//             course={item}
//             id={index}
//             courseOfUser={accountInfo ? accountInfo.chiTietKhoaHocGhiDanh : ""}
//           />
//         </div>
//       );
//     });
//   };
//   render() {
//     return (
//       <section className="list-course-popular">
//         <h1 className="title">CÓ THỂ BẠN QUAN TÂM</h1>

//         <OwlCarousel
//           className="owl-theme"
//           loop={false}
//           margin={5}
//           items={5}
//           slideBy={4}
//           nav
//           responsive={{
//             1200: {
//               items: 5,
//             },
//             992: {
//               items: 4,
//             },
//             767: {
//               items: 3,
//             },
//             576: {
//               items: 2,
//             },
//             0: {
//               items: 2,
//             },
//           }}
//           key={this.props.listCourse.length}
//         >
//           {this.renderPopularCourse()}
//         </OwlCarousel>
//       </section>
//     );
//   }
// }
// const mapStateToProps = (state) => {
//   return {
//     listCourse: state.khoaHocReducer.listCourse,
//     accountInfo: state.NguoiDungReducer.accountInfo,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getListCourse: () => {
//       dispatch(actions.actGetListCourseAPI());
//     },
//     getInfoAccount: () => {
//       dispatch(actions.actGetInfoAccount());
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(CoursePopular);

import React from "react";

const CoursePopular = () => {
  return <div></div>;
};

export default CoursePopular;
