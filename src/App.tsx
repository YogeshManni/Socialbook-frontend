import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getUser } from "./helpers/helper";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text: any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };

  const containerClass =
    "appContainer " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <>
      {!getUser() && (
        <div className="h-[100vh]">
          <div className={containerClass} id="container">
            <Routes>
              {/*  {type == "signIn" ? ( */}
              <Route
                path="/"
                element={<Login changeType={handleOnClick}></Login>}
              ></Route>
            </Routes>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
