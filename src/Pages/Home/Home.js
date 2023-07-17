import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import buttonIcon from "../../Assets/Bold-Arrow-Right.svg";
import Showcase from "../../Assets/Showcase.png";
import forex from "../../Assets/forex.png";
import buildingOne from "../../Assets/buildingOne.png";
import buildingTwo from "../../Assets/buildingTwo.png";
import Footer from "../../Components/Footer/Footer";
import SmallCard from "./components/SmallCard/SmallCard";
import bondsImg from "../../Assets/img/bonds.png";
import commoditiesImg from "../../Assets/img/commodities.png";
import cert from "../../Assets/img/cert.png";
import digitalImg from "../../Assets/img/digital_curr.png";
import forexImg from "../../Assets/img/forexx.png";
import indicesImg from "../../Assets/img/indices.png";
import metalsImg from "../../Assets/img/metals.png";
import sharesImg from "../../Assets/img/shares.png";
import CryptoStrip from "./components/CryptoStrip/CryptoStrip";
import PlanCard from "./components/PlanCard/PlanCard";
import SimpleMap from "../../Components/Map";
import { Link } from "react-router-dom";

const Home = ({ revealAnimation }) => {
  let [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    diagramAnimation();
  }, [currentText]);

  function diagramAnimation() {
    var diagramtext = document.querySelectorAll(".diaani");
    var diagramline = document.querySelectorAll(".dialiani");

    if (currentText === 0) {
      diagramtext[currentText].classList.add("highlight");
      diagramline[currentText].classList.add("chighlight");
      setTimeout(() => setCurrentText(1), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 1) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(2), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 2) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(3), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 3) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(4), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
      setTimeout(
        () => diagramline[currentText + 1].classList.add("chighlight"),
        3000
      );
      setTimeout(
        () => diagramline[currentText].classList.remove("chighlight"),
        3000
      );
    } else if (currentText === 4) {
      diagramtext[currentText].classList.add("highlight");
      setTimeout(() => setCurrentText(0), 2000);
      setTimeout(
        () => diagramtext[currentText].classList.remove("highlight"),
        2000
      );
    }
  }

  window.addEventListener("scroll", revealAnimation());
  return (
    <div>
      <div className="home">
        <div className="section mnbground first_section backk">
          <div className="section_container fdcolumn">
            <div className="contents home_first">
              <div className="">
                <h1 className="slogan_h1 colorchange">
                  <span>Trade</span> Forex<span>,</span>
                  Indices<span>,</span> Commodities<span>,</span> Cypto
                  <span> & more...</span>
                </h1>
              </div>
              <div className="">
                <p className="what_we_do_p">Start trading in minutes!</p>
              </div>
              <div className="btn">
                <Link to="/login">
                  <div className="Start_a_project_btn">
                    <p className="btn_text">Start Trading</p>
                    <img src={buttonIcon} alt="button icon"></img>
                  </div>
                </Link>
              </div>
            </div>
            <div className="star_container">
              <div className="">
                <img className="" src={forex} alt="star two" />
              </div>
            </div>
          </div>
        </div>

        <div className="section second_section">
          <div className="section_container">
            <div className="contents home_second">
              <h1>
                What you can <span>Trade With Xtb Market?</span>
              </h1>
              <div className="small_card_container">
                <SmallCard
                  img={forexImg}
                  title="Forex"
                  text="60+ forex currency pairs on MT4"
                />
                <SmallCard
                  img={sharesImg}
                  title="Shares"
                  text="More than 10,000 stocks on global exchanges"
                />
                <SmallCard
                  img={indicesImg}
                  title="Indices"
                  text="19 major global indices"
                />
                <SmallCard
                  img={commoditiesImg}
                  title="Commodities"
                  text="Coffee, natural gas, corn & more"
                />
                <SmallCard
                  img={bondsImg}
                  title="Bonds"
                  text="US10YR & UK Long Gilt Futures GILT"
                />
                <SmallCard
                  img={metalsImg}
                  title="Metals"
                  text="Gold, oil, silver & more"
                />
                <SmallCard
                  img={digitalImg}
                  title="Digital Currencies"
                  text="Bitcoin, Ethereum, Ripple, Bitcoin Cash, Litecoin"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="section second_section">
          <div className=" h100p our_cus">
            <div>
              <h5>RUNNING DAYS</h5>
              <p>986 DAYS</p>
            </div>
            <div>
              <h5>TOTAL INVESTORS</h5>
              <p>164663</p>
            </div>
            <div>
              <h5>TOTAL INVESTED</h5>
              <p>$ 5,534,563</p>
            </div>
            <div>
              <h5>TOTAL WITHDRAWN</h5>
              <p>$ 435,756,453</p>
            </div>
          </div>
        </div>

        <div className="section twbground">
          <div className="section_container">
            <div className="contents home_third hfc">
              <div className="flex hfc home_third_container">
                <div className="ourapproach">
                  <div className="ourapproach_text  reveal fade-bottom">
                    <p>
                      We have professional traders and world class Trading AIs
                      that run our automated trading. Our AIs and brokers have
                      proven time and time again to make us more resources in
                      folds.
                    </p>
                  </div>
                  <div className="ourapproach_btn  reveal fade-top">
                    <p>Our approach</p>
                    <div className="line"></div>
                  </div>
                </div>
                <div className="ourapproach_diagram">
                  <div className="dia">
                    <div className="diagram_container  reveal rotate-left-small">
                      <div className="diagram_contents">
                        <p className="discover diaani">Get here</p>
                        <div className="curveOne">
                          <svg
                            width="109"
                            height="73"
                            viewBox="0 0 109 73"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dialiani"
                              d="M2.08433 0.428406C-1.41576 11.9284 87.5843 27.9284 108.084 71.9284"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>

                        <p className="define diaani">Register</p>
                        <div className="curveTwo">
                          <svg
                            width="114"
                            height="83"
                            viewBox="0 0 114 83"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dialiani"
                              d="M1.08447 0.428406C10.5845 60.4284 84.1845 33.2284 112.584 82.4284"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>

                        <p className="design diaani">Deposit</p>
                        <div className="curveThree">
                          <svg
                            width="166"
                            height="77"
                            viewBox="0 0 166 77"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dialiani"
                              d="M164.084 0.928406C164.084 65.4284 9.18447 7.92841 1.58447 75.9284"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>

                        <p className="develop diaani">Wait</p>
                        <div className="curveFour">
                          <svg
                            width="141"
                            height="104"
                            viewBox="0 0 141 104"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="dialiani"
                              d="M1.58447 0.928406C1.91781 41.2617 30.1845 117.428 140.584 99.4284"
                              stroke="black"
                              stroke-width="2"
                            />
                          </svg>
                        </div>

                        <p className="launch diaani">Withdraw</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section mnbground" style={{ height: "fit-content" }}>
          <div className="section_container backktwo">
            <div className="contents home_fourth">
              <div className="flex hfc fdcolumn  reveal fade-top">
                <h1>Our Plans</h1>
                <div
                  className="fdrow jcsevenly"
                  style={{ gap: "2rem", flexWrap: "wrap" }}
                >
                  <PlanCard
                    color={"#b41414"}
                    title={"Basic"}
                    cost={1000}
                    interest={200}
                    min={300}
                    max={1999}
                    duration={24}
                  />
                  <PlanCard
                    color={"#35b6b8"}
                    title={"Standard"}
                    cost={3000}
                    interest={300}
                    min={3000}
                    max={7499}
                    duration={24}
                  />
                  <PlanCard
                    color={"#ba8318"}
                    title={"Gold"}
                    cost={5000}
                    interest={400}
                    min={5000}
                    max={19999}
                    duration={24}
                  />
                  <PlanCard
                    color={"#262424"}
                    title={"Platinum"}
                    cost={10000}
                    interest={400}
                    min={10000}
                    max={"Unlimited"}
                    duration={24}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section second_section">
          <div className="section_container">
            <div
              style={{ paddingBottom: "6rem" }}
              className="contents home_second"
            >
              <h1
                style={{
                  marginBottom: "2rem",
                  marginTop: "2rem",
                }}
              >
                Why<span> Xtb Market?</span>
              </h1>
              <div className="doc" style={{ marginTop: "2rem" }}>
                <div
                  className="fdrow jcsb gap1 fww"
                  style={{ marginBottom: "1rem" }}
                >
                  <div className="did">
                    <h5 style={{ textAlign: "left" }}>Legal Company</h5>
                    <p style={{ textAlign: "justify" }}>
                      Xtb Market is an company registered in the United Kingdom,
                      providing its investment services to the members all
                      around the world.
                    </p>
                  </div>
                  <div className="did">
                    <h5 style={{ textAlign: "right" }}>Customer Support</h5>
                    <p style={{ textAlign: "justify" }}>
                      We understand how important having reliable support
                      service is to you. Please don't hesitate to contact us
                      should you have any questions or concerns and we will get
                      back to you in no time.
                    </p>
                  </div>
                </div>
                <div className="fdrow jcsb gap1 fww">
                  <div className="did">
                    <h5 style={{ textAlign: "left" }}>Security</h5>
                    <p style={{ textAlign: "justify" }}>
                      All data on financial operations as well as personal data
                      are effectively protected with EV SSL certificates and
                      additional services on encryption of data transfer.
                    </p>
                  </div>
                  <div className="did">
                    <h5 style={{ textAlign: "right" }}>Privacy</h5>
                    <p style={{ textAlign: "justify" }}>
                      We don't require identity verification. Information about
                      your activity on the website is private and can't be
                      accessed by third parties.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section pebground" style={{ height: "fit-content" }}>
          <div className="section_container">
            <div className="contents home_fifth">
              <h1 className="reveal fade-bottom">
                Producing millioniares with our high-end AI and traditional
                method of trading and investmemt strategies.
              </h1>
              <div className="flex hfc building_container">
                <div className="buildingOne_image reveal fade-bottom">
                  <img src={buildingOne} alt="building one" />
                </div>

                <div className="building">
                  <div className="building_text_container">
                    <div className="building_text">
                      <p className="reveal fade-bottom">
                        Xtb Market is a legally operating company. Xtb Market is
                        a leading blockchain investment company. Our mission is
                        to act as a catalyst for universal adoption and
                        blockchain innovation.
                      </p>
                    </div>
                    <div className="building_btn">
                      <Link to={"/about"}>
                        <p className="reveal fade-bottom">About Us</p>
                      </Link>
                      <div className="line"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="buildingTwo_image reveal fade-bottom">
                <img src={buildingTwo} alt="building two" />
              </div>
            </div>
          </div>
        </div>

        {/* <div className="section second_section">
          <div className="section_container">
            <div className="contents home_second">
              <h1>
                Xtb Market <span>Copytrade</span>
              </h1>
              <div style={{ marginTop: "1rem" }}></div>
              <p style={{ textAlign: "center" }}>
                Our copytrade system helps you model expert in the fields and
                show you how to replicate their results
              </p>
              <h1>
                Xtb Market <span>Investment</span>
              </h1>
              <div style={{ marginTop: "1rem" }}></div>
              <p style={{ textAlign: "center" }}>
                Investing is Xtb Market helps you grow your finance by 99.4%
                from the very first week!
              </p>
              <h1>
                Xtb Market <span>Hih ROI</span>
              </h1>
              <div style={{ marginTop: "1rem" }}></div>
              <p style={{ textAlign: "center" }}>
                With our high return on investment, customers are able to bounce
                back from their financial ditch
              </p>
              <div style={{ marginBottom: "1rem" }}></div>
            </div>
          </div>
        </div> */}

        <div className="section pebground" style={{ height: "fit-content" }}>
          <div className="section_container">
            <div className="contents home_fifth coll">
              <div className="collapsee">
                <iframe
                  width="100%"
                  height="100%"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    border: "10px solid #FFF",
                    borderRadius: "3px",
                  }}
                  src="https://www.youtube.com/embed/NhFlqFVBmxc"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="collapsee">
                <iframe
                  width="100%"
                  height="100%"
                  style={{
                    maxWidth: "100%",
                    border: "10px solid #FFF",
                    borderRadius: "3px",
                  }}
                  src="https://www.youtube.com/embed/p7HKvqRI_Bo"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        <div className="section pebground" style={{ height: "fit-content" }}>
          <div className="section_container">
            <div className="contents home_fifth coll">
              <div className="collapsee">
                <iframe
                  width="100%"
                  height="100%"
                  style={{
                    maxWidth: "100%",
                    border: "10px solid #FFF",
                    borderRadius: "3px",
                  }}
                  src="https://www.youtube.com/embed/GmOzih6I1zs"
                  frameborder="0"
                  allow="autoplay; encrypted-media"
                  allowfullscreen
                ></iframe>
              </div>
              <div className="collapsee">
                <img className="" src={cert} alt="cert" />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <CryptoStrip />
    </div>
  );
};

export default Home;
