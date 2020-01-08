import React, { Component, Fragment } from 'react';
import { NavLink } from "react-router-dom";
import AOS from "aos";
import Loading from "../../../components/Loading";
export default class About extends Component {
    componentDidMount() {
        AOS.init();
    }
    render() {
        return (
            <Fragment>
                <Loading />

                <section className="About-page " >
                    <div className="wrap-head">
                        <div
                            className=" header-head"
                            style={{
                                backgroundImage: "url('../../img/17.jpg')",
                            }}
                        >
                            <div className="overflow" style={{ backgroundImage: "url('../../img/bg-2.png')" }}></div>
                            <div className="title detail-course">
                                <span>ABOUT</span>
                                <h4>
                                    <NavLink to="/home">Trang chủ</NavLink> / <span>About</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="wrap-about-page">
                        <div className="About-welcome">
                            <div className="About-welcome-head" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1500">
                                <h2>WELCOME</h2>
                                <div className="bottom-line"></div>
                                <p>
                                    Chúng tôi là PD-team-một phần của OOT-IT-TEAM bao gồm 2 Front-end developer là Phong và Đức.
                        </p>
                            </div>

                            <div className="PD-team-img" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="1500"
                            >
                                <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/78680406_424307555140863_4751269242911850496_n.png?_nc_cat=107&_nc_ohc=4hvDXjqRXaQAQm9Iq5g2Hb7CEjdB0b5C3BTMetR6kRR9Ea3ty_g2YDPIA&_nc_ht=scontent.fsgn2-1.fna&oh=a2c3c2cc2eac15a1eabba6cf6d3decb8&oe=5E73DD0D" />
                            </div>
                        </div>
                        <div className="About-process">
                            <div className="row">
                                <div className="col-12 col-md-8 our-process" data-aos="fade-down-right" data-aos-duration="1000"
                                >
                                    <div className="our-process-wrap">
                                        <h3>
                                            Vài lời về chúng tôi
                                    </h3>
                                        <p>
                                            Chào các bạn , chúng tôi là sinh viên của trường Đại Học Công Nghệ Thông tin (UIT) đồng thời cũng là học viên của Cybersoft Academy. Qua nhiều lần ăn hành ngập mồm vì n bug trong khi hoàn thành dự án và nhiều lần giao tiếp với nhau bằng tần số 39hz, cuối cùng thì chúng tôi cũng sứt đầu mẽ tráng hoàn thành hai đồ án xây dựng Website PD-Elearning(ReactJS) và PD-Cinema(Angular). Các bạn có thể xem Video Demo của chúng tôi ở bên góc phải màn hình.
                                </p>
                                    </div>

                                </div>
                                <div className="col-12 col-md-4 our-process-video" data-aos="fade-up-left" data-aos-duration="1000">
                                    <div className="video" data-aos="fade-down-left" data-aos-duration="1000">
                                        <iframe src="https://www.youtube.com/embed/bxtMvIDLu2Q" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <div className="video" >
                                        <iframe src="https://www.youtube.com/embed/Nr6FdfxrC_w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="Our-team-mate">
                            <div className="team-mate-tittle" data-aos="fade-up" data-aos-duration="1000">
                                <h3>Đồng đội của chúng tôi</h3>
                                <p>
                                    Team chúng tôi gồm 5 người
                            </p>
                            </div>
                            <div className="row team-mate-img" data-aos="zoom-in-up" data-aos-duration="1000">
                                <div className="col-4 col-sm  wrap-item">
                                    <div className="item-team-mate">
                                        <img src="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.15752-9/79306432_1188478138025920_2920978816736165888_n.jpg?_nc_cat=107&_nc_ohc=gyqCp3j8FOkAQmRke2iGVaIBmoF09ypJbfJeSCpYpn8h0zFoa1KxBli7Q&_nc_ht=scontent.fsgn2-1.fna&oh=7bcc893b57259deb4aa06a16bb1184e7&oe=5E7F1A4A" />
                                        <div className="overlay-item-info">
                                            <span>Thanh Phong</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-4 col-sm wrap-item">
                                    <div className="item-team-mate">
                                        <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.15752-9/69742186_386209878749620_8591653845933752320_n.jpg?_nc_cat=110&_nc_ohc=WkNjYYfJ63EAQlYycZ60OpSH0mz44yYf1-ed-DcjFVOycU9UQjEUWa_ng&_nc_ht=scontent.fsgn2-3.fna&oh=e4d3c03276da6a3cc6dea0b4f6efe4a7&oe=5E7FF852" />
                                        <div className="overlay-item-info">
                                            <span>Công Đức</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-4 col-sm wrap-item">
                                    <div className="item-team-mate">
                                        <img src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/78628049_471140443604793_3099336439033233408_n.jpg?_nc_cat=109&_nc_ohc=Z-l25-H9llgAQnAWvLsY_hWh3f7BR8QoA1CxiVLdZoaa997JAzxtNGrJw&_nc_ht=scontent.fsgn2-4.fna&oh=b2fffd1ef73330bb87cfc387bbf8e72d&oe=5E877740" />
                                        <div className="overlay-item-info">
                                            <span>Đức Nghĩa</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm wrap-item">
                                    <div className="item-team-mate">
                                        <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/31489669_2237296989839639_7265099896020008960_n.jpg?_nc_cat=108&_nc_ohc=e7K5UQXhTN8AQkR9R7F7yY-B5KNnf5l7SrVDe8-oWV2WhsOXaa0gkHIZA&_nc_ht=scontent.fsgn2-3.fna&oh=982921bd84d9b033af6e90c79c287819&oe=5E83F42F" />
                                        <div className="overlay-item-info">
                                            <span>Văn Minh</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 col-sm wrap-item">
                                    <div className="item-team-mate">
                                        <img src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.15752-9/79687985_2548826808519004_8944189833945808896_n.jpg?_nc_cat=103&_nc_ohc=EYGMI6ouC1YAQn7qQIjS9f9oE5Vyfu4daQcTWeZD2OlTQeQX54WA1X22A&_nc_ht=scontent.fsgn2-2.fna&oh=d430029f0cf9178fca90a04a7efc3c43&oe=5E798D58" />
                                        <div className="overlay-item-info">
                                            <span>Phương Phi</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="contact-us">
                            <div className="contact-us-tittle" data-aos="fade-up" data-aos-duration="1000">
                                <h3>Thực hiện PD-Elearning</h3>
                                <p>
                                    Chúng tôi cùng nhau tạo nên PD-Elearning
                            </p>
                            </div>
                            <div className="row contact-item">
                                <div className="col-12 col-sm-4 " data-aos="zoom-in-right" data-aos-duration="1000">
                                    <div className="avatar">
                                        <img src="https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.0-9/s960x960/52327095_1233788783446926_2006375065880363008_o.jpg?_nc_cat=101&_nc_ohc=8SPcecWl-8kAQmec33cZ00Mbtl4PA9GX-KpZEN0YiKuMl5-lUJhA8QRBw&_nc_ht=scontent.fsgn2-4.fna&oh=7403a06f8d354c1e88231eba7bebc3fa&oe=5E808149" />
                                    </div>

                                </div>
                                <div className="col-12 col-sm-8">
                                    <div className="infomation" data-aos="zoom-in-left" data-aos-duration="1000">
                                        <div className="infomation-content">
                                            <h3 className="title">
                                                Nguyễn Công Đức
                                </h3>
                                            <p>
                                                Chết một đống còn hơn sống một mình <br />
                                                Luôn luôn lắng nghe, lâu lâu mới hiểu <br />
                                                Nếu không có gì thay đổi thì... hết nay sẽ đến mai!
                                        <br />Đặt sự an toàn vào hành động - xương đòn sẽ không bao giờ thay thế xương sống <br />
                                                Tình chỉ đẹp khi tiền còn đầy túi. Đời bớt vui khi túi đã cạn bớt tiền <br />
                                                Không được xoắn trước gái quá xinh, không được phép hạ mình trước gái chảnh <br />

                                                -THANH NIÊN NGHIÊM TÚC-
                                </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="row contact-item">
                                <div className="col-12 col-sm-8 ">
                                    <div className="infomation" data-aos="zoom-in-right" data-aos-duration="1000">
                                        <div className="infomation-content">
                                            <h3 className="title">
                                                Trần Thanh Phong
                                </h3>
                                            <p>
                                                Đời cho ta quá nhiều thứ, <br />ta chưa cho đời được nhiều
                                    <br />
                                                Đến bây giờ vẫn chưa học được cách làm sao để lời được nhiều
<br />
                                                Mười năm như một bức hoạ, cũng may là trời đỡ xám hơn
<br />
                                                Thứ mà ta học được nhiều nhất, là cách xin lỗi và lời cảm ơn
                                </p>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-12 col-sm-4 " data-aos="zoom-in-left" data-aos-duration="1000">
                                    <div className="avatar">
                                        <img src="https://scontent.fsgn2-2.fna.fbcdn.net/v/t1.0-9/76760078_2120431401393796_1251391760240738304_n.jpg?_nc_cat=100&_nc_ohc=KzxLHKYehykAQlDdU7ONcLnKcc3eTnTwLDKQr5oC71wzgnVCaYfgx7rxg&_nc_ht=scontent.fsgn2-2.fna&oh=ebebe676754d7054f116427e00efd876&oe=5E8B4C54" />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="loaction-to-code">
                            <div className="location-title" data-aos="fade-up" data-aos-duration="1000">
                                <h3>
                                    Đây là nơi mà chúng tôi làm việc
                            </h3>
                                <p>
                                    Caffe-Kun - 80 đường số 6, p.Linh Trung, Thủ đức
                        </p>
                            </div>

                            <div className="google-map" data-aos="flip-down" data-aos-duration="1000">
                                <div className="row">
                                    <div className="col-5">
                                        <div className="location-img">
                                            <img src="https://scontent.fsgn2-3.fna.fbcdn.net/v/t1.0-9/60925028_326416514644640_1579520926578376704_n.jpg?_nc_cat=110&_nc_ohc=UDcDzIQA84UAQmg5NBgdfXFqWnyZe-meAP8IzZJhASMiXgzGV7r_YsDgQ&_nc_ht=scontent.fsgn2-3.fna&oh=ac18537a53e982a3f2fbb98b7b609690&oe=5E7470FA" />
                                        </div>
                                    </div>
                                    <div className="col-7">
                                        <div className="location-iframe">
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1959.187210907478!2d106.7659058!3d10.8591002!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175279cf4a2b567%3A0x220ab8ebab535801!2zODAgxJDGsOG7nW5nIFPhu5EgNiwgUGjGsOG7nW5nIExpbmggVHJ1bmcsIFRo4bunIMSQ4bupYywgSOG7kyBDaMOtIE1pbmg!5e0!3m2!1svi!2s!4v1575699449183!5m2!1svi!2s" frameBorder={0} style={{ border: 0 }} allowFullScreen />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> </Fragment>
        )
    }
}
