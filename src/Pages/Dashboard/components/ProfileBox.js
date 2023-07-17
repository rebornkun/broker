import { useContext } from "react";
import appContext from "../../../context/AppContext";
import "./components.css";

const ProfileBox = () => {
  const { userData, setUserData } = useContext(appContext);

  const getBtc = () => {
    // cryptoData[0].
    let btctodollar = 0.000038886;
    let userUSD = userData[0]?.USD;
    let total = btctodollar * userUSD;

    if (Number(total) === Number(0)) {
      total = "0.000000000";
      return total;
    } else {
      return total;
    }
  };

  return (
    <div className="profile_pop_up">
      <div className="fdrow aic gap05 prof">
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
        <div style={{ overflow: "hidden" }} className="fcolumn gap1">
          <div className="fdrow aic gap02">
            {/* <p className='montitle'>Name:</p> */}
            <p
              style={{ textOverflow: "ellipsis", overflow: "hidden" }}
              className="value"
            >
              {userData[0]?.full_name}
            </p>
          </div>
          <div className="fdrow aic gap02 mbbb">
            {/* <p className='montitle'>Email:</p> */}
            <p
              style={{ textOverflow: "ellipsis", overflow: "hidden" }}
              className="value"
            >
              {userData[0]?.email}
            </p>
          </div>
        </div>
      </div>
      <div
        style={{ marginTop: "0.5rem", justifyContent: "space-evenly" }}
        className="fdrow gap1"
      >
        <div className="fdcolumn aic gap02">
          <p className="montitle">Avail. Bal:</p>
          <p className="value">
            {userData[0]?.currency === "usd"
              ? "$"
              : userData[0]?.currency === "euro"
              ? "€"
              : "£"}
            {userData[0]?.available}.0
          </p>
        </div>
        <div className="fdcolumn aic gap02">
          <p className="montitle">BTC:</p>
          <p className="value">{getBtc()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
