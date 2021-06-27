import React from "react";
import Intro from "./views/Intro";
import Category from "./views/Category";
import StepBuyCourse from "./views/StepBuyCourse";
import ListCourse from "./views/ListCourse";
import InfoElearning from "./views/InfoElearning";
import Feel from "./views/Feel";
import Loading from "../../../components/Loading";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  return (
    <>
      <Loading />
      <div className="home">
        <Intro />
        <Category />
        <ListCourse history={history} />
        <InfoElearning />
        <StepBuyCourse />
        <Feel />
      </div>
    </>
  );
};

export default Home;
