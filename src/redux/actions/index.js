import * as actionTypes from "../constants/actionTypes";
import { callApi } from "../../utils/callApi";
import Swal from "sweetalert2";
import * as $ from "jquery";
import { SORT_AZ, SORT_PRICE_ASC, SORT_PRICE_DESC } from "../../constants";

const successApi = (strSuccess) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    html: `<h3 style="color:#a5dc86"><b>SUCCESS!</b></h3><b>${strSuccess}</b>`,
    showConfirmButton: false,
    timer: 3000,
  });
};
const errorApi = (err) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>${err.response.data.toUpperCase()}</b>`,
    showConfirmButton: false,
    timer: 3000,
  });
};

export const actGetListCourseAPI = () => {
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01")
      .then((rs) => {
        let listCourse = [];
        if (rs.data) {
          listCourse = rs.data.map((item) => ({
            ...item,
            fee:
              Math.floor(Math.random() * (Math.floor(100) - Math.ceil(50))) +
              Math.ceil(50),
          }));
        }
        dispatch({
          type: actionTypes.GET_LIST_COURSE,
          listCourse,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
export const actGetCategoryCourseAPI = () => {
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/LayDanhMucKhoaHoc")
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_CATEGORY_COURSE,
          listCategoryCourse: rs.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const actGetDetailCourseAPI = (id) => {
  return (dispatch) => {
    callApi(`QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${id}`)
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_DETAIL_COURSE,
          dataDetailCourse: rs.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
export const actSignIn = (data, history) => {
  return () => {
    callApi("QuanLyNguoiDung/DangNhap", "POST", data)
      .then((rs) => {
        if (window.location.pathname === "/admin") {
          if (rs.data.maLoaiNguoiDung === "GV") {
            localStorage.setItem("infoAccountAdmin", JSON.stringify(data));
            successApi("ĐĂNG NHẬP THÀNH CÔNG.").then(() => {
              localStorage.setItem("userAdmin", JSON.stringify(rs.data));
              history.push("/admin/dashboard");
            });
          } else {
            let message = "Bạn không có quyền truy cập";
            Swal.fire({
              position: "center",
              icon: "error",
              html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>${message.toUpperCase()}</b>`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } else {
          localStorage.setItem("infoAccount", JSON.stringify(data));
          successApi("ĐĂNG NHẬP THÀNH CÔNG.").then(() => {
            localStorage.setItem("user", JSON.stringify(rs.data));
            history.push(JSON.parse(localStorage.getItem("prevPage")));
          });
        }
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};
export const actLogOut = () => {
  return (dispatch) => {
    localStorage.removeItem("user");
    localStorage.removeItem("infoAccount");
    dispatch({
      type: actionTypes.LOGOUT_ACCOUNT,
      data: {},
    });
  };
};

export const actSignUp = (data, history) => {
  return () => {
    callApi("QuanLyNguoiDung/DangKy", "POST", { ...data, maNhom: "GP01" })
      .then((rs) => {
        successApi("ĐĂNG KÍ THÀNH CÔNG").then(() => {
          history.push("/home/dang-nhap");
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};

export const actAddUserAPI = (data) => {
  let userAmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi("QuanLyNguoiDung/ThemNguoiDung", "POST", data, {
      Authorization: `Bearer ${userAmin.accessToken}`,
    })
      .then((rs) => {
        successApi("Thêm thành công").then(() => {
          dispatch({
            type: actionTypes.ADD_USER,
            data: data,
          });
        });
      })
      .catch((err) => {
        return Swal.fire({
          position: "center",
          icon: "error",
          html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>${err.response.data}</b>`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
};
export const actGetListUserAPI = () => {
  return (dispatch) => {
    callApi("QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01")
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_USER_LIST,
          data: rs.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const actGetInfoAccount = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const InfoAccount = JSON.parse(localStorage.getItem("infoAccount"));
    return (dispatch) => {
      callApi("QuanLyNguoiDung/ThongTinTaiKhoan", "POST", InfoAccount, {
        Authorization: `Bearer ${user.accessToken}`,
      })
        .then((rs) => {
          dispatch({
            type: actionTypes.GET_INFO_ACCOUNT,
            data: rs.data,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  } else return (dispatch) => {};
};
export const actGetInfoAccountAdmin = (data) => {
  return (dispatch) => {
    const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
    callApi(
      "QuanLyNguoiDung/ThongTinTaiKhoan",
      "POST",
      { taiKhoan: data },
      {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      }
    )
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_INFO_ACCOUNT,
          data: rs.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};

export const actPUTinfoAccount = (data) => {
  let user = "";
  if (window.location.pathname === "/home/profile") {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    user = JSON.parse(localStorage.getItem("userAdmin"));
  }
  return (dispatch) => {
    callApi("QuanLyNguoiDung/CapNhatThongTinNguoiDung", "PUT", data, {
      Authorization: `Bearer ${user.accessToken}`,
    })
      .then((rs) => {
        JSON.stringify(localStorage.setItem("isPutSuccess", true));
        successApi("CẬP NHẬT THÔNG TIN THÀNH CÔNG.").then(() => {
          dispatch({
            type: actionTypes.PUT_ACCOUNT_USER,
            data: data,
          });
          let a = document.getElementsByClassName("form-control");
          for (let i = 1; i < a.length; i++) {
            a[i].setAttribute("disabled", true);
          }
          $("#modelId").modal("hide");
        });
      })
      .catch((err) => {
        JSON.stringify(localStorage.setItem("isPutSuccess", false));
        errorApi(err);
      });
  };
};
export const actDeleteUserAPI = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi(`QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${data}`, "DELETE", null, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        successApi(rs.data).then(() => {
          dispatch({
            type: actionTypes.DELETE_USER,
            data: data,
          });
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};
export const actGetCourseWaitingAPI = (data) => {
  return (dispatch) => {
    let user;
    if (localStorage.getItem("userAdmin")) {
      user = JSON.parse(localStorage.getItem("userAdmin"));
    } else {
      user = JSON.parse(localStorage.getItem("user"));
    }
    callApi("QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet", "POST", data, {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZHVjZHVjIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR1YiLCJuYmYiOjE1NzU3MjA4NTAsImV4cCI6MTU3NTcyNDQ1MH0.QyJUI3OnL6kpz1bpdDd49ZHFZUtm4c7kueMM-QyCC80",
    })
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_COURSE_WAITING,
          data: rs.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
export const actGetListCourseAccpetedAPI = (data) => {
  return (dispatch) => {
    callApi("QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet", "POST", data, {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZHVjZHVjIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiR1YiLCJuYmYiOjE1NzU3MjA4NTAsImV4cCI6MTU3NTcyNDQ1MH0.QyJUI3OnL6kpz1bpdDd49ZHFZUtm4c7kueMM-QyCC80",
    })
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_LIST_COURSE_ACCEPTED,
          data: rs.data,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
};
export const actCancelAttendCourse = (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/HuyGhiDanh", "POST", data, {
      Authorization: `Bearer ${user.accessToken}`,
    })
      .then((rs) => {
        successApi("HỦY GHI DANH THÀNH CÔNG.").then(() => {
          dispatch({
            type: actionTypes.CANCEL_ATTENDED_COURSE,
            data: data,
          });
        });
      })
      .catch((err) => {});
  };
};
export const actCancelAttendCourseAdmin = (data) => {
  let user =
    window.location.pathname === "/home/profile"
      ? JSON.parse(localStorage.getItem("user"))
      : JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/HuyGhiDanh", "POST", data, {
      Authorization: `Bearer ${user.accessToken}`,
    })
      .then((rs) => {
        successApi("HỦY GHI DANH THÀNH CÔNG.").then(() => {
          dispatch({
            type: actionTypes.CANCEL_ATTENDED_COURSE_ADMIN,
            data: data,
          });
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};
export const actCancelAcceptedCourseAdmin = (data) => {
  let user =
    window.location.pathname === "/home/profile"
      ? JSON.parse(localStorage.getItem("user"))
      : JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/HuyGhiDanh", "POST", data, {
      Authorization: `Bearer ${user.accessToken}`,
    })
      .then((rs) => {
        successApi("HỦY GHI DANH THÀNH CÔNG.").then(() => {
          dispatch({
            type: actionTypes.CANCEL_ACCEPTED_COURSE_ADMIN,
            data: data,
          });
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};
export const actAcceptCourse = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  let { maKhoaHoc, taiKhoan } = data;
  return (dispatch) => {
    callApi(
      "QuanLyKhoaHoc/GhiDanhKhoaHoc",
      "POST",
      { maKhoaHoc, taiKhoan },
      { Authorization: `Bearer ${userAdmin.accessToken}` }
    )
      .then((rs) => {
        successApi("Ghi danh thành công");
        dispatch({
          type: actionTypes.ACCPET_COURSE_REGISTER,
          data: data,
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};

export const actAddToCart = (payload) => {
  return (dispatch) => {
    if (localStorage.getItem("user")) {
      dispatch({
        type: actionTypes.ADD_TO_CART,
        payload,
      });
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        html: `<h3 style="color:#f27474"><b>ERROR!</b></h3><b>VUI LÒNG ĐĂNG NHẬP!</b>`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const actRegisterCourse = (listCart, history) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    listCart.map((item) => {
      callApi(
        "QuanLyKhoaHoc/DangKyKhoaHoc",
        "POST",
        { maKhoaHoc: item.maKhoaHoc, taiKhoan: user.taiKhoan },
        { Authorization: `Bearer ${user.accessToken}` }
      )
        .then((rs) => {
          successApi("KHÓA HỌC CỦA BẠN ĐANG ĐƯỢC CHỜ XÉT DUYỆT!!").then(() => {
            dispatch({
              type: actionTypes.RELOAD_CART,
            });
            history.push("/home");
          });
        })
        .catch((err) => {
          errorApi(err);
        });
    });
  };
};

export const actDeleteIntoCart = (maKhoaHoc) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELETE_INTO_CART,
      maKhoaHoc,
    });
  };
};

export const actAddNewCourse = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi(
      "QuanLyKhoaHoc/ThemKhoaHoc",
      "POST",
      {
        ...data,
        ngayTao: "10/11/1999",
        taiKhoanNguoiTao: userAdmin.taiKhoan,
        maNhom: "GP01",
      },
      {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      }
    )
      .then((rs) => {
        console.log(rs);
        successApi("THÊM KHÓA HỌC THÀNH CÔNG").then(() => {
          dispatch({
            type: actionTypes.ADD_NEW_COURSE,
            data: {
              ...rs.data,
              nguoiTao: {
                taiKhoan: userAdmin.taiKhoan,
                hoTen: userAdmin.hoTen,
                maLoaiNguoiDung: "GV",
                tenLoaiNguoiDung: "Giáo vụ",
              },
              danhMucKhoaHoc: {
                maDanhMucKhoaHoc: rs.data.maDanhMucKhoaHoc,
                tenDanhMucKhoaHoc: rs.data.maDanhMucKhoaHoc,
              },
            },
          });
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};

export const actDeleteCourseApi = (maKhoaHoc) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi(`QuanLyKhoaHoc/XoaKhoaHoc?MaKhoaHoc=${maKhoaHoc}`, "DELETE", null, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        successApi("XÓA KHÓA HỌC THÀNH CÔNG").then(() => {
          dispatch({
            type: actionTypes.DELETE_COURESE,
            maKhoaHoc,
          });
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};

export const actEditCourse = (data) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.EDIT_COURSE,
      data,
    });
  };
};

export const actUpdateCourse = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi(
      "QuanLyKhoaHoc/CapNhatKhoaHoc",
      "PUT",
      {
        ...data,
        ngayTao: "12/1/2019",
        taiKhoanNguoiTao: userAdmin.taiKhoan,
        maNhom: "GP01",
      },
      {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      }
    )
      .then((rs) => {
        successApi("SỬA KHÓA HỌC THÀNH CÔNG").then(() => {
          dispatch({
            type: actionTypes.UPDATE_COURSE,
            data: {
              ...rs.data,
              nguoiTao: {
                taiKhoan: userAdmin.taiKhoan,
                hoTen: userAdmin.hoTen,
                maLoaiNguoiDung: "GV",
                tenLoaiNguoiDung: "Giáo vụ",
              },
              danhMucKhoaHoc: {
                maDanhMucKhoaHoc: rs.data.maDanhMucKhoaHoc,
                tenDanhMucKhoaHoc: rs.data.maDanhMucKhoaHoc,
              },
            },
          });
          $("#modelId").modal("hide");
        });
      })
      .catch((err) => {
        errorApi(err);
      });
  };
};

export const actGetListUserRegisterApi = (maKhoaHoc) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi(
      "QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc",
      "POST",
      { maKhoaHoc },
      {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      }
    )
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_LIST_USER_REGISTER,
          listUserRegister: rs.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const actGetListUserWaitingApi = (maKhoaHoc) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi(
      "QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet",
      "POST",
      { maKhoaHoc },
      {
        Authorization: `Bearer ${userAdmin.accessToken}`,
      }
    )
      .then((rs) => {
        dispatch({
          type: actionTypes.GET_LIST_USER_WAITING,
          listUserWaiting: rs.data,
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};
export const actAcceptUserRegisterApi = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/GhiDanhKhoaHoc", "POST", data, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        successApi("ĐÃ GHI DANH HỌC VIÊN").then(() => {
          dispatch({
            type: actionTypes.DELETE_USER_REGISTER,
            data: data.taiKhoan,
          });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const actRejectUserRegisterApi = (data) => {
  const userAdmin = JSON.parse(localStorage.getItem("userAdmin"));
  return (dispatch) => {
    callApi("QuanLyKhoaHoc/HuyGhiDanh", "POST", data, {
      Authorization: `Bearer ${userAdmin.accessToken}`,
    })
      .then((rs) => {
        successApi("ĐÃ HỦY GHI DANH HỌC VIÊN").then(() => {
          dispatch({
            type: actionTypes.DELETE_USER_REGISTER,
            data: data.taiKhoan,
          });
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
};

export const actFilterListCourse =
  (listCourse, cateCode, keyword, sortBy) => (dispatch) => {
    console.log(sortBy);
    if (cateCode) {
      listCourse = listCourse.filter(
        (item) => item.danhMucKhoaHoc.maDanhMucKhoahoc === cateCode
      );
    }

    if (keyword) {
      listCourse = listCourse.filter(
        (item) =>
          item.tenKhoaHoc.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      );
    }

    if (sortBy) {
      switch (sortBy) {
        case SORT_AZ:
          listCourse = SortAZ(listCourse);
          break;
        case SORT_PRICE_ASC:
          listCourse = SortIncreasePrice(listCourse);
          break;
        case SORT_PRICE_DESC:
          listCourse = SortDecreasePrice(listCourse);
          break;
      }
    }

    dispatch({
      type: actionTypes.FILTER_LIST_COURSE,
      payload: listCourse,
    });
  };

const compareSort = (a, b) => {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
};

const SortAZ = (listCourse) =>
  listCourse.sort((a, b) =>
    compareSort(a.tenKhoaHoc.toUpperCase(), b.tenKhoaHoc.toUpperCase())
  );

const SortIncreasePrice = (listCourse) =>
  listCourse.sort((a, b) => compareSort(a.fee, b.fee));

const SortDecreasePrice = (listCourse) =>
  listCourse.sort((a, b) => compareSort(a.fee, b.fee)).reverse();
