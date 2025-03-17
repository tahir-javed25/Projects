import { useState } from "react";

export const Toggole = () => {
    const [isOn, setIsOn] = useState(false);
    // const [content, setContent] = useState("OFF")

    const handleToggle =()=>{
        setIsOn(!isOn);
        console.log(isOn);

    }

  return (
    <>
      <div className="container">
        <div className="main-div">
          <div className={`${isOn === false ? "OFF":"ON"} toggle-div`} onClick={handleToggle}>
            <h2>{isOn ? "ON":"OFF"}</h2>
          </div>
        </div>
      </div>
    </>
  );
};
