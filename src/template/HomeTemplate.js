import React, { Fragment, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLayout = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};
export default function HomeTeamplate({ Component, ...props }) {
  return (
    <HomeLayout>
      <Route
        {...props}
        render={(propsCompnent) => (
          <Component propsCompnent={{ ...propsCompnent }} />
        )}
      />
    </HomeLayout>
  );
}
