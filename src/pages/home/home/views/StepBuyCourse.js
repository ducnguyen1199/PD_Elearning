import React, { useEffect } from "react";
import AOS from "aos";
import "Stepbuycourse.scss";
const StepBuyCourse = () => {
  useEffect(() => {
    AOS.init();
  });
  return (
    <section
      className="stepbuycourse text-center"
      style={{
        backgroundImage: "url('./img/group-3.png')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
      }}
    >
      <h3
        className="title"
        data-aos-delay="100"
        data-aos="zoom-in"
        data-aos-duration="600"
      >
        Register your course in Four <br />
        simple steps
      </h3>
      <div
        className="content"
        data-aos-delay="700"
        data-aos="zoom-out"
        data-aos-duration="600"
      >
        <div className="step-group">
          <div>
            1<br />
            STEP
          </div>
          <p>
            Choose <br />
            the course
          </p>
        </div>
        <div className="line"></div>
        <div className="step-group">
          <div>
            2<br />
            STEP
          </div>
          <p>
            Add
            <br />
            shopping cart
          </p>
        </div>
        <div className="line"></div>
        <div className="step-group">
          <div>
            3<br />
            STEP
          </div>
          <p>
            Pay
            <br />
            your course
          </p>
        </div>
        <div className="line"></div>
        <div className="step-group">
          <div>
            4<br />
            STEP
          </div>
          <p>
            Check
            <br />
            your course
          </p>
        </div>
      </div>
    </section>
  );
};
export default StepBuyCourse;
