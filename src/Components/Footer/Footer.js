import React from "react";
import "./Footer.css";
import buttonIcon from "../../Assets/Bold-Arrow-Right.svg";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="section twbground" style={{ height: "fit-content" }}>
      <div className="section_container">
        <div className="contents home_sixth">
          <div className="start_a_project_panel">
            <h1>
              Do you want to join us?<br></br> Let’s work together.
            </h1>
            <div className="btn">
              <Link to="/login">
                <div className="Start_a_project_btn">
                  <p className="btn_text">Start Trading</p>
                  <img src={buttonIcon} alt="button icon"></img>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex fdcolumn hfc jcsevenly">
            <div className="flex fdrow footer_btn">
              <div className="get_in_touch_btn">
                <h1>
                  Get in<br></br>touch
                </h1>
              </div>

              <div className="socials">
                <div className="footer_btn">
                  {/* <a href="mailto:accountcenter@xtbmarket.io?subject=Hello%20Rebbon%20Tech&body=My%20name%20is"> */}
                  <a href="mailto:accountcenter@xtbmarket.io?subject=Hello%XTB%20Market&body=I%20">
                    <div className="socials_btn">
                      <p className="btn_text">hello@xtbmarket.io</p>
                    </div>
                  </a>
                </div>
                <div className="socials_btn_container">
                  <form className="fdcolumn" style={{ width: "100%" }}>
                    <p>subscribe to our newsletter</p>
                    <input className="inp" type={"email"} />
                    <div className="subbtn">Submit</div>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex rights_and_privacy">
              <p>
                © XTB Market.Co 2023. All rights reserved. <p>Privacy policy</p>
                <p>For Enquires: +44 7418372824</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
