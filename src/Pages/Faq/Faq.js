import React, { useEffect } from "react";
import img from "../../Assets/img (15).jpg";
// import glow from "../../Assets/glow.svg";
// import gradient from "../../Assets/Gradients.svg";
import "./Faq.css";
import Footer from "../../Components/Footer/Footer";
import Faqbox from "./components/Faqbox";
import { Link } from "react-router-dom";

export default function Faq({ revealAnimation }) {
  useEffect(() => {
    window.addEventListener("scroll", revealAnimation);
    return window.removeEventListener("scroll", revealAnimation);
  }, []);

  return (
    <div className="about">
      <div className="about_section mnbground about-uppersection">
        <div className="about_section_container h100p fdcolumn">
          <div className="content about_first">
            <h1 className="Title  reveal fade-top">
              Frequenty<br></br>asked questions.{" "}
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
          <div className="content faq_second">
            <Faqbox
              title={"Is Xtb Market legit?"}
              text={
                <p>
                  Xtb Market is a legal investment company incorporated in the
                  United Kingdom.<br></br>Registration number: 11445991.
                  <br></br>Office address: 66 GREAT SUFFOLK STREET, LONDON,
                  UNITED KINGDOM, SE1 0BL.
                </p>
              }
            />
            <Faqbox
              title={"Who may be a client of Xtb Market?"}
              text={
                <p>
                  Everyone may be a client of xtbmarket.co, but he\she must be
                  not less 18 years old.
                </p>
              }
            />
            <Faqbox
              title={"How may I become a client of Xtb Market?"}
              text={
                <p>
                  You may become a client of Xtb Market and it is totally free
                  of charge. All you need is to{" "}
                  <Link to={"/register"}>open an account</Link> and fill all
                  required fields.
                </p>
              }
            />
            <Faqbox
              title={"Is it free of charge to open an account?"}
              text={<p>Yes, it is totally free of charge.</p>}
            />
            <Faqbox
              title={"I have trouble during registering. What shall I do?"}
              text={
                <p>
                  Check the entered information. Displayed errors can help you,
                  they show where you have made mistakes. Sometimes it could be
                  browser issue. Try to change your browser or turn off any
                  translator if you use it. If you need further assistance don't
                  hesitate to <Link to={"/contact"}>contact us</Link>.
                </p>
              }
            />
            <Faqbox
              title={"How long does it take to make my client account active?"}
              text={
                <p>
                  Your account will be active immediately after registration.
                </p>
              }
            />
            <Faqbox
              title={"How may I access my account?"}
              text={
                <p>
                  You may log into your account by clicking the link{" "}
                  <Link to={"/login"}>Login</Link> and enter your email and
                  password.
                </p>
              }
            />
            <Faqbox
              title={"How can I control my account?"}
              text={
                <p>
                  In order to control your account you need to use navigation
                  menu in the left side of our site.
                </p>
              }
            />
            <Faqbox
              title={"May I change my login data?"}
              text={
                <p>
                  You may change your password by clicking the link Settings tab
                  in the navigation menu (you need to be logged into your
                  account first). In order to change your payment accounts data
                  you need to <Link to={"/contact"}>contact</Link> our support
                  service.
                </p>
              }
            />
            <Faqbox
              title={"How secure user accounts and personal data?"}
              text={
                <p>
                  All stored data on our servers remains protected via
                  encryption technology all the time.
                  <br></br>All account related transactions done by our clients
                  are mediated exclusively via secured internet connections.
                </p>
              }
            />
            <Faqbox
              title={`What if I can't log into my account because I forgot my password?`}
              text={
                <p>
                  On the login page, type your email and click Forget password
                  recovery link, and you should receive reset password link. If
                  you haven't receive password reset link check your spam folder
                  or <Link to={"/contact"}>contact</Link> our support service.
                </p>
              }
            />
            <Faqbox
              title={"How many accounts can I open on the site?"}
              text={
                <p>
                  Any client can have only one account per IP/Family/Payment
                  account. In the event of multiple registrations from your
                  computer we have rights to suspend all of your accounts.
                </p>
              }
            />
            <Faqbox
              title={"How may I make a deposit?"}
              text={
                <p>
                  In order to make a deposit click on Deposit in the navigation
                  menu. Fill desired amount in the 'Amount' field, choose
                  payment system that you use and click 'Confirm'. Follow
                  further instructions of your payment system.
                </p>
              }
            />
            <Faqbox
              title={"When the deposit should be activated?"}
              text={
                <p>
                  Your deposit would be activated once confirmed.
                  <br></br>For deposits in crypto it could be some time lag
                  which is required for getting confirmations by bitcoin
                  network. If your deposit hasn't appear in your account for a
                  long time, please <Link to={"/contact"}>contact</Link> us.
                </p>
              }
            />
            <Faqbox
              title={"Does the profit include my initial deposit?"}
              text={
                <p>
                  In all investment plans your profit includes your initial
                  deposit.
                </p>
              }
            />
            <Faqbox
              title={"May I have several deposits at the same time?"}
              text={<p>Yes, sure you may have as many deposits as you want.</p>}
            />
            <Faqbox
              title={"Which electronic currencies do you accept at the moment?"}
              text={
                <p>
                  At the moment we accept: Bitcoin(BTC), Binance Coin(BNB),
                  Ethereum(ETH) and USDT.
                </p>
              }
            />
            <Faqbox
              title={"How can I withdraw my profit?"}
              text={
                <p>
                  In order to withdraw your profit you need to make withdrawal
                  request on Withdraw page in your Dashboard. Just fill desired
                  withdrawing amount and choose payment system which you use for
                  making your deposits.
                </p>
              }
            />
            <Faqbox
              title={
                "How soon after the withdrawal of the request will appear money on my payment account?"
              }
              text={
                <p>
                  Your request will be processed within 24 hours. We do
                  everything possible to reduce awaiting time of our clients.
                </p>
              }
            />
            <Faqbox
              title={`I requested for a withdrawal some time ago, but money haven't come yet.`}
              text={
                <p>
                  Please, pay attention that usually we process withdrawals
                  within 24 hours. But anyway{" "}
                  <Link to={"/contact"}>contact</Link> our support service and
                  we will check your issue.
                </p>
              }
            />
            <Faqbox
              title={"Do you have any withdrawal limits?"}
              text={
                <p>
                  No. We don't have any withdrawal limits but we have conditions
                  and certain charge.
                </p>
              }
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
