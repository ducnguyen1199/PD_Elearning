import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";

const AdminLayout = props => {
  return <Fragment>{props.children}</Fragment>;
};

export default function AdminTemplate({ Component, ...props }) {
  return (
    <div className="admin">
      <Route
        {...props}
        render={propsComponent => {
          if (localStorage.getItem('userAdmin'))
            return <AdminLayout>
              <Component propsComponent={propsComponent} />
            </AdminLayout>
          else {
            return <Redirect to="/admin" />
          }
        }}
      />
    </div>
  );
}
