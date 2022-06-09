import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import CoursePopular from '../../../components/CoursePopular';
import { NavLink } from 'react-router-dom';
import Loading from '../../../components/Loading';

const DetailCourse = () => {
  const dispatch = useDispatch();
  const { dataDetailCourse, listCourse } = useSelector((state) => state.khoaHocReducer);
  const { courseOfUser } = useSelector((state) => state.NguoiDungReducer);
  const { listCart } = useSelector((state) => state.GioHangReducer);
  const { id } = useParams();
  const fee = new URLSearchParams(window.location.search).get('price');
  useEffect(() => {
    dispatch(actions.actGetDetailCourseAPI(id));
  }, []);

  const renderAddToCart = () =>
    listCart.findIndex((item) => item.maKhoaHoc === id) === -1 ? (
      <button
        className='btn-leon btnn'
        onClick={() => {
          dispatch(
            actions.actAddToCart({
              ...dataDetailCourse,
              fee: Number(fee),
            }),
          );
        }}
      >
        THÊM GIỎ HÀNG
      </button>
    ) : (
      <NavLink className='btn--blue btnn' to='/home/detail-cart'>
        ĐẾN GIỎ HÀNG
      </NavLink>
    );

  const handleAddToCart = () =>
    courseOfUser ? (
      courseOfUser.findIndex((item) => item.maKhoaHoc === id) === -1 ? (
        renderAddToCart()
      ) : (
        <NavLink className='btn--purple btnn' to='/home/profile'>
          TỚI HỒ SƠ
        </NavLink>
      )
    ) : (
      renderAddToCart()
    );
  return (
    <>
      <Loading />
      <section className='detail-Course'>
        <div className='wrap-head'>
          <div
            className=' header-head'
            style={{
              backgroundImage: "url('/img/10.jpg')",
            }}
          >
            <div className='overflow' style={{ backgroundImage: "url('/img/bg-2.png')" }}></div>
            <div className='title detail-course'>
              <span>{dataDetailCourse.tenKhoaHoc}</span>
              <h4>
                <NavLink to='/home'>Trang chủ</NavLink> /<span>Chi tiết khóa học</span>
              </h4>
            </div>
          </div>
          <div className='body-detailCourse'>
            <div className='row '>
              <div className='col-8 '>
                <div className='Information-Course'>
                  <div className='tittle-course'>
                    {dataDetailCourse.tenKhoaHoc}
                    <span className='price-course'>{fee}$</span>
                  </div>
                  <div className='info-content'>
                    <div className='row m-0 align-items-center'>
                      <div className='col-3'>
                        <div className='item-content teacher-content'>
                          <img
                            className='teacher-img'
                            src='https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
                          />
                          <div className='content'>
                            <p>
                              Giảng viên
                              <p>{dataDetailCourse.nguoiTao?.hoTen}</p>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-3 borderxx'>
                        <div className='item-content '>
                          <div className='content'>
                            <p>
                              Danh Mục
                              <p>{dataDetailCourse.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</p>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className='item-content '>
                          <div className='content'>
                            <p>
                              Đánh giá
                              <span>
                                5<i className='fa fa-star' aria-hidden='true'></i>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className='col-3'>
                        <div className='item-content'>
                          <div className='content last-content'>{handleAddToCart()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='image-detail-course'>
                    <div className='dc-overflow'>
                      <img src='/img/bg-2.png' />
                    </div>
                    <img src={dataDetailCourse.hinhAnh} />
                  </div>
                </div>
              </div>
              <div className='col-4'>
                <div className='FearureCourse'>
                  <p className='featre-tittle'>Thông tin khóa học</p>
                  <ul>
                    <li>
                      <i className='fa fa-clone'></i>
                      <span>
                        Tên khóa học: <span>{dataDetailCourse.tenKhoaHoc}</span>
                      </span>
                    </li>
                    <li>
                      <i className='fa fa-list-ul'></i>
                      <span>
                        Danh mục:
                        <span>{dataDetailCourse.danhMucKhoaHoc?.tenDanhMucKhoaHoc}</span>
                      </span>
                    </li>
                    <li>
                      <i className='fa fa-bookmark-o' aria-hidden='true'></i>
                      <span>
                        Mô tả: <span>{dataDetailCourse.moTa}</span>
                      </span>
                    </li>
                    <li>
                      <i className='fa fa-clock-o' aria-hidden='true'></i>
                      <span>
                        Ngày tạo: <span>{dataDetailCourse.ngayTao}</span>
                      </span>
                    </li>
                    <li>
                      <i className='fa fa-eye' aria-hidden='true'></i>
                      <span>
                        Lượt xem: <span>{dataDetailCourse.luotXem}</span>
                      </span>
                    </li>
                    <li>
                      <i className='fa fa-graduation-cap' aria-hidden='true'></i>
                      <span>
                        Học viên: <span>{dataDetailCourse.soLuongHocVien}</span>
                      </span>
                    </li>
                    <li>
                      <i className='fa fa-money' aria-hidden='true'></i>
                      <span>
                        Giá : <span>{fee}$</span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CoursePopular />
      </section>
    </>
  );
};

export default DetailCourse;
