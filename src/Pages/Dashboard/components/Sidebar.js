import { NavLink, useNavigate } from "react-router-dom";
import "./components.css";
import { auth } from "../../../config/firebase";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import appContext from "../../../context/AppContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("");
  const logOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  const { userData, setUserData, getUserData } = useContext(appContext);

  useEffect(() => {
    if (userData[0]?.account_type === "admin") {
      setMode("admin");
    } else {
      setMode("user");
    }
  }, [userData]);

  return (
    <div className="sidebar">
      <div className="sidebar_container">
        <div className="top">
          <NavLink className={"sidebar_nav_item"} to={"overview"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM8 20H4V16H8V20ZM4 14H8V10H4V14ZM14 14H10V10H14V14ZM16 4V8H20V4H16ZM14 8H10V4H14V8ZM16 14H20V10H16V14ZM20 20H16V16H20V20Z"
                fill="#F1F0EF"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM8 20H4V16H8V20ZM4 14H8V10H4V14ZM14 14H10V10H14V14ZM16 4V8H20V4H16ZM14 8H10V4H14V8ZM16 14H20V10H16V14ZM20 20H16V16H20V20Z"
                fill="#F1F0EF"
              />
            </svg>
            <h5>Overview</h5>
          </NavLink>

          <NavLink className={"sidebar_nav_item"} to={"deposit"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19 9.5H15V3.5H9V9.5H5L12 16.5L19 9.5ZM11 11.5V5.5H13V11.5H14.17L12 13.67L9.83 11.5H11ZM19 20.5V18.5H5V20.5H19Z"
                fill="#F1F0EF"
              />
            </svg>
            <h5>Deposit</h5>
          </NavLink>
          <NavLink className={"sidebar_nav_item"} to={"withdraw"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 16.5V10.5H19L12 3.5L5 10.5H9V16.5H15ZM12 6.33L14.17 8.5H13V14.5H11V8.5H9.83L12 6.33ZM19 20.5V18.5H5V20.5H19Z"
                fill="#F1F0EF"
              />
            </svg>
            <h5>Withdraw</h5>
          </NavLink>
          {mode === "user" && (
            <>
              <NavLink className={"sidebar_nav_item"} to={"plans"}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.99996 6.25C4.99996 6.66421 4.66417 7 4.24996 7C3.83575 7 3.49996 6.66421 3.49996 6.25C3.49996 5.83579 3.83575 5.5 4.24996 5.5C4.66417 5.5 4.99996 5.83579 4.99996 6.25Z"
                    fill="#F1F0EF"
                  />
                  <path
                    d="M6.13806 4.75355C6.70879 4.58956 7.32311 4.5 7.96422 4.5C8.63022 4.5 9.26731 4.59665 9.85664 4.77299C10.1212 4.85215 10.3998 4.70186 10.479 4.4373C10.5581 4.17275 10.4079 3.89411 10.1433 3.81496C9.46062 3.61068 8.72695 3.5 7.96422 3.5C7.22999 3.5 6.5227 3.60257 5.86189 3.79245C5.59649 3.86871 5.44316 4.14568 5.51942 4.41109C5.59568 4.67649 5.87266 4.82982 6.13806 4.75355Z"
                    fill="#F1F0EF"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7.9643 1.52734C4.98668 1.52734 2.39271 3.23104 1.64353 5.65234H1.09451C0.473712 5.65234 0.00292572 6.21207 0.109293 6.82368L0.363323 8.28436C0.488276 9.00284 1.11187 9.52734 1.84114 9.52734H2.10387C2.40323 10.0403 2.79178 10.5053 3.24942 10.9092L2.52039 13.3862C2.47589 13.5374 2.50527 13.7007 2.59968 13.8269C2.69408 13.953 2.84245 14.0273 3.00004 14.0273H5.00004C5.21145 14.0273 5.40001 13.8944 5.47101 13.6953L5.95286 12.3437C6.58751 12.5173 7.26366 12.6107 7.9643 12.6107C8.67078 12.6107 9.35235 12.5157 9.99159 12.3394L10.5352 13.7115C10.6107 13.9021 10.795 14.0273 11 14.0273H13C13.1584 14.0273 13.3074 13.9523 13.4017 13.8251C13.496 13.6979 13.5245 13.5335 13.4784 13.3819L12.7167 10.8757C13.8099 9.89461 14.5 8.55873 14.5 7.06901C14.5 6.92359 14.4935 6.77976 14.4809 6.63767C14.7414 6.52776 14.9878 6.37196 15.185 6.19376C15.5 6.5 16 6.5 16 5.77739C16 6 15.5 6 15.5388 5.75071C15.5804 5.66935 15.6117 5.58403 15.6284 5.49586C15.6718 5.267 15.6126 5.03653 15.4267 4.85061C15.21 4.63386 14.9287 4.63943 14.7201 4.75324C14.5236 4.86041 14.3693 5.07111 14.3449 5.31503C14.3207 5.55771 14.4273 5.79535 14.6651 5.96871C14.5841 6.02492 14.4968 6.07662 14.4064 6.1218C13.8723 3.45792 11.1223 1.52734 7.9643 1.52734ZM2.51646 6.25973C2.97074 4.1939 5.18309 2.52734 7.9643 2.52734C11.1096 2.52734 13.5 4.64121 13.5 7.06901C13.5 8.32349 12.8761 9.47853 11.8301 10.317C11.6706 10.4448 11.605 10.6569 11.6645 10.8525L12.3255 13.0273H11.3398L10.7506 11.5401C10.6519 11.291 10.3743 11.164 10.1212 11.2521C9.45982 11.4825 8.73125 11.6107 7.9643 11.6107C7.19735 11.6107 6.46879 11.4825 5.80736 11.2521C5.54793 11.1617 5.26418 11.2976 5.17192 11.5564L4.64748 13.0273H3.66841L4.30135 10.8769C4.35902 10.6809 4.2917 10.4696 4.1313 10.3431C3.57806 9.90679 3.13993 9.38157 2.84715 8.80192C2.76209 8.63353 2.5895 8.52734 2.40085 8.52734H1.84114C1.59805 8.52734 1.39019 8.35251 1.34853 8.11301L1.0945 6.65234H2.02813C2.2629 6.65234 2.46604 6.48901 2.51646 6.25973ZM15.1371 5.40269C15.1259 5.462 15.0944 5.53377 15.0388 5.6132C15.023 5.60495 15.0083 5.59659 14.9947 5.58819C14.8494 5.49838 14.8376 5.41297 14.8425 5.36478C14.8493 5.29619 14.8982 5.22564 14.9595 5.19218C15.0087 5.16536 15.0399 5.17093 15.0732 5.20417C15.1373 5.26826 15.151 5.32947 15.1371 5.40269Z"
                    fill="#F1F0EF"
                  />
                </svg>
                <h5>Plans</h5>
              </NavLink>
            </>
          )}
        </div>
        <div className="bottom">
          <div className="sidebar_nav_item" onClick={logOut}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 3H13V13H11V3ZM16.41 6.59L17.83 5.17C19.77 6.82 21 9.26 21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 9.26 4.23 6.82 6.17 5.17L7.58 6.58C6.01 7.86 5 9.81 5 12C5 15.87 8.13 19 12 19C15.87 19 19 15.87 19 12C19 9.81 17.99 7.86 16.41 6.59Z"
                fill="#F1F0EF"
              />
            </svg>
            <h5>LogOut</h5>
          </div>
          <NavLink className={"sidebar_nav_item"} to={"settings"}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M20 8.69V4H15.31L12 0.690002L8.69 4H4V8.69L0.690002 12L4 15.31V20H8.69L12 23.31L15.31 20H20V15.31L23.31 12L20 8.69ZM18 14.48V18H14.48L12 20.48L9.52 18H6V14.48L3.52 12L6 9.52V6H9.52L12 3.52L14.48 6H18V9.52L20.48 12L18 14.48ZM6.5 12C6.5 8.97 8.97 6.5 12 6.5C15.03 6.5 17.5 8.97 17.5 12C17.5 15.03 15.03 17.5 12 17.5C8.97 17.5 6.5 15.03 6.5 12ZM12 15.5C10.07 15.5 8.5 13.93 8.5 12C8.5 10.07 10.07 8.5 12 8.5C13.93 8.5 15.5 10.07 15.5 12C15.5 13.93 13.93 15.5 12 15.5ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z"
                fill="#F1F0EF"
              />
            </svg>
            <h5>Settings</h5>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
