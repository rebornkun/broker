import React, { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import logoIcon from "../../Assets/rlogo.svg";
import { NavLink } from "react-router-dom";
import appContext from "../../context/AppContext";

const NavBar = ({
  mobileNavopen,
  setMobileNavOpen,
}) => {

  const [colorChange, setColorchange] = useState(false);
  const { appScrollBody } = useContext(appContext)
  const scroll = () => {
    // let reveals = document.querySelector('.App');
    let elementTop = appScrollBody.current.scrollTop
      if (elementTop > 50) {
        setColorchange(true)
      } else {
        setColorchange(false)
      }
  }

  useEffect(()=>{
    appScrollBody.current.addEventListener("scroll", scroll);

    return () => {
      appScrollBody.current.removeEventListener("scroll", scroll)
    }
  },[])

  return (
    <div className={`navbar ${colorChange ? 'colored' : ''}  showNav`}>
      <div className="container">
        <NavLink to={'home'}>
            <div className="navloading">
              <h1>Xtb Market.</h1>
            </div>
        </NavLink>
        <div className="nav_toggler_container">
          <div
            onClick={() =>
              !mobileNavopen ? setMobileNavOpen(true) : setMobileNavOpen(false)
            }
            className={mobileNavopen ? "nav_toggler open" : "nav_toggler"}
          >
            <span></span>
          </div>
        </div>
        <div className={mobileNavopen ? "nav_items open" : "nav_items"}>
          <div className="menu_background" >

          

          {/* <div className="colorRoller">
            <img src={logoIcon} alt="color animation" />
          </div> */}

          <div className="nav_things">
            {/* <div className="colorsecRoller">
              <img src={logoIcon} alt="color animation" />
            </div> */}
            <div className="nav_items_list_container">
              <ul className="nav_item_list">
                <NavLink to={'home'} onClick={()=>setMobileNavOpen(false)}>
                  <li>
                    Home
                  </li>
                </NavLink>
                <NavLink to={'about'} onClick={()=>setMobileNavOpen(false)}>
                  <li>
                    About us
                  </li>
                </NavLink>
                {/* <NavLink to={'contact'} onClick={()=>setMobileNavOpen(false)}>
                  <li>
                    Contact us
                  </li>
                </NavLink> */}
                <NavLink to={'faq'} onClick={()=>setMobileNavOpen(false)}>
                  <li>
                    FAQ
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className="btn">
            <NavLink to={'login'} onClick={()=>setMobileNavOpen(false)}>
              <div className="Schedule_button">
                <p>Login</p>
              </div>
            </NavLink>
            <NavLink to={'register'} onClick={()=>setMobileNavOpen(false)}>
              <div className="Schedule_button">
                <p>Register</p>
              </div>
            </NavLink>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
