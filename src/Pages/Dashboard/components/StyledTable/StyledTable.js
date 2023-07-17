import { useContext, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./StyledTable.css";
import appContext from "../../../../context/AppContext";
import InputDropDown from "../../../../Components/InputDropDown/InputDropDown";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../config/firebase";

const StyledTable = ({ data, isLoading, error, type }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, setUserData, getUserData } = useContext(appContext);
  const [allowBtn, setAllowBtn] = useState(true);
  const handleEditUserNav = (email) => {
    navigate("edituser", { state: { email: email } });
  };

  const depositsCollectionRef = collection(db, "Deposits");
  const withdrawsCollectionRef = collection(db, "Withdraws");

  const handleAcceptDeposit = async (id, userId, email, usd, status) => {
    setAllowBtn(false);
    if (allowBtn === true) {
      try {
        let userDoc = "";
        if (status === "success") {
          alert("Already accepted");
        } else {
          if (location.pathname === "/dashboard/withdraw/history") {
            userDoc = doc(withdrawsCollectionRef, id);
            await updateDoc(userDoc, {
              status: "success",
            });
          } else if (location.pathname === "/dashboard/deposit/history") {
            userDoc = doc(depositsCollectionRef, id);
            await updateFunds(userId, usd);
            await updateDoc(userDoc, {
              status: "success",
            });
          }
          await getUserData();
          setAllowBtn(true);
        }
      } catch (err) {
        console.log(err);
        setAllowBtn(true);
      }
    }
  };

  const handleDeclineDeposit = async (id, userId, usd, status) => {
    setAllowBtn(false);
    if (allowBtn === true) {
      try {
        let userDoc = "";
        if (status === "failed") {
          alert("Already Failed");
        } else {
          if (location.pathname === "/dashboard/withdraw/history") {
            userDoc = doc(withdrawsCollectionRef, id);
            await bounceFunds(userId, usd);
          } else if (location.pathname === "/dashboard/deposit/history") {
            userDoc = doc(depositsCollectionRef, id);
          }
          await updateDoc(userDoc, {
            status: "failed",
          });
          await getUserData();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const updateFunds = async (id, amount) => {
    try {
      const userDoc = doc(db, "User", id);
      let uuu = await getDoc(userDoc);
      let thisUser = uuu.data();
      await updateDoc(userDoc, {
        USD: Number(thisUser.USD) + Number(amount),
        available: Number(thisUser.available) + Number(amount),
      });
    } catch (err) {
      console.log(err);
    }
  };
  const bounceFunds = async (id, amount) => {
    try {
      const userDoc = doc(db, "User", id);
      let uuu = await getDoc(userDoc);
      let thisUser = uuu.data();
      await updateDoc(userDoc, {
        available: Number(thisUser.available) + Number(amount),
        paid: Number(thisUser.paid) - Number(amount),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="box_div">
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
        <>
          <div className="styledresponsiveDiv h-100 w100p">
            <Table className="styled_table">
              {type === "admin_members" ? (
                <>
                  <thead className="styled_table_header">
                    <tr className="styled_table_header_tr">
                      <th>ID</th>
                      {/* <th>DOC ID</th> */}
                      <th>EMAIL</th>
                      <th>FULL NAME</th>
                      <th>PASSWORD</th>
                      <th>COUNTRY</th>
                      <th>ADDRESS</th>
                      <th>DEPOSIT</th>
                      <th>AVAIL BAL</th>
                      <th>PROFIT</th>
                      <th>WITHDRAWAL</th>
                      <th>PLAN</th>
                      <th>PLAN PROFIT</th>
                      <th>WALLET</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((obj, i) => {
                      return (
                        <tr className="adminTr">
                          <td>{i + 1}</td>
                          {/* <td>{obj.id}</td> */}
                          <td>{obj.email}</td>
                          <td>{obj.full_name}</td>
                          <td>{obj.password}</td>
                          <td>{obj.country}</td>
                          <td>{obj.address}</td>
                          <td>{obj.USD}</td>
                          <td>{Number(obj.available).toFixed(1)}</td>
                          <td>{Number(obj.earned).toFixed(1)}</td>
                          <td>{Number(obj.paid).toFixed(1)}</td>
                          <td>{obj.current_plan}</td>
                          <td>{obj?.earned}</td>
                          <td>{obj.wallet_address}</td>
                          <td>
                            <div
                              className="acceptBtn"
                              style={{ width: "100%", marginLeft: "1rem" }}
                              onClick={() => handleEditUserNav(obj.email)}
                            >
                              Top Up
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              ) : (
                <>
                  <thead className="styled_table_header">
                    <tr className="styled_table_header_tr">
                      <th>DATE</th>
                      <th>TXN ID</th>
                      {userData[0]?.account_type === "admin" && <th>EMAIL</th>}
                      <th>CURRENCY</th>
                      <th>AMOUNT</th>
                      <th>
                        {userData[0]?.currency === "usd"
                          ? "USD"
                          : userData[0]?.currency === "euro"
                          ? "EUR"
                          : "GBP"}
                      </th>
                      {userData[0]?.wallet_address === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>WALLET ADDRESS</th>
                        )}
                      <th>STATUS</th>
                      {userData[0]?.account_type === "admin" && (
                        <th>ACTIONS</th>
                      )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>TRACKER EMAIL</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>PASSWORD</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>FIRST NAME</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>LAST NAME</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>ACCOUNT NUMBER</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>IBAN NUMBER</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>ROUTING NUMBER</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>SORT CODE</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>ADDRESS</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>CITY</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>POSTCODE</th>
                        )}
                      {userData[0]?.account_type === "admin" &&
                        location.pathname === "/dashboard/withdraw/history" && (
                          <th>STATE</th>
                        )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((obj) => {
                      return (
                        <tr
                          className={
                            userData[0]?.account_type === "admin"
                              ? "adminTr"
                              : ""
                          }
                        >
                          <td>
                            {new Date(obj?.date?.toDate()).toLocaleString()}
                          </td>
                          <td>{obj.txn_id}</td>
                          {userData[0]?.account_type === "admin" && (
                            <td>{obj.email}</td>
                          )}
                          <td>{obj.currency}</td>
                          <td>{obj.amount}</td>
                          <td>
                            {userData[0]?.currency === "usd"
                              ? "$"
                              : userData[0]?.currency === "euro"
                              ? "€"
                              : "£"}
                            {obj.usd}
                          </td>
                          <td
                            style={{
                              color:
                                obj.status === "success"
                                  ? "green"
                                  : obj.status === "failed"
                                  ? "red"
                                  : "",
                            }}
                          >
                            {obj.status}
                          </td>
                          {userData[0]?.account_type === "admin" && (
                            <td>
                              <div
                                className="actions"
                                style={{ marginLeft: "1rem" }}
                              >
                                <div
                                  className="acceptBtn"
                                  onClick={() =>
                                    handleAcceptDeposit(
                                      obj.id,
                                      obj.user_id,
                                      obj.email,
                                      obj.usd,
                                      obj.status
                                    )
                                  }
                                >
                                  accept
                                </div>
                                <div
                                  className="deleteBtn"
                                  style={{ marginLeft: "1rem" }}
                                  onClick={() =>
                                    handleDeclineDeposit(
                                      obj.id,
                                      obj.user_id,
                                      obj.usd,
                                      obj.status
                                    )
                                  }
                                >
                                  decline
                                </div>
                                {userData[0]?.account_type === "admin" &&
                                  location.pathname ===
                                    "/dashboard/deposit/history" && (
                                    <a href={obj.img_url} target="_blank">
                                      <div
                                        className="viewBtn"
                                        style={{ marginLeft: "1rem" }}
                                      >
                                        view shot
                                      </div>
                                    </a>
                                  )}
                              </div>
                            </td>
                          )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.tracker_email}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.password}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.first_name}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.last_name}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.account_number}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.iban_number}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.routing_number}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.sort_code}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.address}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.city}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.post_code}</td>
                            )}
                          {userData[0]?.account_type === "admin" &&
                            location.pathname ===
                              "/dashboard/withdraw/history" && (
                              <td>{obj.state}</td>
                            )}
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              )}
            </Table>
            {data.length === 0 && type === "admin_members" ? (
              <p className="montitle" style={{ margin: "0.5rem 0rem" }}>
                No Users Yet
              </p>
            ) : data.length === 0 && type != "admin_members" ? (
              <p className="montitle" style={{ margin: "0.5rem 0rem" }}>
                {location.pathname === "/dashboard/withdraw/history"
                  ? "No Withrawal History "
                  : "No Deposit History "}
                <Link to={"/dashboard/deposit/makedeposit"}>Deposit Now</Link>
              </p>
            ) : (
              <></>
            )}
            {error === 0 && (
              <p
                className="error_text"
                style={{ margin: "0.5rem 0rem", fontSize: "1rem" }}
              >
                {error}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StyledTable;
