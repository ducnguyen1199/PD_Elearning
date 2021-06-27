import React, { useEffect } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

const AdminLayout = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);
  return <>{props.children}</>;
};

export default function AdminTemplate({ Component, ...props }) {
  return (
    <AdminLayout>
      <Route
        {...props}
        render={(propsComponent) => {
          if (localStorage.getItem("userAdmin"))
            return <Component propsComponent={propsComponent} />;
          else {
            return <Redirect to="/admin" />;
          }
        }}
      />
    </AdminLayout>
  );
}
