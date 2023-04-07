import React, { useEffect } from "react";
import img2 from "../../Assets/img/download (1).jpg";
import img3 from "../../Assets/img/download (2).jpg";
import img from "../../Assets/img/images (3).jpg";
import img4 from "../../Assets/img/images (2).jpg";
// import glow from "../../Assets/glow.svg";
// import gradient from "../../Assets/Gradients.svg";
import "./About.css";
import Footer from "../../Components//Footer/Footer";

export default function About({ revealAnimation }) {

  useEffect(() => {
    window.addEventListener("scroll", revealAnimation);
    return window.removeEventListener("scroll", revealAnimation);
  }, [])

  return (
    <div className="about">
      <div className="about_section mnbground about-uppersection">
        <div className="about_section_container h100p fdcolumn">
          <div className="content about_first">
            <h1 className="Title  reveal fade-top">
              We are<br></br>XTB Market.{" "}
            </h1>
          </div>
        </div>
        <div className="glow">
          <svg
            width="1187"
            height="1035"
            viewBox="0 0 1187 1035"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_f_2_3688)">
              <circle cx="395" cy="539" r="195" fill="#2BD4A4" />
            </g>
            <g filter="url(#filter1_f_2_3688)">
              <circle cx="691" cy="539" r="296" fill="#FFEF89" />
            </g>
            <g filter="url(#filter2_f_2_3688)">
              <circle cx="731" cy="395" r="195" fill="#89E3FF" />
            </g>
            <defs>
              <filter
                id="filter0_f_2_3688"
                x="0"
                y="144"
                width="790"
                height="790"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_2_3688"
                />
              </filter>
              <filter
                id="filter1_f_2_3688"
                x="195"
                y="43"
                width="992"
                height="992"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_2_3688"
                />
              </filter>
              <filter
                id="filter2_f_2_3688"
                x="336"
                y="0"
                width="790"
                height="790"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="100"
                  result="effect1_foregroundBlur_2_3688"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      <div className="about_section twbground origin-container">
        <div className="about_section_container h100p fdcolumn origin  reveal fade-left">
          <div className="content about_second">
            <h1>OUR ORIGIN STORY</h1>
            <div className="origin_p_scroll  t">
              <p>
                Our business was created to meet the need for simple,
                affordable, fast and secure managed services. <br></br>
                <br></br>
                The Investment Company, formally Xtb Market, was launch in 2019
                because our founder was tired of watching
                companies, Forex brokers and business owners struggle with
                ineffective and dated Investment methods and solutions, exorbitant prices and
                constant downtime.<br></br>
                <br></br>
                Today, we have become an industry trail blazing company
                specializing in hosted Infrastructure environments, outsourced
                technology solutions management and financial risk assessment.
                Our goal is to fulfil our clients needs in generating income
                in a short amount of time all over the world.
                <br></br>
                <br></br>
                Our passion for providing the best and fastest investmemt platform that give end-to-end solutions
                from strategy to payout and beyond has sustained the Investment
                Company’s sustainable growth since our founding. With a
                consistent retention rate and an uptime percentage that is as
                near perfect as you can get we believe our work speaks on our
                behalf.<br></br>
                <br></br>
                Our enterprise services span several corporate sectors and
                vertical markets, but we have achieved great success providing
                solutions in the Retail & Financial sectors specifically. Over
                time we have also invested and formed product relationships with
                large-scale software and product houses which enables us to
                translate value to our clients and provide best in market
                solutions.<br></br>
                <br></br>
                We have seen substantial growth in the past years, but our focus
                remains on serving our customers and providing the best
                solutions possible to them
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about_section cgbground drive-us-container">
        <div className="about_section_container h100p fdcolumn drive-us  reveal fade-bottom">
          <div className="content about_third">
            <h1>What Drives Us</h1>
            <div className="about_third_p_scroll">
              <p>
                Our mission is to act as a catalyst for universal adoption and blockchain innovation. We focus only on investing in cryptocurrency . Our team has experience in both traditional financing and emerging mining technology. We invest, among others, in cryptocurrencies such as BTC, XRP, ETC, and ETH. We also give a chance to new, dynamically developing ICO projects that bring huge profits in an amazingly short time.
                Our team consists only of qualified people connected with the financial industry for years, who are also passionate about the fledgling but very strong cryptocurrency market and mining technology. They constantly monitor the market to provide you - our investors with even greater profits. Having strong relationships with the most promising entrepreneurs and other leading investors in the industry, Xtb Market implements an investment strategy, building a diversified portfolio and adjusting the added value to its portfolio companies.
                Xtb Market uses advanced investment techniques, such as financial leverage, guarantees huge profits even at the currently fluctuating rate of cryptocurrencies, forex and stocks. When starting cooperation with us you have a 100% guarantee that you will not lose your funds, but you can only gain.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about_section mnbground about-team-container">
        <div className="about_section_container h100p fdcolumn about-team">
          <div className="align">
            <h1>Meet The Team</h1>
            <div className="team">
              <div className="left">
                {" "}
                <div className="person reveal fade-right">
                  <img src={img} alt="p" style={{ aspectRatio: "1" }} />
                  <div className="info">
                    <h4>tom jackson</h4>
                    <p>CEO</p>
                  </div>
                </div>
                <div className="person reveal fade-right">
                  <img src={img2} alt="p" style={{ aspectRatio: "1" }} />
                  <div className="info">
                    <h4>chloe sanders</h4>
                    <p>Admin Lead</p>
                  </div>
                </div>
              </div>
              <div className="right">
                <div className="person reveal fade-right">
                  <img src={img3} alt="p" style={{ aspectRatio: "1" }} />
                  <div className="info">
                    <h4>Jack hunter</h4>
                    <p>CTO</p>
                  </div>
                </div>
                <div className="person reveal fade-right">
                  <img src={img4} alt="p" style={{ aspectRatio: "1" }} />
                  <div className="info">
                    <h4>Tobi toni</h4>
                    <p>Chief financial officer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section twbground other-container">
        <div className="about_section_container h100p fdcolumn other reveal fade-top">
          <div className="content about_fifth">
            <h1>
              Optimized solutions with simple onboarding process to help us
              better understand and improve our client's needs.
            </h1>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
