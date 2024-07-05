import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { auth, db } from "../../../../config/firebase";
import appContext from "../../../../context/AppContext";
import { useCountdown } from "../../../../utils/count";
import StyledTable from "../../components/StyledTable/StyledTable";
import Edituser from "../Edituser/Edituser";
import "./Overview.css";
import { AdvancedChart } from "react-tradingview-embed";
// import Charter from "./Charter";

const Box = ({ cryptoData, userData }) => {
  const getBtc = () => {
    // cryptoData[0].
    let btctodollar = 0.000038886;
    let userUSD = userData[0]?.USD;
    let total = btctodollar * userUSD;

    if (Number(total) === Number(0)) {
      total = "0.000000000";
      return total;
    } else {
      return Number(total).toFixed(9);
    }
  };
  return (
    <div className="box_div">
      <div className="fdrow aic gap02 prof">
        <div className="prolfile_photo box">
          <svg
            width="33"
            height="32"
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.01766 10.6063C9.01766 8.731 9.77772 6.93253 11.1306 5.60652C12.4835 4.28051 14.3185 3.53556 16.2318 3.53556C18.1451 3.53556 19.98 4.28051 21.333 5.60652C22.6859 6.93253 23.4459 8.731 23.4459 10.6063C23.4459 12.4815 22.6859 14.28 21.333 15.606C19.98 16.932 18.1451 17.677 16.2318 17.677C14.3185 17.677 12.4835 16.932 11.1306 15.606C9.77772 14.28 9.01766 12.4815 9.01766 10.6063ZM23.1285 18.7782C24.8446 17.3868 26.0808 15.5103 26.6685 13.4048C27.2562 11.2993 27.1668 9.06728 26.4124 7.01343C25.6579 4.95958 24.2753 3.18391 22.4532 1.92873C20.631 0.673548 18.4581 0 16.2309 0C14.0037 0 11.8308 0.673548 10.0086 1.92873C8.18646 3.18391 6.80384 4.95958 6.04942 7.01343C5.295 9.06728 5.20554 11.2993 5.79325 13.4048C6.38095 15.5103 7.6172 17.3868 9.33328 18.7782C3.58182 20.7633 0 25.1843 0 30.0507C0 30.5195 0.190014 30.9691 0.528242 31.3006C0.86647 31.6322 1.32521 31.8184 1.80353 31.8184C2.28186 31.8184 2.74059 31.6322 3.07882 31.3006C3.41705 30.9691 3.60706 30.5195 3.60706 30.0507C3.60706 26.0381 7.85438 21.2123 16.2318 21.2123C24.6092 21.2123 28.8565 26.0381 28.8565 30.0507C28.8565 30.5195 29.0465 30.9691 29.3848 31.3006C29.723 31.6322 30.1817 31.8184 30.66 31.8184C31.1384 31.8184 31.5971 31.6322 31.9353 31.3006C32.2736 30.9691 32.4636 30.5195 32.4636 30.0507C32.4636 25.1843 28.8854 20.7633 23.1285 18.7782Z"
              fill="#312F2F"
            />
          </svg>
        </div>
      </div>
      <div className="fdcolumn gap02 jcsevenly">
        <div className="fdrow gap1">
          <div className="fdrow aic gap02">
            <p className="montitle">Name:</p>
            <p className="value">{userData[0]?.full_name}</p>
            {userData[0]?.verified == true && (
              <div
                className="fdrow aic"
                style={{
                  border: "1px solid green",
                  borderRadius: "3px",
                  padding: "0.2rem",
                  fontSize: "0.6rem",
                  fontWeight: "600",
                  color: "green",
                }}
              >
                <p>verified</p>
              </div>
            )}
          </div>
          <div className="fdrow aic gap02 mbbb">
            <p className="montitle">Email:</p>
            <p className="value">{userData[0]?.email}</p>
          </div>
        </div>
        <div className="fdrow gap1">
          <div className="fdrow aic gap02">
            <p className="montitle">Current Plan:</p>
            <p className="value">
              {userData[0]?.current_plan ? userData[0]?.current_plan : "none"}
            </p>
          </div>
          <div className="fdrow aic gap02">
            <p className="montitle">
              Deposit(
              {userData[0]?.currency === "usd"
                ? "USD"
                : userData[0]?.currency === "euro"
                ? "EUR"
                : "GBP"}
              ):
            </p>
            <p className="value">
              {userData[0]?.currency === "usd"
                ? "$"
                : userData[0]?.currency === "euro"
                ? "€"
                : "£"}
              {Number.isInteger(userData[0]?.USD)
                ? `${userData[0]?.USD}.0`
                : Number(userData[0]?.USD).toFixed(1)}
            </p>
          </div>
          <div className="fdrow aic gap02">
            <p className="montitle">BTC:</p>
            <p className="value">{getBtc()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
const ProfitBox = ({ userData }) => {
  return (
    <div className="profit box_div fdrow">
      <div className="fdrow aic gap02 jcc" style={{ flex: "33.33%" }}>
        <p className="montitle">Profit:</p>
        {Number.isInteger(userData[0]?.earned) ? (
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {userData[0]?.earned}.0
          </p>
        ) : (
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {Number(userData[0]?.earned).toFixed(1)}
          </p>
        )}
      </div>
      <div className="fdrow aic gap02 jcc" style={{ flex: "33.33%" }}>
        <p className="montitle">Avail. Bal:</p>
        {Number.isInteger(userData[0]?.available) ? (
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {Number(userData[0]?.available)}.0
          </p>
        ) : (
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {Number(userData[0]?.available).toFixed(1)}
          </p>
        )}
      </div>
      <div className="fdrow aic gap02 jcc" style={{ flex: "33.33%" }}>
        <p className="montitle">Withdraw:</p>
        {Number.isInteger(userData[0]?.paid) ? (
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {userData[0]?.paid}.0
          </p>
        ) : (
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {Number(userData[0]?.paid).toFixed(1)}
          </p>
        )}
      </div>
    </div>
  );
};
const TradingBox = () => {
  return (
    <div className="profit box_div fdrow">
      <AdvancedChart />
    </div>
  );
};
const CountdownTimer = ({ targetDate }) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);
  if (days + hours + minutes + seconds <= 0) {
    return <p>expired</p>;
  } else {
    return (
      <>
        {/* <p>{days}</p> */}
        {hours >= 10 ? (
          <h4 className="hour timertext">{hours}:</h4>
        ) : (
          <h4 className="hour timertext">0{hours}:</h4>
        )}
        {minutes >= 10 ? (
          <h4 className="minute timertext">{minutes}:</h4>
        ) : (
          <h4 className="minute timertext">0{minutes}:</h4>
        )}
        {seconds >= 10 ? (
          <h4 className="seconds timertext">{seconds}</h4>
        ) : (
          <h4 className="seconds timertext">0{seconds}</h4>
        )}
      </>
    );
  }
};

const PlanBox = ({ userData }) => {
  const { setUserData, getUserData } = useContext(appContext);
  // console.log(userData)
  // console.log(userData[0]?.plan_buy_time.toDate().toString())
  // console.log(userData[0]?.plan_buy_time.toDate().toTimeString())
  const ONE_DAY_IN_MS = 1 * 24 * 60 * 60 * 1000;
  const ONE_HOUR_IN_MS = 1 * 1 * 60 * 60 * 1000;
  const THEN_IN_MS = new Date(userData[0]?.plan_buy_time.toDate()).getTime();
  const NOW_IN_MS = new Date().getTime();
  // console.log(ONE_DAY_IN_MS)
  // console.log(THEN_IN_MS)
  // console.log(NOW_IN_MS)
  const dateTimeAfterOneDay = THEN_IN_MS + ONE_DAY_IN_MS;
  useEffect(() => {
    updateProfit();
  }, []);

  const updateProfit = () => {
    let current_plan = userData[0]?.current_plan;
    let profit = userData[0]?.plan_profit;
    let lastProfitTime = new Date(
      userData[0]?.last_profit_added_time?.toDate()
    ).getTime();
    let diff = NOW_IN_MS - lastProfitTime;
    const diffBtwNowAndThen = NOW_IN_MS - THEN_IN_MS;
    let x = 0;
    let i = ONE_HOUR_IN_MS;

    if (NOW_IN_MS > dateTimeAfterOneDay) {
      diff = dateTimeAfterOneDay - lastProfitTime;
    }

    for (let i = ONE_HOUR_IN_MS; i < diff; i += ONE_HOUR_IN_MS) {
      x += 1;
    }
    if (x > 0) {
      if (current_plan === "Basic") {
        let profitValue = 0;
        if (profit >= 1915) {
          updateProfitValue(1999);
        } else {
          for (let i = 0; i < x; i += 1) {
            profitValue += Math.floor(Math.random() * 41.6) + 41.7;
          }
          updateProfitValue(profitValue);
        }
      } else if (current_plan === "Standard") {
        let profitValue = 0;
        if (profit >= 7083) {
          updateProfitValue(7499);
        } else {
          for (let i = 0; i < x; i += 1) {
            profitValue += Math.floor(Math.random() * 312.5) + 104.2;
          }
          updateProfitValue(profitValue);
        }
      } else if (current_plan === "Gold") {
        let profitValue = 0;
        if (profit >= 18957) {
          updateProfitValue(19999);
        } else {
          for (let i = 0; i < x; i += 1) {
            profitValue += Math.floor(Math.random() * 833.29) + 208.33;
          }
          updateProfitValue(profitValue);
        }
      } else if (current_plan === "Platinum") {
        let profitValue = 0;
        for (let i = 0; i < x; i += 1) {
          profitValue += Math.floor(Math.random() * 1000.6) + 416.33;
        }
        updateProfitValue(profitValue);
      }
    }
  };

  const updateProfitValue = async (amount) => {
    // console.log(amount)
    try {
      const date = new Date();
      const userDoc = doc(db, "User", userData[0]?.id);
      await updateDoc(userDoc, {
        plan_profit: userData[0]?.plan_profit + amount,
        last_profit_added_time: date,
      });
      await calculate(amount);
    } catch (err) {
      console.log(err);
    }
  };

  const calculate = async (amount) => {
    if (NOW_IN_MS - THEN_IN_MS > ONE_DAY_IN_MS) {
      console.log("stopplan");
      try {
        const userDoc = doc(db, "User", userData[0]?.id);
        await updateDoc(userDoc, {
          current_plan: "",
          plan_profit: 0,
          plan_buy_time: "",
          last_profit_added_time: "",
          available: userData[0]?.available + userData[0]?.plan_profit + amount,
          earned: userData[0]?.earned + userData[0]?.plan_profit + amount,
          plan_rank: 0,
        });
        await getUserData();
      } catch (err) {
        console.log(err);
      }
    }
    console.log("constinueplan");
  };

  return (
    <div className=" box_div aic fdcolumn plannn gap02">
      <div className="fdrow jcsb w100p countercov">
        <div className="fdrow aic gap02">
          <p className="montitle">Current Plan:</p>
          <h5>{userData[0]?.current_plan}</h5>
        </div>
        <div className="fdrow aic gap02">
          <p className="montitle">Profit:</p>
          <div className="fdrow aic gap02">
            {userData[0]?.plan_profit === 0 ? (
              <p className="value">
                `
                {userData[0]?.currency === "usd"
                  ? "$"
                  : userData[0]?.currency === "euro"
                  ? "€"
                  : "£"}
                {Number(userData[0]?.plan_profit)}.0`
              </p>
            ) : (
              <p className="value">
                {userData[0]?.currency === "usd"
                  ? "$"
                  : userData[0]?.currency === "euro"
                  ? "€"
                  : "£"}
                {Number(userData[0]?.plan_profit).toFixed(1)}
              </p>
            )}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.27049 1.04714C7.66556 0.625727 8.33449 0.625725 8.72956 1.04714L15.0754 7.81608C15.6742 8.45475 15.2214 9.50002 14.3459 9.50002H11.5V10.5C11.5 11.0523 11.0523 11.5 10.5 11.5H5.50003C4.94774 11.5 4.50003 11.0523 4.50003 10.5V9.50002H1.65414C0.778704 9.50002 0.325857 8.45475 0.924607 7.81608L7.27049 1.04714Z"
                fill="green"
              />
              <path
                d="M4.50003 13.5C4.50003 12.9477 4.94774 12.5 5.50003 12.5H10.5C11.0523 12.5 11.5 12.9477 11.5 13.5V14.5C11.5 15.0523 11.0523 15.5 10.5 15.5H5.50003C4.94774 15.5 4.50003 15.0523 4.50003 14.5V13.5Z"
                fill="green"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="fdrow w100p jcc countercov">
        <div className="fdrow counterrr gap02">
          {/* <p className='montitle'>Profit:</p> */}
          <CountdownTimer targetDate={dateTimeAfterOneDay} />
        </div>
      </div>
    </div>
  );
};
const LowFunds = ({}) => {
  const [show, setShow] = useState(true);
  return (
    <div
      style={{ display: show ? "block" : "none" }}
      className="profit box_div fdrow"
    >
      <p className="value">
        You account is empty!{" "}
        <Link to={"/dashboard/deposit/makedeposit"}>Fund Now</Link>
      </p>

      <div className="cancel" onClick={() => setShow(false)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};
const Verify = ({}) => {
  const [show, setShow] = useState(true);
  return (
    <div
      style={{ display: show ? "block" : "none" }}
      className="profit box_div fdrow"
    >
      <p className="value">
        your account isn't verified!{" "}
        <Link to={"/dashboard/settings/verify"}>Verify Now</Link>
      </p>

      <div className="cancel" onClick={() => setShow(false)}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.14645 2.85355C1.95118 2.65829 1.95118 2.34171 2.14645 2.14645C2.34171 1.95118 2.65829 1.95118 2.85355 2.14645L8 7.29289L13.1464 2.14645C13.3417 1.95118 13.6583 1.95118 13.8536 2.14645C14.0488 2.34171 14.0488 2.65829 13.8536 2.85355L8.70711 8L13.8536 13.1464C14.0488 13.3417 14.0488 13.6583 13.8536 13.8536C13.6583 14.0488 13.3417 14.0488 13.1464 13.8536L8 8.70711L2.85355 13.8536C2.65829 14.0488 2.34171 14.0488 2.14645 13.8536C1.95119 13.6583 1.95119 13.3417 2.14645 13.1464L7.29289 8L2.14645 2.85355Z"
            fill="black"
          />
        </svg>
      </div>
    </div>
  );
};

const Overview = ({}) => {
  let [cryptoData, setCryptoData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    )
      .then((res) => res.json())
      .then((res) => {
        let arr = res.slice(0, 7);
        setCryptoData(arr);
      });
  }, []);

  const { userData, setUserData } = useContext(appContext);
  const userCollectionRef = collection(db, "User");
  useEffect(() => {
    const userD = localStorage.getItem("user");
    const userIsAdmin = JSON.parse(userD)?.isAdmin;
    if (userIsAdmin) {
      getAllUsers();
    } else {
      getUserData();
    }
  }, []);

  const getName = () => {
    const fullName = userData[0]?.full_name || "";
    const split = fullName.split(" ");
    return split[0];
  };
  const getUserData = async () => {
    const userD = localStorage.getItem("user");
    const userEmail = JSON.parse(userD).email;

    try {
      const d = await getDocs(
        query(
          userCollectionRef,
          where("email", "==", `${userEmail.toLowerCase()}`)
        )
      );
      let res = [];
      d.forEach((user) => {
        res.push({
          id: user.id,
          ...user.data(),
        });
      });

      // console.log(res);
      setUserData(res);
    } catch (e) {
      navigate("/", { replace: true });
      // console.log(e.message);
    }
  };
  const [getAllUsersIsLoading, setGetAllUsersIsLoading] = useState(false);
  const [getAllUsersData, setGetAllUsersData] = useState([]);
  const [getAllFilteredUsersData, setGetAllFilteredUsersData] = useState([]);
  const [getAllUsersError, setGetAllUsersError] = useState(false);

  const getAllUsers = async () => {
    try {
      setGetAllUsersIsLoading(true);
      const all = await getDocs(userCollectionRef);
      let res = [];
      all.forEach((user) => {
        res.push({
          id: user.id,
          ...user.data(),
        });
      });
      setGetAllUsersData(res);
      setGetAllFilteredUsersData(res);
      setGetAllUsersIsLoading(false);
      // console.log(res);
    } catch (err) {
      // console.log(err);
      setGetAllUsersError(err.message);
      setGetAllUsersIsLoading(false);
    }
  };

  const filterTable = (e) => {
    const { value } = e.target;
    const filteredData = getAllUsersData.filter((obj) => {
      return obj.email.includes(value);
    });
    setGetAllFilteredUsersData(filteredData);
  };

  return (
    <div className="overview dashpage">
      <Routes>
        <Route
          index
          element={
            <>
              <h5 style={{ marginBottom: "1rem" }}>Welcome, {getName()}</h5>
              {userData[0]?.account_type === "admin" ? (
                <>
                  <div className="box_div" style={{ marginBottom: "1rem" }}>
                    <input className="searchInput" onChange={filterTable} />
                  </div>
                  <StyledTable
                    type={"admin_members"}
                    data={getAllFilteredUsersData}
                    isLoading={getAllUsersIsLoading}
                    error={getAllUsersError}
                  />
                </>
              ) : (
                <>
                  {!userData[0]?.verified || userData[0]?.verified === false ? (
                    <Verify />
                  ) : (
                    <></>
                  )}
                  {userData[0]?.USD === 0 && <LowFunds />}
                  <Box cryptoData={cryptoData} userData={userData} />
                  {/* {userData[0]?.current_plan && <PlanBox userData={userData} />} */}
                  <ProfitBox userData={userData} />
                  <TradingBox />
                </>
              )}
            </>
          }
        />
        <Route path="edituser" element={<Edituser />} />
      </Routes>
    </div>
  );
};

export default Overview;
