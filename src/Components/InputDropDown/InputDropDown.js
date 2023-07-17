import { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "./InputDropDown.css";

const InputDropDown = ({
  label,
  name,
  displayedText,
  options,
  values,
  setValues,
}) => {
  const [activeField, setActiveField] = useState(displayedText);

  // useEffect(()=>{

  // },[values])

  const checkForAction = (e) => {
    const { innerText } = e.target;
    setActiveField(innerText);
    console.log(name);
    setValues({ ...values, [name]: innerText.toLowerCase() });
  };

  return (
    <div className="input_with_top_title" style={{ width: "100%" }}>
      {label && <label htmlFor={name}>{label}</label>}
      <>
        <Dropdown
          className="drop inputdrop d-inline"
          autoClose="outside inside"
        >
          <Dropdown.Toggle id="dropdown-autoclose-true">
            {activeField}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {options ? (
              options.map((option, index) => {
                return (
                  <Dropdown.Item href="#" onClick={checkForAction}>
                    {option}
                  </Dropdown.Item>
                );
              })
            ) : (
              <>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
                <Dropdown.Item href="#">Menu Item</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </>
    </div>
  );
};

export default InputDropDown;
