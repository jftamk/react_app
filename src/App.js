import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";

import INFOComponent from "./infopage";
import OKComp from "./todoapp.js";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">|Main|</Link>
            </li>
            <li>
              <Link to="/todo">|ToDo App|</Link>
            </li>
            <li>
              <Link to="/info">|Info|</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <br></br>
                <h1>To Do App</h1>
                <h2>Welcome!</h2>
                <h3>
                  You can find the To Do app on the ToDo App page. <br></br>
                  For more information and explanation of usage, refer to the
                  Info page.
                </h3>
              </>
            }
          />

          <Route path="info/*" element={<INFOComponent />} />
          <Route path="todo/*" element={<OKComp />} />
          <Route
            path="*"
            element={
              <h1 style={{ color: "red" }}>PAGE NOT FOUND! Incorrect input.</h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
