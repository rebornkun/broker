import { useContext, useEffect, useRef, useState } from "react";
import { emailRegex, passwordRegex } from "../../utils/schema";
import "./Register.css";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import appContext from "../../context/AppContext";
import { async } from "@firebase/util";
import InputDropDown from "../../Components/InputDropDown/InputDropDown";
import emailjs from "@emailjs/browser";

const Register = () => {
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const inputRef = useRef();
  const inputConRef = useRef();
  const navigate = useNavigate();
  const userCollectionRef = collection(db, "User");
  const { userData, setUserData } = useContext(appContext);

  const initialValues = {
    email: "",
    full_name: "",
    currency: "usd",
    password: "",
    confirm_password: "",
  };
  const initialErrorValues = {
    email: "",
    password: "",
    full_name: "",
    confirm_password: "",
  };
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(initialErrorValues);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignInWithGoogleLoading, setIsSignInWithGoogleLoading] =
    useState(false);
  const [isThereSignUpError, setIsThereSignUpError] = useState("");

  const handleView = () => {
    if (inputRef.current.getAttribute("type") === "password") {
      inputRef.current.setAttribute("type", "text");
      setShow(true);
    } else {
      inputRef.current.setAttribute("type", "password");
      setShow(false);
    }
  };
  const handleViewTwo = () => {
    if (inputConRef.current.getAttribute("type") === "password") {
      inputConRef.current.setAttribute("type", "text");
      setShowTwo(true);
    } else {
      inputConRef.current.setAttribute("type", "password");
      setShowTwo(false);
    }
  };
  //after validation check if no errors before allowing add memeber process
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      setIsSubmit(false);
      registerUserAfterAllValidation();
    }
  }, [error]);

  //validate form
  const validateValues = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format";
    }

    if (!values.full_name) {
      errors.full_name = "Full Name is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(values.password)) {
      errors.password = "min 5 characters, 1 upper, 1 lower, 1 numeric digit";
    }
    if (!values.confirm_password) {
      errors.confirm_password = "Confirm Password is required";
    } else if (values.confirm_password != values.password) {
      errors.confirm_password = "Passwords do not match";
    }

    return errors;
  };

  //validate form data on click
  const handleAddUser = (e) => {
    setIsSubmit(true);
    setIsThereSignUpError("");
    e.preventDefault();
    setError(validateValues(values));
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const registerUserAfterAllValidation = async () => {
    setIsLoading(true);
    try {
      const auther = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const { user } = auther;
      console.log(auther);
      await addDoc(userCollectionRef, {
        uid: user.uid,
        email: values.email,
        password: values.password,
        full_name: values.full_name,
        address: "",
        city: "",
        country: "",
        currency: values.currency,
        state: "",
        current_plan: "",
        USD: 0,
        available: 0,
        earned: 0,
        paid: 0,
        wallet_address: "",
        verified: false,
      });

      let emailParams = {
        full_name: values.full_name,
        password: values.password,
        message: `Your registration was successful! Below are your login credentials. Please keep them safe.
        <br>
        Login details:
        <br>
        Email: ${values.email}
        <br>
        password: ${values.password}
        <br>
        Kind regards,`,
        email: values.email,
      };
      emailjs.send(
        "service_5x9vg99",
        "template_sx1h1jz",
        emailParams,
        "H4wd_rv20XCg9UWGl"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({ email: values.email, isLoggedIn: true })
      );
      const d = await getDocs(
        query(userCollectionRef, where("email", "==", `${values.email}`))
      );
      let res = [];
      d.forEach((user) => {
        res.push({
          id: user.id,
          ...user.data(),
        });
      });
      // console.log(res)
      setUserData(res);
      setIsLoading(false);
      navigate("/dashboard", { replace: true });
    } catch (e) {
      setIsLoading(false);
      setIsThereSignUpError(e.message);
    }
  };
  const signInWithGoogle = async () => {
    setIsSignInWithGoogleLoading(true);
    try {
      const auther = await signInWithPopup(auth, googleProvider);

      const { user } = auther;

      const d = await getDocs(
        query(userCollectionRef, where("email", "==", `${user.email}`))
      );
      let res = [];
      d.forEach((user) => {
        res.push({
          id: user.id,
          ...user.data(),
        });
      });
      let length = res.length;
      if (length === 0) {
        //if user doesnt exist in the system add user and login
        await addDoc(userCollectionRef, {
          email: user.email,
          password: "signedInWIthGoogle",
          full_name: user.displayName,
          address: "",
          city: "",
          country: "",
          state: "",
          currency: "usd",
          current_plan: "",
          USD: 0,
          available: 0,
          earned: 0,
          paid: 0,
          wallet_address: "",
          verified: false,
        });
        const d = await getDocs(
          query(userCollectionRef, where("email", "==", `${user.email}`))
        );
        let res = [];
        d.forEach((user) => {
          res.push({
            id: user.id,
            ...user.data(),
          });
        });
        let emailParams = {
          full_name: values.full_name,
          message: `Your registration was successful! you signed in with Google with this email.
          <br>
          Kind regards,`,
          email: values.email,
        };
        emailjs.send(
          "service_5x9vg99",
          "template_sx1h1jz",
          emailParams,
          "H4wd_rv20XCg9UWGl"
        );
        setUserData(res);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: user.email, isLoggedIn: true })
        );
        navigate("/dashboard", { replace: true });
        console.log("user does not exists");
      } else {
        signOut(auth);
        throw new Error("User already exists!");
      }

      setIsSignInWithGoogleLoading(false);
    } catch (e) {
      setIsSignInWithGoogleLoading(false);
      setIsThereSignUpError(e.message);
    }
  };

  return (
    <div className="login_container">
      <div className="login_content reg">
        <div className="form_container"></div>
        <div className="forms reg">
          <h1>SIGN UP</h1>

          <form className="register" onSubmit={handleAddUser}>
            <div className="Schedule_button login" onClick={signInWithGoogle}>
              {isSignInWithGoogleLoading ? (
                <div className="loader">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z"
                      fill="black"
                    />
                  </svg>
                </div>
              ) : (
                <div className="fdrow aic jcc gap05" style={{ zIndex: "1" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.5453 6.55847C15.6394 7.09345 15.6835 7.64019 15.6835 8.18399C15.6835 10.6179 14.8134 12.6755 13.2996 14.0688H13.3025C11.9768 15.2916 10.1573 16 7.99973 16C4.97503 16 2.209 14.2951 0.850974 11.5938C-0.283656 9.33331 -0.283659 6.67017 0.850972 4.40972C2.209 1.70542 4.97503 0.000539093 7.99973 0.000539093C9.98681 -0.0229766 11.9063 0.723645 13.3525 2.08167L11.0685 4.36563C10.2425 3.57786 9.14024 3.1487 7.99973 3.16633C5.91272 3.16633 4.14022 4.57433 3.50824 6.47028C3.17314 7.46382 3.17314 8.53966 3.50824 9.5332H3.51118C4.1461 11.4262 5.91566 12.8342 8.00267 12.8342C9.08145 12.8342 10.0074 12.5579 10.7246 12.0699H10.7217C11.5653 11.5115 12.1414 10.6326 12.3207 9.63902H7.99973V6.55847H15.5453Z"
                      fill="white"
                    />
                  </svg>
                  <p>Sign Up With Google</p>
                </div>
              )}
            </div>
            <div className="or_box">
              <span></span>
              <p>or</p>
              <span></span>
            </div>
            <div className="inputBox">
              <label htmlFor={"FullName"}>Full Name</label>
              <input
                type={"text"}
                id={"FullName"}
                name={"full_name"}
                placeholder={"E.g Don Joe"}
                value={values.full_name}
                onChange={handleFieldChange}
              />
              {error.full_name && (
                <p className="warning_text">{error.full_name}</p>
              )}
            </div>

            <div className="inputBox">
              <label htmlFor={"Email"}>Email</label>
              <input
                type={"email"}
                id={"Email"}
                name={"email"}
                placeholder={"abc@gmail.com"}
                value={values.email}
                onChange={handleFieldChange}
              />
              {error.email && <p className="warning_text">{error.email}</p>}
            </div>

            <div className="inputBox">
              <InputDropDown
                name={"currency"}
                displayedText={"USD"}
                options={["USD", "EURO", "POUNDS"]}
                label={"Currency"}
                values={values}
                setValues={setValues}
              />
            </div>

            <div className="inputBox">
              <label htmlFor={"Password"}>Password</label>
              <input
                ref={inputRef}
                type={"password"}
                id={"Password"}
                name={"password"}
                placeholder={"Min of 6 chars"}
                value={values.password}
                onChange={handleFieldChange}
              />
              {error.password && (
                <p className="warning_text">{error.password}</p>
              )}
              {show ? (
                <svg
                  className="password_vis_toogle"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    handleView();
                  }}
                >
                  <path
                    d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z"
                    fill="black"
                  />
                  <path
                    d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z"
                    fill="black"
                  />
                  <path
                    d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z"
                    fill="black"
                  />
                  <path
                    d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z"
                    fill="black"
                  />
                  <path
                    d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  className="password_vis_toogle"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    handleView();
                  }}
                >
                  <path
                    d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z"
                    fill="black"
                  />
                  <path
                    d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z"
                    fill="black"
                  />
                </svg>
              )}
            </div>

            <div className="inputBox">
              <label htmlFor={"ConfirmPassword"}>Confrim Password</label>
              <input
                ref={inputConRef}
                type={"password"}
                id={"ConfirmPassword"}
                name={"confirm_password"}
                placeholder={"Min of 5 chars"}
                value={values.confirm_password}
                onChange={handleFieldChange}
              />
              {error.confirm_password && (
                <p className="warning_text">{error.confirm_password}</p>
              )}
              {showTwo ? (
                <svg
                  className="password_vis_toogle"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    handleViewTwo();
                  }}
                >
                  <path
                    d="M13.3589 11.2375C15.0613 9.72095 16 7.99998 16 7.99998C16 7.99998 13 2.49998 8 2.49998C6.98462 2.49998 6.05172 2.7268 5.20967 3.08831L5.98054 3.85918C6.60983 3.63315 7.28441 3.49998 8 3.49998C10.1194 3.49998 11.879 4.66816 13.1679 5.95708C13.8037 6.59288 14.2978 7.23191 14.6327 7.71239C14.7055 7.81675 14.7704 7.91319 14.8273 7.99998C14.7704 8.08677 14.7055 8.1832 14.6327 8.28756C14.2978 8.76805 13.8037 9.40707 13.1679 10.0429C13.0031 10.2077 12.8306 10.3705 12.6506 10.5292L13.3589 11.2375Z"
                    fill="black"
                  />
                  <path
                    d="M11.2975 9.17612C11.4286 8.80854 11.5 8.41259 11.5 7.99998C11.5 6.06698 9.933 4.49998 8 4.49998C7.58738 4.49998 7.19144 4.57138 6.82386 4.7025L7.64618 5.52482C7.76176 5.50845 7.87989 5.49998 8 5.49998C9.38071 5.49998 10.5 6.61926 10.5 7.99998C10.5 8.12008 10.4915 8.23821 10.4752 8.3538L11.2975 9.17612Z"
                    fill="black"
                  />
                  <path
                    d="M8.35385 10.4751L9.17617 11.2974C8.80858 11.4286 8.41263 11.5 8 11.5C6.067 11.5 4.5 9.93297 4.5 7.99998C4.5 7.58735 4.5714 7.1914 4.70253 6.82381L5.52485 7.64613C5.50847 7.76172 5.5 7.87986 5.5 7.99998C5.5 9.38069 6.61929 10.5 8 10.5C8.12012 10.5 8.23825 10.4915 8.35385 10.4751Z"
                    fill="black"
                  />
                  <path
                    d="M3.34944 5.47072C3.16945 5.62941 2.99693 5.79226 2.83211 5.95708C2.19631 6.59288 1.70216 7.23191 1.36727 7.71239C1.29454 7.81675 1.22963 7.91319 1.1727 7.99998C1.22963 8.08677 1.29454 8.1832 1.36727 8.28756C1.70216 8.76805 2.19631 9.40707 2.83211 10.0429C4.12103 11.3318 5.88062 12.5 8 12.5C8.7156 12.5 9.39018 12.3668 10.0195 12.1408L10.7904 12.9116C9.9483 13.2732 9.01539 13.5 8 13.5C3 13.5 0 7.99998 0 7.99998C0 7.99998 0.938717 6.279 2.64112 4.7624L3.34944 5.47072Z"
                    fill="black"
                  />
                  <path
                    d="M13.6464 14.3535L1.64645 2.35353L2.35355 1.64642L14.3536 13.6464L13.6464 14.3535Z"
                    fill="black"
                  />
                </svg>
              ) : (
                <svg
                  className="password_vis_toogle"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    handleViewTwo();
                  }}
                >
                  <path
                    d="M16 8C16 8 13 2.5 8 2.5C3 2.5 0 8 0 8C0 8 3 13.5 8 13.5C13 13.5 16 8 16 8ZM1.1727 8C1.22963 7.91321 1.29454 7.81677 1.36727 7.71242C1.70216 7.23193 2.19631 6.5929 2.83211 5.95711C4.12103 4.66818 5.88062 3.5 8 3.5C10.1194 3.5 11.879 4.66818 13.1679 5.95711C13.8037 6.5929 14.2978 7.23193 14.6327 7.71242C14.7055 7.81677 14.7704 7.91321 14.8273 8C14.7704 8.08679 14.7055 8.18323 14.6327 8.28758C14.2978 8.76807 13.8037 9.4071 13.1679 10.0429C11.879 11.3318 10.1194 12.5 8 12.5C5.88062 12.5 4.12103 11.3318 2.83211 10.0429C2.19631 9.4071 1.70216 8.76807 1.36727 8.28758C1.29454 8.18323 1.22963 8.08679 1.1727 8Z"
                    fill="black"
                  />
                  <path
                    d="M8 5.5C6.61929 5.5 5.5 6.61929 5.5 8C5.5 9.38071 6.61929 10.5 8 10.5C9.38071 10.5 10.5 9.38071 10.5 8C10.5 6.61929 9.38071 5.5 8 5.5ZM4.5 8C4.5 6.067 6.067 4.5 8 4.5C9.933 4.5 11.5 6.067 11.5 8C11.5 9.933 9.933 11.5 8 11.5C6.067 11.5 4.5 9.933 4.5 8Z"
                    fill="black"
                  />
                </svg>
              )}
            </div>

            <button type="submit">
              <div className="Schedule_button login">
                {isLoading ? (
                  <div className="loader">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.49995 13V14.25C5.49995 14.3881 5.61188 14.5 5.74995 14.5H6.74995C6.88802 14.5 6.99995 14.3881 6.99995 14.25V13H7.49995V14.25C7.49995 14.3881 7.61188 14.5 7.74995 14.5H8.74995C8.88802 14.5 8.99995 14.3881 8.99995 14.25V13H9.08432C11.0762 13 12.5 11.967 12.5 10.1795C12.5 8.67766 11.4932 7.85714 10.314 7.73993V7.65201C11.2847 7.41026 11.9966 6.67766 11.9966 5.46154C11.9966 3.9304 10.8461 3 9.09152 3H8.99995V1.75C8.99995 1.61193 8.88802 1.5 8.74995 1.5H7.74995C7.61188 1.5 7.49995 1.61193 7.49995 1.75V3H6.92709V1.75C6.92709 1.61193 6.81516 1.5 6.67709 1.5H5.74995C5.61188 1.5 5.49995 1.61193 5.49995 1.75V3L3.50159 3.01123C3.36352 3.01123 3.25159 3.12316 3.25159 3.26123V4.25001C3.25159 4.38745 3.36254 4.49912 3.49998 4.5L4.25476 4.49522C4.66709 4.49787 4.99995 4.83287 4.99995 5.24521V10.75C4.99995 11.1642 4.66417 11.5 4.24995 11.5L3.50159 11.5112C3.36352 11.5112 3.25159 11.6232 3.25159 11.7612V12.7612C3.25159 12.8993 3.36352 13.0112 3.50159 13.0112L5.49995 13ZM6.92709 4.48718H8.64569C9.55173 4.48718 10.0838 4.98535 10.0838 5.79853C10.0838 6.67033 9.50858 7.16117 8.20705 7.16117H6.92709V4.48718ZM6.92709 8.53846H8.76793C9.90408 8.53846 10.5225 9.11722 10.5225 10.0623C10.5225 11.0147 9.89688 11.5128 8.36525 11.5128H6.92709V8.53846Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                ) : (
                  <p>Register</p>
                )}
              </div>
            </button>
            <p className="already">
              Already have an account ? <Link to={"/login"}>Login!</Link>
            </p>
            {isThereSignUpError && (
              <p className="error_text">{isThereSignUpError}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
