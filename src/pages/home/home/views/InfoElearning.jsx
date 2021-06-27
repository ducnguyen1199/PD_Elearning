import React, { useEffect, useRef, useState } from "react";
import CountUp from "../components/CountUp";

const InfoElearning = () => {
  const ref = useRef();
  const [scrollTop, setScrollTop] = useState(0);
  const [isReset, setIsReset] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    });
  }, []);

  useEffect(() => {
    if (window.pageYOffset >= ref.current.offsetTop - 500) {
      setIsReset(true);
    } else {
      setIsReset(false);
    }
  }, [scrollTop]);

  return (
    <section
      className="info-elearning"
      style={{ backgroundImage: "url('./img/bg-info-elearning.jpg')" }}
      ref={ref}
    >
      <div
        className="ie-overflow"
        style={{ backgroundImage: "url('./img/bg-2.png')" }}
      ></div>
      <div className="ie-content">
        <div className="icon-group">
          <i className="fa fa-edit" aria-hidden="true"></i>
          <div className="name-icon">Teachers</div>
          <CountUp end={100} isReset={isReset} setIsReset={setIsReset} />
        </div>
        <div className="icon-group">
          <i className="fa fa-book"></i>
          <div className="name-icon">Lessons</div>
          <CountUp end={1000} isReset={isReset} setIsReset={setIsReset} />
        </div>
        <div className="icon-group">
          <i className="fa fa-mortar-board"></i>
          <div className="name-icon">Students</div>
          <CountUp end={999} isReset={isReset} setIsReset={setIsReset} />
        </div>
      </div>
    </section>
  );
};

export default InfoElearning;
