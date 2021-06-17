import Aos from "aos";
import React from "react";
import "./Feel.scss";
const Feel = () => {
  Aos.init();
  return (
    <section
      className="feel"
      data-aos-delay="300"
      data-aos="zoom-in"
      data-aos-duration="600"
    >
      <h3 className="title">user comments</h3>
      <div className="main-content">
        <div id="feel-user" className="carousel slide" data-ride="carousel">
          <div className="carousel-indicators">
            <div
              className="img-info active"
              data-target="#feel-user"
              data-slide-to={0}
            >
              <div className="overflow"></div>
              <img src="./img/feel-1.jpg" alt="" />
            </div>
            <div
              className="img-info"
              data-target="#feel-user"
              data-slide-to={1}
            >
              <div className="overflow"></div>
              <img src="./img/feel-2.jpg" alt="" />
            </div>
            <div
              className="img-info"
              data-target="#feel-user"
              data-slide-to={2}
            >
              <div className="overflow"></div>
              <img src="./img/feel-3.jpg" alt="" />
            </div>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="content">
                “ Less is more applies to eLearning too. More content, more
                flashy technology, and more ideas stuffed into a single
                presentation is a sure recipe for disaster. Instead of drowning
                students in a sea of content, why not keep stick to one idea and
                help them understand it deeply?. ”
              </div>
              <div className="info">
                <p>
                  _Jack, <span>CEO</span>
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="content">
                “ Less is more applies to eLearning too. More content, more
                flashy technology, and more ideas stuffed into a single
                presentation is a sure recipe for disaster. Instead of drowning
                students in a sea of content, why not keep stick to one idea and
                help them understand it deeply?. ”
              </div>
              <div className="info">
                <p>
                  _Long Black, <span>Developer</span>
                </p>
              </div>
            </div>
            <div className="carousel-item">
              <div className="content">
                “ Less is more applies to eLearning too. More content, more
                flashy technology, and more ideas stuffed into a single
                presentation is a sure recipe for disaster. Instead of drowning
                students in a sea of content, why not keep stick to one idea and
                help them understand it deeply?. ”
              </div>
              <div className="info">
                <p>
                  _Jenny Kita, <span>CEO</span>
                </p>
              </div>
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#feel-user"
            role="button"
            data-slide="prev"
          >
            <i className="fa fa-angle-left"></i>
          </a>
          <a
            className="carousel-control-next"
            href="#feel-user"
            role="button"
            data-slide="next"
          >
            <i className="fa fa-angle-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Feel;
